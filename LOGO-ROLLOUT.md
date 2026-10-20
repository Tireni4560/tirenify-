# Logo & Favicon Rollout Report

Scope: apply the supplied Tirenify logo and favicon assets to the published static site.
No copy, layout, colours, dependencies, Netlify configuration or social preview images were changed.

---

## 1. Published page inventory

The published site is the flat static HTML at the repository root. `src/app/*` (a Next.js-style
source tree) is **not** part of the published output and was intentionally left untouched.

| # | File | Route | Header logo | Footer logo |
|---|------|-------|-------------|-------------|
| 1 | `index.html` | `/` | light + dark variants | light |
| 2 | `products.html` | `/products` | light + dark variants | light |
| 3 | `breach-guard.html` | `/breach-guard` | light + dark variants | light |
| 4 | `how-it-works.html` | `/how-it-works` | light + dark variants | light |
| 5 | `how-it-works/index.html` | `/how-it-works/` | light + dark variants (root-absolute paths) | light |
| 6 | `about.html` | `/about` | light + dark variants | light |
| 7 | `faq.html` | `/faq` | light + dark variants | light |
| 8 | `contact.html` | `/contact` | light + dark variants | light |
| 9 | `security-privacy.html` | `/security-privacy` | light + dark variants | light |
| 10 | `404.html` | error page | light + dark variants | *(no footer brand link — pre-existing)* |

Every page carries its own duplicated header and footer markup, so each one was updated
individually.

---

## 2. Replacement table

### 2.1 Header lockup — all 10 pages

Before:

```html
<a class="brand" href="index.html" aria-label="Tirenify home">
  <span class="brand-mark" aria-hidden="true">T</span>
  <span class="brand-name wordmark" data-split="Tirenify" aria-label="Tirenify"></span>
</a>
```

After:

```html
<a class="brand" href="index.html" aria-label="Tirenify home">
  <img class="brand-logo brand-logo-light" src="brand/tirenify-logo-horizontal-light.svg" width="119" height="26" alt="Tirenify" />
  <img class="brand-logo brand-logo-dark"  src="brand/tirenify-logo-horizontal-dark.svg"  width="119" height="26" alt="Tirenify" />
</a>
```

`how-it-works/index.html` uses the same markup with root-absolute `src` values
(`/brand/tirenify-logo-horizontal-*.svg`) so it resolves correctly from the nested URL.

### 2.2 Footer lockup — 9 pages (all except `404.html`)

Before:

```html
<a class="footer-brand" href="index.html" aria-label="Tirenify home">
  <span class="brand-mark" aria-hidden="true">T</span>
  <span>Tirenify</span>
</a>
```

After:

```html
<a class="footer-brand" href="index.html" aria-label="Tirenify home">
  <img class="footer-logo" src="brand/tirenify-logo-horizontal-light.svg" width="110" height="24" alt="Tirenify" />
</a>
```

`404.html` has no footer brand link in the original markup, so none was added.

### 2.3 Favicon declarations — all 10 pages

Before (single declaration):

```html
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
```

After:

```html
<link rel="icon" href="favicon.ico?v=2" sizes="any" />
<link rel="icon" type="image/svg+xml" href="favicon.svg?v=2" />
<link rel="icon" type="image/png" sizes="32x32" href="brand/favicon-32.png?v=2" />
<link rel="icon" type="image/png" sizes="16x16" href="brand/favicon-16.png?v=2" />
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png?v=2" />
```


## 3. Files added

| Path | Purpose |
|------|---------|
| `brand/tirenify-logo-horizontal-light.svg` | Header/footer logo for light backgrounds |
| `brand/tirenify-logo-horizontal-dark.svg` | Header logo for the dark mobile-menu overlay |
| `brand/tirenify-logo-horizontal-mono-black.svg` | Single-colour black lockup (unused on pages; kept for print/dark surfaces) |
| `brand/tirenify-logo-horizontal-mono-white.svg` | Single-colour white lockup (unused on pages; kept for dark surfaces) |
| `brand/tirenify-symbol-light.svg` | Symbol-only mark, light (not placed on any page) |
| `brand/tirenify-symbol-dark.svg` | Symbol-only mark, dark (not placed on any page) |
| `brand/tirenify-symbol-mono-black.svg` | Symbol-only mark, mono (not placed on any page) |
| `brand/favicon-16.png` | 16x16 raster icon |
| `brand/favicon-32.png` | 32x32 raster icon |
| `brand/favicon-48.png` | 48x48 raster icon |
| `brand/favicon-512.png` | 512x512 raster icon |
| `favicon.ico` | Multi-size ICO containing 16/32/48 PNG frames |
| `favicon.svg` | Vector icon (replaces the old text-based "T" placeholder) |
| `apple-touch-icon.png` | 180x180 iOS home-screen icon |

## 4. Files edited

| Path | Change |
|------|--------|
| `index.html`, `products.html`, `breach-guard.html`, `how-it-works.html`, `how-it-works/index.html`, `about.html`, `faq.html`, `contact.html`, `security-privacy.html`, `404.html` | Favicon declarations; header + footer logo markup |
| `styles.css` | Replaced `.brand-mark` / `.brand-name` rules with `.brand-logo` / `.footer-logo` rules; added `body.nav-open` variant switching; removed the wordmark-entrance animation block; renamed the hero keyframe `letterIn` -> `riseIn` |
| `script.js` | Removed the obsolete wordmark-splitting function (`splitWordmark`) |
| `favicon.svg` | Old placeholder replaced with the supplied vector icon |
| `.gitignore` | Added `project assets/` so the local working folder is never committed |
| `README.md` | Project-structure list updated to describe the new brand assets |

---

## 5. CSS and behaviour notes

`styles.css` now contains:

```css
.brand-logo,
.footer-logo { display: block; width: auto; }
.brand-logo { height: 26px; }
.footer-logo { height: 24px; }
.brand-logo-dark { display: none; }
body.nav-open .brand-logo-light { display: none; }
body.nav-open .brand-logo-dark  { display: block; }
```

- The mobile navigation overlay is dark (`body.nav-open .site-header` / `.nav-overlay`), so the
  header ships **both** a light and a dark logo. CSS swaps them — no JavaScript involved.
- Responsive sizing: 26 px -> 24 px below 640 px -> 22 px below 380 px.
- The old `body.nav-open .brand-name` and `body.nav-open .brand-mark` colour overrides were
  removed together with the elements they targeted.
- The wordmark entrance animation (`@keyframes letterIn`, `.wordmark .letter`, the
  `splitWordmark()` JS) was deleted because the new logo is a pre-outlined SVG with no
  per-letter spans. The keyframe it defined was byte-identical to the one used by the hero
  reveal, so the hero keyframe was renamed `letterIn` -> `riseIn` (single definition, single
  consumer) and the stale "Engine hub pulse" comment above it was corrected to
  "Hero reveal keyframes". The `hubPulse` diagram animation is untouched.
- `prefers-reduced-motion` handling still forces the hero copy visible.

---


`how-it-works/index.html` uses root-absolute paths for all five declarations.

The `?v=2` query string is a cache-buster so that browsers and CDNs pick up the new icons
instead of serving the previously cached `favicon.svg`.

---


## 6. Verification performed

Local server on `http://127.0.0.1:8099`, headless Chrome (puppeteer-core) and Node asset checks.

| Check | Result |
|-------|--------|
| Every local `src`/`href` reference on all 10 pages resolves on disk and over HTTP | Pass (only `/products` etc. "miss" on disk, which are clean-URL rewrites served by `_redirects` — pre-existing) |
| Browser load at 320 / 375 / 768 / 1280 px — 70 screenshots | Pass, no horizontal overflow at any width |
| Logo images complete and render at a non-zero size | Pass |
| Mobile menu: `body.nav-open` applied, light logo hidden, dark logo visible | Pass on all pages at 320/375/768 |
| Favicon / logo assets decoded by the browser (`Image` decode, natural size) | Pass — all 14 brand files decode |
| `favicon.ico` structure (ICONDIR + 3 PNG frames) | Pass after rebuild (see section 7) |
| Icon dimensions: ICO 16/32/48, PNG 16/32/48/512, apple-touch 180x180, `favicon.svg` 512x512 viewBox | Pass |
| Every page declares the five expected icon links, and each target exists on disk | Pass |
| Console errors / page errors / failed local requests | Pass — 0 problems across all 10 pages |
| Accessibility: `alt` present and non-empty, `width`/`height` present, brand links keep `aria-label` | Pass |
| Legacy markup absent from the live DOM (`.brand-mark`, `.brand-name`, `.wordmark`) | Pass |
| Repository-wide search for `brand-mark`, `brand-name`, `wordmark`, `letterIn`, `data-split` | Only remaining hits are in `src/app/page.tsx` + `src/styles/globals.css` (unpublished Next.js source) and in the deleted temporary scripts |
| Social preview images untouched | Pass — `og:image` / `twitter:image` still point at `https://tirenify.app/og-image.jpg` on all nine indexable pages (`404.html` had no social tags before and still has none) |
| `_redirects`, `robots.txt`, `sitemap.xml`, `site-config.js`, `faq-data.js` untouched | Pass (`git diff` confirms) |

### Screenshots

Rendered at 320, 375, 768 and 1280 px, plus mobile-menu-open states at 320/375/768
(70 images total, kept outside the repository during verification).

---

## 7. Issue found and fixed during verification

**`favicon.ico` had invalid directory offsets.** The ICONDIR entries pointed at byte 0, 476 and
1368, but the actual image data begins at byte 54 (6-byte header + 3 x 16-byte entries), so the
offsets were short by exactly the header size. The ICO was rebuilt with the correct offsets
(54 / 530 / 1422) and each frame's payload was verified to start with the PNG signature.
Chrome now decodes `favicon.ico` correctly (reports 48x48, the largest embedded frame).

---

## 8. Publish-safety findings

- **No `netlify.toml` exists in the repository**, so there is no publish-directory setting to
  update. The site is a flat static tree at the repository root; Netlify's publish directory is
  configured in the Netlify UI and was left untouched. If Netlify is pointed at a subdirectory
  rather than the repo root, the new `brand/` folder and root-level `favicon.ico` /
  `apple-touch-icon.png` must sit inside that published directory — they are at the root of the
  same folder that already holds `index.html`, `styles.css` and `favicon.svg`, so they follow the
  existing publish root automatically.
- `_redirects` was not modified. The new `how-it-works/index.html` page uses root-absolute asset
  paths, consistent with its existing root-absolute navigation links.
- `og-image.jpg` and `menocompression.png` were not modified.
- `Professional Portrait.png` (2 MB, previously tracked) and the local `project assets/` folder
  were **not** part of this rollout. `project assets/` is now git-ignored. `Professional
  Portrait.png` remains tracked and unchanged — flagged in section 10.
- No dependency, build step, or package manifest was added or changed.
- `src/app/*` was not touched — it is not part of the published static output.

---

## 9. Social preview images (intentionally unchanged)

The nine indexable pages continue to reference the same social card:

- `og:image` -> `https://tirenify.app/og-image.jpg`
- `og:image:width` -> `1200`, `og:image:height` -> `630`
- `og:image:alt` -> `Tirenify — Know if your data has been breached before attackers use it`
- `twitter:image` -> `https://tirenify.app/og-image.jpg`

`404.html` carries no `og:`/`twitter:` meta tags. That is pre-existing — the file was already
missing them before this rollout — and no social tags were added or removed on it.

`og-image.jpg` itself was not modified; `git status` confirms only `favicon.svg` changed among the
pre-existing image assets.

---

## 10. Open items and assumptions

1. **Netlify publish directory** — not identifiable from the repository (no `netlify.toml`).
   Assumed to be the repository root. See section 8.
2. **Mono logo variants are shipped but unused.** `tirenify-logo-horizontal-mono-black.svg` and
   `tirenify-logo-horizontal-mono-white.svg` are included in `brand/` for future use; no page
   references them. If they should not ship, they can be deleted without affecting the site.
3. **Symbol-only variants are shipped but unused.** `tirenify-symbol-{light,dark,mono-black}.svg`
   are not placed on any page.
4. **`Professional Portrait.png` is still tracked** (2.0 MB) and sits in the publish root. It was
   not part of this rollout and was left as-is.
5. **Cache-buster version** — `?v=2` was chosen as the icon cache-busting token. If the site has
   previously shipped other versions, bump to `?v=3`.
6. **Favicon tint in dark mode** — Chrome's automatic dark-mode favicon tinting can apply to
   `favicon.svg`. If that is undesirable, a `media="(prefers-color-scheme: dark)"` variant link
   can be added later; it was left out to avoid changing behaviour beyond the brief.
7. **Nothing was committed or pushed.** All changes remain in the working tree for review.
