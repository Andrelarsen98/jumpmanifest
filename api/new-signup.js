// Supabase Database Webhook -> email notification on each new waitlist signup.
// Triggered by an INSERT webhook on public.waitlist. Sends an email via Resend.
//
// Required Vercel env vars:
//   RESEND_API_KEY  - from resend.com (Settings -> API Keys)
//   WEBHOOK_SECRET  - any random string; must match the header set on the Supabase webhook
// Optional:
//   NOTIFY_EMAIL    - where to send the alert (defaults to the address below)
//   NOTIFY_FROM     - verified Resend sender (defaults to Resend's shared onboarding address)

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify the shared secret so randoms can't spam your inbox via this endpoint.
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret || req.headers["x-webhook-secret"] !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Vercel parses JSON bodies automatically; fall back to manual parse just in case.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const record = (body && body.record) || {};
  const email = record.email;
  if (!email) {
    return res.status(400).json({ error: "No email in payload" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  }

  const to = process.env.NOTIFY_EMAIL || "andynick97@gmail.com";
  const from = process.env.NOTIFY_FROM || "Manifest Waitlist <onboarding@resend.dev>";
  const when = record.created_at
    ? new Date(record.created_at).toUTCString()
    : new Date().toUTCString();

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `🪂 New Manifest waitlist signup: ${email}`,
        html: `
          <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111">
            <h2 style="margin:0 0 8px">New waitlist signup</h2>
            <p style="margin:0 0 4px;font-size:18px"><strong>${email}</strong></p>
            <p style="margin:0;color:#666;font-size:13px">${when}</p>
          </div>`,
        text: `New Manifest waitlist signup: ${email} (${when})`,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ error: "Resend failed", detail });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "Send error", detail: String(err) });
  }
};
