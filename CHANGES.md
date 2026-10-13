# CHANGES — Wording update + headshot fix (tirenify.app)
Scope: all pages. PRODUCT_URL=https://safeyard.tirenify.app/ BREACH_URL=https://safeyard.tirenify.app/breach-guard STATUS=Live in beta. Written BEFORE edits. No CSS/layout/nav/forms/analytics changed. No commit/push/deploy.

## PART 1 — Headshot (updated per owner request)
- Final headshot: `menocompression.png` (236,633 bytes ≈237 KB) used AS-IS, no compression applied — owner confirmed the previous `me.png` looked blurry on the live page. about.html:120 now `src="menocompression.png"` (exact lower-case, same path style, alt `Daniel Adeleye, founder of Tirenify`, width 1024 height 1049, classes/markup unchanged).
- `menocompression.png` is untracked (`?? menocompression.png`), NOT ignored (git check-ignore returns nothing). Owner: `git add menocompression.png` before commit/push.
- `me.png` (2,061,397 bytes) — now UNUSED (previous compressed version), reported as unused, not deleted.
- `me.jpg` deleted on disk (`D me.jpg`) but still tracked in git. `founder-avatar.jpg` (31,348 B, tracked) UNUSED, not deleted. `og-image.jpg` unchanged.
- No srcset/picture/preload/CSS url()/inline style/JSON-LD/meta/script refs to any me.* image; no JSON-LD in project.
- CSS `.founder-photo { aspect-ratio:1024/1049; object-fit:cover; }` crops `menocompression.png` acceptably; no CSS change.
- Headshot not used anywhere new (no og:image, no other pages).
- DIMENSION NOTE: actual `menocompression.png` is 367x443 (aspect 0.83), but the `<img>` width/height attributes remain 1024x1049 (aspect 0.98) — kept unchanged per original hard rule ("keep width and height attributes unchanged"). CSS `.founder-photo` sets `aspect-ratio: 1024/1049; object-fit: cover;` so the layout renders a 0.98-ratio box and crops the taller image top/bottom (centre crop). At the 240px column width, 367px source ≈ 1.5x density — adequate, not retina-2x. Owner may optionally update the width/height attributes to 367/443 for accuracy; CSS box will still control the displayed shape.

## 1. HOME (/index.html)
- 1a meta description/og:description/twitter:description -> "Tirenify builds digital security tools for African internet users. Our first product is a security hub with an email breach checker, free with no account needed, and we're expanding toward monitoring, identity protection and account security."
- 1b hero-support -> "Tirenify is building security tools that help African internet users spot digital risks, like breached accounts, scam messages and account takeovers, and act on them before they become expensive problems. Our first product is a security hub with an email breach checker. Check whether your email appears in known data breaches, get clear next steps in seconds, and try everyday security tools that run on your device."
- 1c hero button -> "Try the security hub", href check.tirenify.app -> https://safeyard.tirenify.app/ (keep "Free"/"We don't ask for a password. We don't store the email you check.")
- 1d diagram labels: "watches over" (x=300 desktop, x=188 mobile, 2 aria-labels, 2 comments) -> "checks"; "Already safe / nothing to act on" -> "No known breach / nothing to act on"; short "Safe" -> "No known breach" (mobile 152px rect may wrap — shortened, no CSS; check 375px and shorten further if overflow).
- 1e diagram-caption -> "This is Phase 1: our first product, a security hub with an email breach checker. Breach Guard checks whether your email is already exposed, and the everyday tools help you act on it. We reveal risk, we never create it."
- 1f "Results in seconds · No account needed · Built from Nigeria for African users" unchanged.
- 1g problem heading -> "Your digital life is more exposed than you think." Body rewritten with WhatsApp, banking/mobile-money, account takeovers.
- 1h first-product intro -> "Our first product, a security hub with an email breach checker, is Phase 1 and it's in public beta..."
- 1i Phase 1 card: heading -> "Security hub"; badge -> "Live in beta"; body rewritten.
- 1j product "Breach Guard." -> "Security hub."; paragraph rewritten; steps kept; "Breached or safe — you know in seconds." -> "Breach found or not — you know in seconds."
- 1k example result unchanged.
- 1l why Tirenify paragraph expanded (WhatsApp takeovers, phishing imitating banks/mobile-money, SIM-swap, credential theft, identity exposure, building step by step).
- 1m final CTA -> "See where you stand. Try our security hub." Button -> "Try the security hub", href -> https://safeyard.tirenify.app/.
- 1n header + mobile "Check My Email" keep label, href -> BREACH_URL.
- 1o footer products list: "Security hub" first item -> https://safeyard.tirenify.app/, keep "Breach Guard", "All products".
- 1p "Built for the threats here, not adapted from elsewhere." and eyebrow unchanged.

## 2. PRODUCTS (/products)
- 2a meta/og/twitter description -> "Tirenify builds digital security tools for African internet users. Our first product is a security hub with an email breach checker: free breach checks and everyday security tools, no account needed."
- 2b intro -> "Tirenify builds security products for African internet users, starting with a security hub that begins with the simplest problem there is: knowing what's already exposed."
- 2c product card: heading -> "Security hub"; badge -> "Live in beta"; body -> "Our first product: a security hub with an email breach checker. Check whether your email appears in known data breaches and get clear next steps, then use everyday security tools that run on your device. Free, no account needed."
- 2d first button -> "Try the security hub" href -> https://safeyard.tirenify.app/; "How it works" stays.

## 3. BREACH GUARD
- 3a no front-door paragraph added; existing content kept.
- 3b what's next: "Phase 1 / Security hub / Live in beta".
- 3c "What Breach Guard can't do yet" unchanged; "Check My Email" links -> BREACH_URL.

## 4. HOW IT WORKS (/how-it-works + /how-it-works/index.html mirror)
- 4a what-happens added: "To run the check, your address is sent to our breach-data provider, XposedOrNot. We don't store it ourselves."
- 4b where-data: "Results come from known, publicly reported data breaches, using the XposedOrNot breach database."
- 4c result-meaning added: "The other tools in our security hub run in your browser, and what you type into them stays on your device." "Safe" -> "No known breach".
- 4d "Check My Email" links -> BREACH_URL.

## 5. SECURITY & PRIVACY
- 5a what-we-collect: added "To run a breach check, the email you type is sent to our breach-data provider, XposedOrNot. We don't store it ourselves." + "Our security hub keeps a few things on your own device only, such as a masked summary of your last check and your checklist progress. You can clear them at any time."
- 5b what-we-don't-do: added "The other tools in our security hub run in your browser and don't send what you type anywhere."
- 5c third-parties: added "The only third party that receives the email address you check is XposedOrNot, our breach-data provider, which receives it to run the check. Please see its own privacy policy for how it handles data."
- 5d "Last updated" remains "October 2026" (current).

## 6. FAQ
- 6a meta/og/twitter -> "Answers to common questions about Tirenify and our first product, a security hub with an email breach checker: is it free, do you need an account, is it safe to enter your email, and what exposure means."
- 6b existing answers: "Is it really free?" -> "Our security hub is free..."; "Are more products coming?" -> "Our security hub with Breach Guard is the first..."; "Does "safe" mean I'm fully secure?" -> "Does "no known breach" mean I'm fully secure?".
- 6c added 4 Q&As via faq-data.js (same accordion component): Is Tirenify only about email?; What is your first product?; Is it finished?; Do the tools send what I type anywhere?

## 7. CONTACT
- 7a intro -> "Questions, feedback on our first product's beta, a wrong result, or a partnership idea. We read everything."
- 7b meta/og/twitter -> "Contact Tirenify: questions, beta feedback, a wrong result, or a partnership idea. Email support@tirenify.app or send us a message."
- 7c form fields + Topic options unchanged; recommendation only.

## 8. ABOUT
- No founder story/mission/principles change. Headshot me.jpg -> menocompression.png (used as-is, no compression).
- CTA buttons follow Link Rules (label kept, href -> BREACH_URL), incl. closing CTA + founder CTA.
- Meta/OG/twitter rewritten to "our first product — a security hub with an email breach checker" (was product-only "what Breach Guard is here to do" — reported as conflicting, now fixed).
- Footer "Security hub" added first item (with all other footers).

## 9. GLOBAL

## PRIVACY STATEMENTS FOR OWNER REVIEW
- 4a (What happens to your email, how-it-works): added "To run the check, your address is sent to our breach-data provider, XposedOrNot. We don't store it ourselves."
- 4b (Where the data comes from): added "using the XposedOrNot breach database."
- 4c (What a result means, how-it-works): added "The other tools in our security hub run in your browser, and what you type into them stays on your device."
- 5a (What we collect, security-privacy): added breach-check provider send + on-device-only storage text.
- 5b (What we don't do): added "The other tools in our security hub run in your browser and don't send what you type anywhere."
- 5c (Third parties): added "The only third party that receives the email address you check is XposedOrNot, our breach-data provider..."
- Verify: XposedOrNot confirms it is the breach-data provider; confirm no hub app entry point; confirm the hub's on-device storage claim (masked summary, checklist progress) matches the code.

## NAME OCCURRENCES (post-edit)
- Search result for "safeyard" after this edit — appears only inside:
  - https://safeyard.tirenify.app/        (home, products, breach-guard, how-it-works, security-privacy, faq, contact, about, 404, footer lists, Explore the security hub)
  - https://safeyard.tirenify.app/breach-guard   (header/mobile/CTA links, Check My Email buttons)
- Zero occurrences in visible text, titles, meta, og/twitter tags, alt text, aria-labels, comments with product-name content. "Breach Guard" remains as the email-checker name only.

## ITEMS NOT CHANGED / NEEDING DECISION
- `menocompression.png` (237 KB) used as-is per owner instruction — DO NOT compress. `me.png` (2 MB, blurry compressed version) now unused, left on disk for owner to delete if desired.
- Owner must `git add menocompression.png`; `git rm me.jpg` follows the old-tracked-file rule; no .gitignore edit, no commit/push.
- Hero mobile "Safe"→"No known breach" is shortened; if 375px overflows 152px rect, shorten further (no CSS).
- /about meta ORIGINAL "…what Breach Guard is here to do." described Breach Guard as the only product — left as founder-story-free conflict report; changed per global consistency fix to "our first product — a security hub with an email breach checker."
- 404 body CTA "go straight to Breach Guard" and button kept per scope (only header/mobile Check My Email href → BREACH_URL).
- README.md:31 still lists `me.jpg` (docs, not site text) — update if you want.
- Hub third-party fonts/analytics claim omitted — owner to confirm hub has none before claiming.

- All check.tirenify.app links -> BREACH_URL with label kept everywhere (header, mobile menu, CTAs, 404).
- Hero/final/CTA on pages introducing the product: "Try the security hub" -> PRODUCT_URL.
- Product-row: kept existing links; added "Explore the security hub" -> PRODUCT_URL same row/style on homepage.
- Footer Products lists: "Security hub" prepended to all footers; "Breach Guard" + "All products" kept.
- Meta/og/twitter updated on all pages introducing the product (home, products, contact, faq, about, security-privacy, breach-guard).
- site-config.js, script.js, site assets, CSS, fonts, forms handlers, analytics, third-party includes: untouched.
- British spellings kept. Founder story / mission / principles on /about untouched.


