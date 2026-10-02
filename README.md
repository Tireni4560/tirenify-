# Tirenify Homepage

Official homepage and product landing page for Tirenify — a privacy-focused digital exposure awareness platform built to help people discover whether their email addresses or personal data appear in public breach records.

## Overview

Tirenify is designed to make digital exposure awareness simple, clear, and accessible.

The platform helps users:
- Check whether their email addresses appear in known public breaches
- Understand potential exposure risks
- Take practical steps toward improving online security and digital trust

This repository contains the frontend homepage experience for the Tirenify platform.

---

## Project Structure

- `index.html` — homepage structure and content
- `styles.css` — styling, layout system, responsiveness, animations, visual design
- `script.js` — navigation, FAQ rendering, form handling, interactivity
- `site-config.js` — the two owner-set values (`FORM_ENDPOINT`, `BREACH_DATA_SOURCE_NOTE`)
- `faq-data.js` — FAQ questions and answers (single source of truth)
- `products.html`, `breach-guard.html`, `how-it-works.html`, `security-privacy.html`,
  `about.html`, `faq.html`, `contact.html` — one flat page per route (works when the folder is
  previewed locally and when deployed)
- `404.html` — friendly not-found page
- `robots.txt`, `sitemap.xml`, `.well-known/security.txt` — SEO and security contact files
- `_redirects` — clean-slug rewrites (`/products` → `products.html`) for hosts that support them
- `favicon.svg`, `og-image.jpg`, `me.jpg` — brand assets
- The X (formerly Twitter) icon in the footer and About button is loaded from the Font Awesome 6 CDN
  (cdnjs); no local icon image or SVG is used for it

## Pages

Home (`/`), Products (`/products`), Breach Guard (`/breach-guard`), How it works (`/how-it-works`),
Security & Privacy (`/security-privacy`), About (`/about`), FAQ (`/faq`), Contact (`/contact`).
The homepage keeps its section ids `#home`, `#product`, `#how`, `#why`.

## Owner configuration

Both values live in `site-config.js`:

- `FORM_ENDPOINT` — where the /contact and /products forms POST their JSON. Left empty: the forms
  still validate and show success/error states, and tell people to email support@tirenify.app
  instead of failing silently. Point it at a form handler when one exists.
- `BREACH_DATA_SOURCE_NOTE` — optional attribution line rendered on /how-it-works under
  "Where the data comes from". Left empty on purpose: no data provider is confirmed yet, and some
  providers require visible attribution with a link.

Adding an FAQ item is a single object in `faq-data.js`; items flagged `short: true` also appear on
the homepage.

## Local Preview

To run locally:

1. Clone the repository
2. Open the project folder
3. Launch `index.html` in a browser

Or use a lightweight local server such as:

```bash
npx serve
```

---

## Core Homepage Sections

The homepage currently includes:

- Hero section
- Product overview
- Exposure checker section
- Trust and privacy messaging
- Product roadmap / phases
- How it works
- CTA section
- Responsive footer and social links

---

## Design Direction

The interface is intentionally designed to feel:

- Modern
- Clean
- Privacy-focused
- Professional
- Calm and trustworthy
- Responsive across devices

The visual system uses:
- Dark neutral tones
- Soft blue accents
- Minimal UI patterns
- Glass-style surfaces
- Smooth spacing and typography hierarchy

---

## Content Updates

The homepage copy and positioning were refined to better communicate:

- Digital exposure awareness
- Email breach visibility
- Online identity protection
- Real-world cybersecurity concerns
- Privacy-first product philosophy

Messaging was also updated to better align with:
- Freelancers
- Online workers
- Tech users
- Digital-first professionals
- Users managing multiple online accounts and email identities

---

## Purpose

The goal of this homepage is to serve as the official public-facing entry point for Tirenify while communicating:
- Product credibility
- Long-term vision
- User trust
- Simplicity
- Practical value

---

## Authorship

Lead design and development by Daniel Tirenioluwa Adeleye. Tirenify is an independent initiative focused on privacy-first exposure awareness helping people discover whether personal data appears in publicly disclosed breach records while prioritizing transparency and practical guidance.

© 2026 Tirenify. All rights reserved.


