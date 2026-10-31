# HOMEPAGE-AUDIT.md

## AUDIT ANSWERS

**A. Breach check without alerts — is the email stored/logged/sent beyond XposedOrNot?**
No. In `lib/breach-check.js`, the email is validated, then used only to build the XposedOrNot URL. The in-memory cache is keyed by `sha256(email)` (never the email), TTL ~10 min, cleared on restart. Rate limiting is keyed by IP. Dev logs record only error type, never the email or response body; production logs nothing. No file or DB write occurs for a plain breach check.

**B. Columns stored alongside email in monitored_emails:**
- `id` (uuid, PK)
- `email` (text)
- `preferred_day` (int 0–6)
- `next_check_at` (timestamptz)
- `status` (text, e.g. "active")
- `last_checked_at` (timestamptz)
- `notification_sent` (boolean)
- `last_notified_at` (timestamptz)

**C. Storage location and access:**
Supabase table `public.monitored_emails`. All access uses the service-role client. The anon key is used only for the subscription flow, never for monitored_emails. No client-side code touches this table.

**D. Unsubscribe/removal link in notification emails?**
No. `buildBreachAlertEmail` contains no unsubscribe link. Quote: "You're receiving this because you opted into weekly breach monitoring for this email address… Not yours? You can safely ignore this email — no account was created and nothing is stored about you beyond this opt-in."

**E. Actual check frequency:**
Weekly. `monitor-check.js` advances `next_check_at` by at least 7 days, anchored on the user's preferred weekday. Trigger is manual/external via `POST /api/run-monitor-check` (bearer `MONITOR_SECRET`); no in-repo cron/scheduler config exists.

**F. Existing removal route for monitored_emails?**
No. `unsubscribeEmail` only updates the `subscriptions` table. There is no endpoint that deletes or deactivates a `monitored_emails` row. [FLAGGED: No removal route found.]

## COPY DRAFT

### SECTION 1: COMPANY LAYER (Tirenify)
Tirenify is building digital security solutions for individuals and businesses — helping people identify digital exposure, understand their risks, and take practical steps toward better protection. Safeyard is its first product. As it grows, Tirenify is exploring how it can serve Nigerian small and medium businesses — a direction, not a service offered today. Tagline "Know Before They Do" stays where it already appears.

### SECTION 2: PRODUCT LAYER (Safeyard by Tirenify)
For freelancers, tech enthusiasts, and people who use email every day and can't afford a breach. Safeyard checks whether your email appeared in known data breaches, shows what was exposed, and tells you what to do next.

### SECTION 3: HOW ALERTS WORK
Opt in on your chosen day of the week. We check your email against known breaches weekly and email you only when something new appears.

### SECTION 4: PRIVACY AND TRUST
Emails entered for a one-off breach check are not stored — they're sent to XposedOrNot and discarded. Emails opted into alerts are stored separately, solely to run scheduled weekly checks and send results. [FLAGGED: No removal route found. Do not publish this section until one exists or Daniel confirms how to handle it.] No unsubscribe link is included in alert emails. No encryption or security measures are claimed beyond what the code supports.

### SECTION 5: META TAGS
- title: Tirenify — Digital security for individuals and businesses | Safeyard by Tirenify
- meta description: Tirenify is building digital security solutions for individuals and businesses. Its first product, Safeyard, checks whether your email appeared in known data breaches, shows what was exposed, and tells you what to do next. Free, no account needed.
