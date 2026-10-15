# Manifest Desk prices, hidden 15 Oct 2026

Not linked from any page and kept out of the deploy by .vercelignore.
André was not sure these were right, so every Desk price was taken off
jumpmanifest.com on 15 Oct 2026. This is what was there, so it can be put back.
`git show 7b355ad:<file>` shows every page exactly as it was before.

## Plans (monthly, USD)

| Plan | Full price | Founding price, year one | Yearly (full) | Top-up fee |
|---|---|---|---|---|
| Weekend dropzone | $249/month | $174/month | $2,490/year | 2% on in-app top-ups |
| Full-time dropzone | $399/month | $279/month | $3,990/year | 1.5% on in-app top-ups |
| Big operations | from $699/month | from $489/month | $6,990/year | 1% on in-app top-ups |

- Founding discount: first 10 dropzones get 30% off their whole first year
  (rounded down to whole dollars, `Math.floor(n * 0.7)`, matches desk-billing).
  The 30% stacked on yearly too (yearly founding = floor(yearly x 0.7)).
- Yearly: "pay yearly and get two months free" (yearly = 10 x monthly).
- After 12 months it renewed at the full price, monthly or yearly.
- Fee: only on top-ups jumpers make in the app ("2% or less"). No fee per jump,
  per booking, or on cash/card terminal at the desk. Example used on
  /dropzone-payments/: $1,000 of top-ups on Weekend = $20 in fees.
- Big operations: "Final price agreed with you."
- "First 10 dropzones: 30% off year one" eyebrow with a live "only N places
  left" counter (desk-billing action "founding", shown at 5 or fewer).
- Meta descriptions said "From $249 a month, no lock-in." / "From $249/mo."
- Nav menu Pricing item said "Prices on the page, no lock-in."

## Where they were

- dropzones/index.html: #pricing cards, compare table "Price per month" and
  "Fee on top-ups" rows, founder banner, FAQ (contract, when charged), JSON-LD
  Offers with UnitPriceSpecification, og/twitter descriptions, foundLeft counter.
- dropzones/start/index.html: plan picker, order summary, Stripe checkout.
  The page now shows a "set with you" message. To restore: set
  `PRICES_HIDDEN = false` in its script, put the numbers back in `PLANS`
  (month/year above), restore the removed copy from git, and drop the
  `#hidden` section.
- skydiving-manifest-software, skydiving-load-calls, dropzone-payments,
  self-manifest-skydiving, how-manifest-works, skydive-landout-safety,
  index.html (FAQ + JSON-LD), llms.txt, llms-full.txt.
- Every page's nav menu ("Prices on the page, no lock-in.").
