/* ANDROID WAITLIST (19 Oct 2026): "Tell me the day it is out" was a mailto
   link, which does nothing in a browser without a mail app. Any link with
   data-android now opens a small email box and posts to the desk-lead
   function (kind 'android'): saved, pushed to André, emailed. */
(function () {
  var URL_ = 'https://wkefdtglgbfprvfajrrw.supabase.co/functions/v1/desk-lead';
  var css = '.aw-scrim{position:fixed;inset:0;z-index:9999;background:rgba(10,10,12,.45);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.aw-box{background:#fff;color:#050505;border-radius:24px;padding:28px 24px 24px;width:100%;max-width:400px;box-shadow:0 24px 60px rgba(0,0,0,.25);font-family:inherit;position:relative}' +
    '.aw-box h3{margin:0;font-size:24px;line-height:30px;font-weight:600;letter-spacing:-.01em}' +
    '.aw-box p{margin:8px 0 0;font-size:16px;line-height:24px;color:#52525B}' +
    '.aw-box input{display:block;width:100%;box-sizing:border-box;margin-top:20px;height:52px;border:1px solid #D4D4D8;border-radius:14px;padding:0 16px;font:inherit;font-size:17px;color:#050505;background:#fff}' +
    '.aw-box input:focus{outline:2px solid #050505;outline-offset:1px}' +
    '.aw-box .aw-go{display:block;width:100%;margin-top:12px;height:52px;border:0;border-radius:99px;background:#050505;color:#fff;font:inherit;font-size:17px;font-weight:600;cursor:pointer}' +
    '.aw-box .aw-go:disabled{opacity:.6;cursor:default}' +
    '.aw-box .aw-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border:0;border-radius:99px;background:#F4F4F5;color:#050505;font-size:20px;line-height:36px;cursor:pointer}' +
    '.aw-box .aw-err{color:#DC2626;font-size:14px;margin-top:10px}';
  var scrim = null, last = null;
  function close() { if (scrim) { scrim.remove(); scrim = null; } if (last) last.focus(); }
  function open(a) {
    last = a;
    if (!document.getElementById('aw-css')) { var s = document.createElement('style'); s.id = 'aw-css'; s.textContent = css; document.head.appendChild(s); }
    scrim = document.createElement('div'); scrim.className = 'aw-scrim';
    scrim.innerHTML = '<form class="aw-box" role="dialog" aria-modal="true" aria-labelledby="aw-h" novalidate>' +
      '<button type="button" class="aw-x" aria-label="Close">&times;</button>' +
      '<h3 id="aw-h">Manifest for Android</h3><p>Leave your email and we will tell you the day it is out. Nothing else.</p>' +
      '<input type="email" name="email" autocomplete="email" placeholder="you@email.com" aria-label="Your email" required>' +
      '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;height:1px;width:1px;opacity:0">' +
      '<p class="aw-err" hidden></p><button type="submit" class="aw-go">Tell me</button></form>';
    document.body.appendChild(scrim);
    var f = scrim.querySelector('form'), err = f.querySelector('.aw-err'), go = f.querySelector('.aw-go');
    f.email.focus();
    f.querySelector('.aw-x').onclick = close;
    scrim.addEventListener('mousedown', function (e) { if (e.target === scrim) close(); });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = f.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Add a valid email.'; err.hidden = false; f.email.focus(); return; }
      go.disabled = true; go.textContent = 'Sending...'; err.hidden = true;
      fetch(URL_, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'android', email: email, name: '', website: f.website.value }) })
        .then(function (r) { if (!r.ok) throw new Error(); f.innerHTML = '<button type="button" class="aw-x" aria-label="Close">&times;</button><h3>You are on the list.</h3><p>We will email you the day Manifest is out on Android.</p><button type="button" class="aw-go">Done</button>'; f.querySelectorAll('button').forEach(function (b) { b.onclick = close; }); f.querySelector('.aw-go').focus(); })
        .catch(function () { err.textContent = 'Could not send. Email andre@manifestjump.com instead.'; err.hidden = false; go.disabled = false; go.textContent = 'Tell me'; });
    });
  }
  document.addEventListener('keydown', function (e) { if (scrim && e.key === 'Escape') close(); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-android]');
    if (!a) return;
    e.preventDefault(); open(a);
  });
})();
