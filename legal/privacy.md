# Privacy Policy, Manifest

_Last updated: 25 October 2026_

Manifest ("we", "us", the "App") is a skydiving app for jumpers, with live loads, jump recording and 3D replay, gear, events and community, and Manifest Desk, the system dropzones use to run their loads, jumpers and payments. This policy explains what personal data we collect, why, and your rights over it.

**Data controller:** Manifest Jump LLC, a Wyoming company, United States. Contact: **andre@manifestjump.com**.

## 1. Data we collect

**You provide:**
- Account: email address and password (passwords are stored hashed by our auth provider; we never see them in plain text). If you sign in with Apple or Google, we receive your name and email address from them instead. If you use Apple's "Hide My Email", we only ever receive Apple's relay address, never your real one.
- Profile: name, optional avatar photo, license type and licensing body, ratings, bio, home dropzone, coaching details.
- Content you create: jump logs, gear items and service history, event listings and RSVPs, messages and photos you send to other users (a chat photo is stored privately and only the two people in that conversation can open it), reports you file.
- Credential & verification documents: if you choose to upload them, images of your license, rigger ticket, insurance, medical or other credentials, for your in-app credentials wallet and, if you apply, for blue-check verification. These are stored privately and access-controlled, visible only to you, to authorized Manifest admins reviewing a verification request, and to a dropzone on Manifest Desk you choose to share them with (see section 3). Medical papers and passports are never shown to a dropzone.

**Collected automatically / with permission:**

- **Location, for finding places.** When you tap "Near me" to sort dropzones or events by distance, we read your approximate location once. It is used in memory to compute distance and is not stored on our servers.
- **Location, for recording a jump.** 3D Jump Track records your **precise** location continuously while a recording is running, and it keeps recording **in the background**, with the screen off and the App not on screen. That is deliberate and it is the only way the feature can work: your phone is in a zipped pocket from takeoff to landing. Recording only ever runs when you start it, or when you have switched on automatic start and your load takes off. It stops by itself once you are back on the ground, and it stops on its own if it has been running without ever leaving the ground.
- **Location, so a recording can start by itself.** If you switch on automatic start, your phone also watches for when you arrive at or leave a dropzone, using the operating system's own boundary monitoring for the dropzones nearest you. This runs even when no recording is running and even when the App has been closed, because it is the only way iOS will wake the App to start recording for you. It reports a crossing and nothing else: there is no continuous tracking, we do not receive a trail of where you have been, and switching automatic start off stops it entirely.
- **Motion and barometric pressure, for recording a jump.** During a recording we read the barometer (air pressure, which is how altitude is measured) and GPS about once a second, and exit and canopy deployment are detected from those.
- **The jump track itself:** coordinates, altitudes, speeds and timestamps for the recording, together with the dropzone and aircraft it was on.
- **Usage data:** in-app product-interaction events (screens viewed, features used) and crash reports, collected to keep the App reliable and improve it.
- Notification permission and local reminder scheduling (gear service and currency reminders are scheduled on your device).
- Basic technical data needed to run the service (e.g. session tokens).

### Where your jump tracks live

A recording, with every position, altitude and sensor sample in it, is written to storage on your own device first. From there it leaves your phone in two cases:

- **Backup.** When you save a jump to your logbook, its track is backed up to our servers so it can be restored on a new phone. With Manifest Pro, every track is backed up automatically, including ones you never save. The backup is the recorded samples, not a video. It sits in your account and is visible only to you.
- **Posting to Community.** If you post a jump, the track is uploaded and the replay becomes visible to other jumpers according to the visibility you chose (everyone, or the people who follow you). A private profile limits this to your followers.

Exporting a track as a CSV or KML file, or sharing a replay image or video, sends a copy wherever you send it; that is your choice, not ours.

Two consequences worth knowing:

- The App keeps only your most recent tracks on the phone (currently the last 25) and older ones are removed from the device automatically. With Pro, a removed track is still in your backup and can be restored.
- Deleting a track in the App deletes it from the phone, from your backup and from Community. Deleting your account deletes your backed-up tracks and your posts. Tracks that were never backed up or posted exist only on the phone, so deleting the App removes them.

## 2. Why we use it (legal bases)

- **To provide the service** (contract): accounts, logbook, gear, events, messaging.
- **Legitimate interests:** safety/moderation (reports, suspensions), preventing fraud and abuse, product improvement.
- **Consent:** device location, background location for jump recording, motion and pressure sensors, and notifications. You can decline any of these, and revoke them at any time in your device settings. Declining location or motion disables jump recording; everything else in the App keeps working.

## 3. Who we share it with

We do not sell your personal data. We share it only with service providers who process it on our behalf:

- **Supabase**: database, authentication, and file storage (hosting our backend).
- **Expo**: app delivery and, where enabled, push notification delivery.
- **PostHog (EU region)**: product analytics and crash reporting (in-app usage events and crashes, to keep the App reliable; hosted in the EU).
- **Meta (Facebook)**: only if you tap Share to Facebook. The Facebook software in the App is used solely to open your post; automatic event logging and advertising identifiers are switched off, so Meta receives nothing unless you share.
- **Mapbox**: the maps, satellite imagery and 3D terrain used by the dropzone maps and the jump replay. Rendering a map necessarily tells Mapbox which part of the world you are looking at, and Mapbox collects its own telemetry as described in its privacy policy.
- **RevenueCat**: manages Manifest Pro subscription status. Payment itself is taken by Apple or Google; we never see your card details.
- **Dropzone manifest systems.** Many dropzones publish their live load boards. To show you your own load and to alert you when it is called, the App reads the board for the dropzone you are at and matches the name on your profile against the names the dropzone has published. We store which dropzone you are tracking and the name we matched, and which loads you were manifested on, so your logbook can be pre-filled. We send nothing about you to the load board; we only read what it already publishes.
- **Dropzones that run Manifest Desk.** At a dropzone that runs Manifest Desk, the App shares your bookings, balance, gear and currency status with that dropzone. If you send a landout alert, the dropzone also sees your live position during the alert. When you share your papers with a dropzone in the App, its owner and manifest staff see your license, membership card, insurance and reserve or rigger card, until the dropzone's next season starts or until you stop sharing. Never medical papers or a passport. A dropzone that adds you by your Pass is not shown your papers.
- **Stripe**: payments at dropzones that run Manifest Desk, such as balance top-ups. Each payment is made to the dropzone's own Stripe account; Stripe handles the card details and we never see them.
- **Apple** and **Google**: only if you choose to sign in with them, to authenticate you and pass us your name and email address.

Other users see the parts of your profile and content you choose to make public (e.g. your name, avatar, public jumps, events you host). Verified-badge status is visible to other users.

## 4. International transfers

Our providers may process data outside your country (including the EU/EEA and the United States). Where required, transfers rely on appropriate safeguards such as the EU Standard Contractual Clauses.

## 5. Retention

We keep your data while your account is active. When you delete your account (Profile → Settings → Delete account), your profile and associated content are deleted promptly via an automated cascade. Credential and verification documents you upload are kept only while they remain in your wallet or your account is active; removing the credential or deleting your account removes them, and we may keep a minimal record that a verification check took place without retaining the document itself. Some records may be retained where required by law or to resolve disputes.

Jump tracks on your device are yours to delete. Tracks that were backed up or posted to Community are deleted with your account. See "Where your jump tracks live" above.

## 6. Your rights

Depending on your location (including the EU/EEA under the GDPR), you have the right to access, correct, delete, restrict, or port your data, and to object to certain processing. You can:

- **Edit** your profile in-app.
- **Delete your account** in-app (Profile → Settings → Delete account), which erases your data.
- **Delete a jump track** in-app, at any time. That removes it from the phone, from your backup and from Community in one step.
- **Contact us** at **andre@manifestjump.com** for any other request.

You may also lodge a complaint with your local data protection authority.

## 7. Children

Manifest is not directed to children under 16. We do not knowingly collect data from children under 16. If you believe a child has provided us data, contact us and we will delete it.

## 8. Security

We use industry-standard measures (encryption in transit, hashed passwords, row-level access controls). No system is perfectly secure; please use a strong, unique password.

## 9. Changes

We may update this policy. Material changes will be notified in-app or by email. The "Last updated" date above reflects the current version.

## 10. Contact

Manifest Jump LLC, a Wyoming company, United States. **andre@manifestjump.com**
