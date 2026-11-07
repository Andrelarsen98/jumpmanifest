# Privacy Policy, Manifest

_Last updated: 8 November 2026_

Manifest ("we", "us", the "App") is a skydiving app for jumpers, with live loads, jump recording and 3D replay, gear, events and community, and Manifest Desk, the system dropzones use to run their loads, jumpers and payments. This policy explains what personal data we collect, why, and your rights over it.

**Data controller:** Manifest Jump LLC, a Wyoming company, United States. Contact: **andre@manifestjump.com**.

## 1. Data we collect

**You provide:**
- Account: email address and password (passwords are stored hashed by our auth provider; we never see them in plain text). If you sign in with Apple or Google, we receive your name and email address from them instead. If you use Apple's "Hide My Email", we only ever receive Apple's relay address, never your real one.
- Profile: name, optional avatar photo, licence type and licensing body, ratings, bio, home dropzone, coaching details.
- Safety and dropzone details: phone number, weight and an emergency contact, if you add them, and the waivers you sign in the App, including your drawn signature.
- Content you create: jump logs, gear items and service history, event listings and RSVPs, messages and photos you send to other users (a chat photo is stored privately and only the two people in that conversation can open it), reports you file.
- Credential & verification documents: if you choose to upload them, images of your licence, rigger ticket, insurance, medical or other credentials, for your in-app credentials wallet and, if you apply, for blue-check verification. These are stored privately and access-controlled, visible only to you, to authorized Manifest admins reviewing a verification request, and to a dropzone on Manifest Desk you choose to share them with (see section 3). Medical papers and passports are never shown to a dropzone.

**Collected automatically / with permission:**

- **Location, for finding places.** When you tap "Near me" to sort dropzones or events by distance, we read your approximate location once. It is used in memory to compute distance and is not stored on our servers.
- **Location, for recording a jump.** 3D Jump Track records your **precise** location continuously while a recording is running, and it keeps recording **in the background**, with the screen off and the App not on screen. That is deliberate and it is the only way the feature can work: your phone is in a zipped pocket from takeoff to landing. Recording only ever runs when you start it, or when you have switched on automatic start and your load takes off. It stops by itself once you are back on the ground, and it stops on its own if it has been running without ever leaving the ground.
- **Location, so a recording can start by itself.** If you switch on automatic start, your phone also watches for when you arrive at or leave a dropzone, using the operating system's own boundary monitoring for the dropzones nearest you. This runs even when no recording is running and even when the App has been closed, because it is the only way iOS will wake the App to start recording for you. It reports a crossing and nothing else. The last dropzone you were at and the time are saved to your profile. There is no continuous tracking, we do not receive a trail of where you have been, and switching automatic start off stops it entirely.
- **On Android**, recording runs as a foreground service with a visible notification. Automatic start uses Android's background location in the same way described above for iPhone.
- **Motion and barometric pressure, for recording a jump.** During a recording we read the barometer (air pressure, which is how altitude is measured) and GPS about once a second, and exit and canopy deployment are detected from those.
- **The jump track itself:** coordinates, altitudes, speeds and timestamps for the recording, together with the dropzone and aircraft it was on.
- **Push tokens.** To deliver notifications, Lock Screen load cards, widgets and your Wallet pass updates, we store the tokens Apple and Google give your phone for that purpose.
- **Usage data:** in-app product-interaction events (screens viewed, features used) and crash reports, collected to keep the App reliable and improve it.
- Notification permission and local reminder scheduling (gear service and currency reminders are scheduled on your device).
- Basic technical data needed to run the service (e.g. session tokens).

### Where your jump tracks live

A recording, with every position, altitude and sensor sample in it, is written to storage on your own device first. From there it leaves your phone in two cases:

- **Backup.** When you save a jump, its track is backed up to our servers so it can be restored on a new phone. With Manifest Pro, every track is backed up automatically, including ones you never save. The backup is the recorded samples, not a video. It sits in your account and is visible only to you.
- **Posting to Community.** If you post a jump, the track is uploaded and the replay becomes visible to other jumpers according to the visibility you chose (everyone, or the people who follow you). A private profile limits this to your followers.

Exporting a track as a CSV or KML file, or sharing a replay image or video, sends a copy wherever you send it; that is your choice, not ours.

Two consequences worth knowing:

- The App keeps only your most recent tracks on the phone (currently the last 25) and older ones are removed from the device automatically. With Pro, a removed track is still in your backup and can be restored.
- Deleting a track in the App deletes it from the phone, from your backup and from Community. Deleting your account deletes your backed-up tracks and your posts. Tracks that were never backed up or posted exist only on the phone, so deleting the App removes them.

## 2. Why we use it (legal bases)

- **To provide the service** (contract): accounts, jumps, gear, events, messaging.
- **Legitimate interests:** safety/moderation (reports, suspensions), preventing fraud and abuse, product improvement.
- **Consent:** device location, background location for jump recording, motion and pressure sensors, and notifications. You can decline any of these, and revoke them at any time in your device settings. Declining location or motion disables jump recording; everything else in the App keeps working.

## 3. Who we share it with

We do not sell your personal data. We share it only with service providers who process it on our behalf:

- **Supabase**: database, authentication, and file storage (hosting our backend).
- **Expo**: app delivery and, where enabled, push notification delivery.
- **Apple and Google push services** (Apple Push Notification service, and Firebase Cloud Messaging on Android): deliver notifications.
- **Resend**: sends our emails, such as Desk invites, sign-in links, daily summaries and Check-in Pass documents.
- **PostHog (EU region)**: product analytics and crash reporting (in-app usage events and crashes, to keep the App reliable; hosted in the EU).
- **Meta (Facebook)**: only if you tap Share to Facebook. The Facebook software in the App is used solely to open your post; automatic event logging and advertising identifiers are switched off, so Meta receives nothing unless you share.
- **Mapbox**: the maps, satellite imagery and 3D terrain used by the dropzone maps and the jump replay. Rendering a map necessarily tells Mapbox which part of the world you are looking at, and Mapbox collects its own telemetry as described in its privacy policy.
- **Open-Meteo**: weather. We send it the dropzone's coordinates, never yours.
- **RevenueCat**: manages Manifest Pro subscription status. Payment itself is taken by Apple or Google; we never see your card details.
- **Stripe**: payments at dropzones that run Manifest Desk. A top-up is charged on the dropzone's own Stripe account, by card, Apple Pay or Google Pay. Stripe takes your card details directly; they never reach us. We keep a record of each payment: amount, currency, status, our 1% fee and Stripe's reference. Refunds and disputes are handled by the dropzone in Stripe and update your balance. Dropzones pay Manifest by a card they save with Stripe on Manifest's own account.
- **Apple** and **Google**: only if you choose to sign in with them, to authenticate you and pass us your name and email address.
- **Dropzone manifest systems.** Many dropzones publish their live load boards. To show you your own load and to alert you when it is called, the App reads the board for the dropzone you are at and matches the name on your profile against the names the dropzone has published. We store which dropzone you are tracking and the name we matched, and which loads you were manifested on, so your jumps can be pre-filled. We send nothing about you to the load board; we only read what it already publishes.
- **Dropzones that run Manifest Desk.** When you jump at, book with or check in at a dropzone that runs Manifest Desk, that dropzone's staff can see what they need to manifest you and keep you safe:
  - your name, photo, email and phone number
  - your licence, licence number and ratings
  - whether your licence, membership or insurance has run out
  - your reserve repack and AAD service dates
  - your jump numbers and when you last jumped
  - your weight and emergency contact, if you have added them
  - your waivers and bookings at that dropzone
  - your balance and payments at that dropzone. Manifest staff open one jumper's account at a time, and in the jumper list they see only whether you owe money. Lists of everyone's balances, money totals and reports are only for the owner and for staff the owner has allowed to see them.
  - during a landout alert, your live position, the chat and any photos you send
  - while you are on a load, the dropzone's hangar board can show your first name, last initial and profile photo; you can turn the photo off in the App (Settings, "Show my photo on hangar boards")

**Your papers.** When you share your papers with a dropzone in the App, its owner and manifest staff see your licence, membership card, insurance and reserve or rigger card, until the dropzone's next season starts (always at least 30 days) or until you stop sharing, whichever comes first. You can stop sharing at any time. Never medical papers or a passport.

**Your Check-in Pass.** When you show your Check-in Pass, whoever scans it can, for 15 minutes, view and download the documents you switched on, with your name, document number and expiry. They can also email them as attachments to an address they type, up to three times. A copy that was downloaded or emailed stays with that person after the 15 minutes. Sharing is off until you turn it on for a document, and never includes medical papers or a passport.

After each flying day, the dropzone's owners get an email with a spreadsheet of that day's loads and payments, including jumper names. If a landout call says someone is injured, crew see that person's emergency contact.

Each dropzone decides how long it keeps its own records, for example for safety or accounting rules. Those records stay with the dropzone when you delete your Manifest account (see section 5).

**Who is responsible.** For your Manifest account, jumps and App content, Manifest Jump LLC is the controller. For the records a dropzone keeps about you on Manifest Desk (bookings, balance, waivers, safety checks, gear and notes), the dropzone is the controller and we process them on its behalf. Requests about those records go to the dropzone; we will help it answer.

Other users see the parts of your profile and content you choose to make public (e.g. your name, avatar, public jumps, events you host). Verified-badge status is visible to other users.

## 4. International transfers

Manifest Jump LLC is a US company and is run from the United Arab Emirates. Our providers process data in the United States and the EU. Where required, transfers rely on safeguards such as the EU Standard Contractual Clauses.

## 5. Retention

We keep your data while your account is active. When you delete your account (Profile → Settings → Delete account), we delete your profile and the content in it: your jumps, gear, events, posts, messages and backed-up tracks. Deleting your account does not erase what a dropzone that runs Manifest Desk keeps about you there. If you jumped at one, it keeps its records of your jumps, bookings, waivers and payments, under the name it knew you by. If you worked at one, as manifest, crew, pilot or owner, it keeps its records of the loads and payments you handled, with your name on them. Dropzones need these records for safety and accounting. Credential and verification documents you upload are kept only while they remain in your wallet or your account is active; removing the credential or deleting your account removes them, and we may keep a minimal record that a verification check took place without retaining the document itself. Some records may be retained where required by law or to resolve disputes.

A Check-in Pass key stops working after 15 minutes and is deleted within a day or two after that.

### When a dropzone leaves Manifest Desk

When a dropzone closes its Manifest Desk account, everything it kept is frozen, read-only, for 90 days, so the owner can download it or come back. After 90 days it is deleted, except the records the law requires us to keep, such as signed waivers and payments, which are kept anonymised.

Jump tracks on your device are yours to delete. Tracks that were backed up or posted to Community are deleted with your account. See "Where your jump tracks live" above.

## 6. Your rights

Depending on your location (including the EU/EEA under the GDPR), you have the right to access, correct, delete, restrict, or port your data, and to object to certain processing. You can:

- **Edit** your profile in-app.
- **Delete your account** in-app (Profile → Settings → Delete account), which erases your data except the records described under Retention.
- **Delete a jump track** in-app, at any time. That removes it from the phone, from your backup and from Community in one step.
- **Contact us** at **andre@manifestjump.com** for any other request.

You may also lodge a complaint with your local data protection authority.

## 7. Children

Manifest is not directed to children under 16. We do not knowingly collect data from children under 16. If you believe a child has provided us data, contact us and we will delete it.

## 8. Security

We use industry-standard measures (encryption in transit, hashed passwords, row-level access controls). No system is perfectly secure; please use a strong, unique password.

On Manifest Desk, every staff member signs in with their own account. A person becomes staff only by accepting their own invite from the dropzone: an emailed link that works once, or a notification in the App. Either ends after 7 days. Owners can turn on two-step sign-in with an authenticator app, and the dropzone's account holder can require it for every owner. Owners can pause staff, sign them out of the Desk and see a history of who was given which access. Which money a staff member can see is checked on our servers, not only hidden on screen.

## 9. Changes

We may update this policy. Material changes will be notified in-app or by email. The "Last updated" date above reflects the current version.

## 10. Contact

Manifest Jump LLC, a Wyoming company, United States. **andre@manifestjump.com**
