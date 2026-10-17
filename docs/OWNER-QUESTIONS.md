# Open owner questions for the website

These notes used to sit as HTML comments inside the pages, where anyone could read them with View Source. They live here now. This folder is in `.vercelignore`, so it is not deployed.

Rule for the future: no TODO or internal notes in shipped HTML. Put them in this file.

## Proof numbers (home page)

- Confirm the jumper count (220+ dropzones, 46 countries), the live-loads count (150+) and a date to show. The PROOF ROW note says 158 home dropzones on 15 Oct, which does not match 220+.

## Home page

- Keep or drop the handshake emoji in the statement (design review A15/F14).
- The eight painterly card images (art-1 to art-8) are decorative. Supply real jump-day photos (own or licensed, people consenting) if you want them replaced. Each photo then needs a short alt text (F22).
- "free at Manifest Desk dropzones" calls the Lock Screen card free there. Confirm this is live and still intended (the copy rule says Lock Screen live loads are Pro).
- Supply a verified list of dropzones with live loads if you want a "Check your dropzone" search. Do not use globe-dropzones.json for it. The link needs id="not-covered" on the "When your dropzone is not covered yet" heading of /live-skydiving-loads/.
- Confirm current yearly and Lifetime Pro prices as shown in the App Store, and confirm the Desk Lock Screen sentence is still intended.

## /dropzones/

- Supply real Desk captures of the landout map, top-up sheet, load board, safety check, hangar TV board and day report (sample data, no real names or money).
- Add one to three named Desk dropzones with a real quote, name, role and written permission. Never invent quotes. Do not quote the App Store rating. Quote card to add then: a figure.band-quote with the quote in a blockquote, and a figcaption with the optional dropzone logo, name, role and dropzone.
- Confirm the typical time from sign-up to first jump day so it can be shown in "From sign-up to your first jump day" (same question on /skydiving-manifest-software/).
- Publish a from-price per plan and the in-app top-up fee as a percentage, if you decide to show numbers. Prices stay hidden until then.
- The plan cards say "Small fee on in-app top-ups only" and the table says Small / Lower. The server charges that fee only when MANIFEST_FEE_BPS is set (default 0). Is it set on live, and should the website keep naming a fee?
- A06: confirm what a Weekend plan dropzone can export (jumpers, balances, jump history) and what it can take on cancel; then split the plan table row into Accounting exports and Full data export. If every plan can export its own jumper and jump data, change the answer to: "You do. Every plan can export its jumpers and jump history. Accounting CSV exports are on Full-time and up."
- Confirm what Android jumpers can see or receive today (for example the hangar board and desk-side calls) before adding it to the Android answer (same on /skydiving-manifest-software/).

## Internet, data and outages (/dropzones/, /how-manifest-works/, /skydiving-manifest-software/)

- F10: the "what if the internet drops" answer was taken from the Desk code (manifest-desk src/lib/offline.ts, ShellBars.tsx NetBar, public/sw.js on main). Confirm it, and say what the hangar TV board shows offline.
- Supply true answers for: offline behaviour of the hangar board and jumper phones; data storage location, access and backups; outage announcements and jump-day contact. Do not claim uptime figures, encryption, PCI or offline desk operation beyond what the code does. Then add these two FAQ items, as plain text, with the same wording on all three pages:
  - Where is our data stored and who can see it?
  - How do you handle an outage on a jump day?

## /dropzones/start/

- Confirm one reply-time sentence for the whole site (Support says 1 to 2 days, the plan table says Priority, same day on Full-time).

## /support/

- Jump-day support hours with time zone, and whether to publish a phone number.

## /about/

- Add a real founder photo when you have one (4:5, explicit width and height), and confirm the role line.

## /dropzone-payments/ and /skydive-landout-safety/

- Supply a real Desk capture of the jumper top-up and balance (sample data, no real names or money) for the /dropzone-payments/ hero.
- /skydive-landout-safety/ is about the landout map, but the site has no capture of it yet; the hero shows the Today page and a 3D replay phone. Supply a real Desk capture of the landout map and an app capture of the Landed out screen (sample data, no real names).

## Articles

- Add a "Last updated" date to the byline on /skydive-3d-tracking/ and /uspa-digital-logbook/ when you confirm one.
- Choose licence (UK) or license (US) for the whole site. /uspa-digital-logbook/ uses licence outside SIM quotations.
- Approve the USPA sentence wording on /uspa-digital-logbook/.

## Join page (/join/)

- The page says "Ask the desk to add you" because the App Store build has no way to join a dropzone yet. When a build with the Manifest tile (Jump day, then Manifest) is live on the App Store, put back the app steps: get Manifest, open it and tap Manifest, type the code, plus the "I have the app" button that opens manifestapp://join/CODE.

## Privacy policy

- The deletion text says a Manifest Desk dropzone keeps the loads and payments its staff handled, with their name on them. That is fully true once v90 and the new delete-account function are live (before that, a staff deletion fails).
- What a dropzone keeps when a jumper deletes their account (balance, jumps, waivers) is batch 5. Today those dropzone records are deleted with the account, which does not match "Each dropzone decides how long it keeps its own records". Update the policy when batch 5 ships.
- What happens to a dropzone's data when it leaves Manifest (export, then deleted after how many days)?
