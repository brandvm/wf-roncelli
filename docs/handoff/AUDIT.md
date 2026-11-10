# Roncelli — audits

The live site is https://www.buildroncelli.com. It is on a Maintenance plan (`pnpm progress show`).
The monthly check is `webflow-maintenance` › Monthly health check. Each month gets a folder of files in `audits/`. The next month is compared against the one before it.

| Month | Health check | Action list | Data |
|---|---|---|---|
| 2026-11 (baseline) | [2026-11-health-check.md](audits/2026-11-health-check.md) | [2026-11-action-list.md](audits/2026-11-action-list.md) (health check + Screaming Frog crawl) | [mobile perf](audits/data/2026-11-perf-mobile.json) |

## Baseline numbers, 2026-11-06 (measured)

- **Mobile Lighthouse, median of 3 runs:**

  | Page | Score | LCP | CLS |
  |---|---|---|---|
  | / | 63 | 5.7 s | 0 |
  | /contact | 59 | 11.5 s | 0 |
  | /project/beacon-park-detroit | 57 | 7.3 s | 0.001 |

- **Accessibility (`wf:a11y --live --all-widths`, 14 pages):** 81 serious or critical failures, from 5 sitewide causes.
- **SEO (`wf:seo --live --canonical`, 301 sitemap pages):** 354 findings, mostly missing Open Graph tags on CMS pages.
- **Links (`wf:links --live --external`):** 0 broken internal links. External failures are listed in the action list.
- **Screaming Frog:**
  - 303 pages and 921 images.
  - 59 images over 1 MB.
  - 610 images without alt text.
- **Domain:**
  - Certificate from Google Trust Services, valid to 2026-12-09, renews itself.
  - Domain registered to 2035-05-07.
  - Visual baselines: `.webflow-build/baselines/` at 4 widths. They are kept out of git. The noise floor is in the next section.

## Noise floor (two untouched baseline runs)

2026-11-06, `pnpm wf:baseline compare --live --dir .webflow-build/baselines --threshold 0`, run right after `save` with no change made: all 64 shots matched, 0.0% of pixels changed and the same height (16 pages × 1440, 820, 667, 390). **The noise floor is 0%**, so any difference in a later compare is a real change.

## Inventory, 2026-11-10 (read through `webflow-roncelli`, read-only)

The connection reaches one site: Roncelli `695eb0569a00fe00b842a8fb`.

**Domains and publishing**
- Domains: www.buildroncelli.com, buildroncelli.com, www.roncelli-inc.com and roncelli-inc.com.
- Last published: staging on 2026-11-09, the custom domains on 2026-10-23. **Staging is ahead of live.** A live publish sends all of it; confirm with the team first.
- Custom code is identical on both, so the gap is Designer or CMS changes.

**Pages: 35**
- 24 static pages.
- 9 CMS templates.
- 404 and Password utility pages.

Not on the live site:
- Drafts: Facilities Management, Our Technology, Style Guide.
- Templates set not to publish: Authors, Jobs, Leaderships, Partners, Technologies, Project Portfolio, Timer Gallery.
- `/chatbot-leadership-preview`: published to staging only, password-protected, and testing the Zendesk widget.

**CMS: 11 collections**
- **Projects:** 88 items. `industry` is a single, required reference to Markets. That single reference is why the 10 duplicates exist (DECISIONS 2026-11-10).
- **Markets:** 10 items.
- **News:** 190 items.
- Also Leaderships, Jobs, Authors, FAQs, and four collections marked [Not Published].

**Custom code** (full text in ROLLBACK.md)
- **Site head:**
  - GA4.
  - Two Ahrefs tags, labelled "Brand Vision's" and "Tony's", so **both are intentional**.
  - Preconnects and font preloads.
  - `maximum-scale=1` viewport (comment: "Disables Zoom on Input Fields").
  - A style block.
- **Site footer:**
  - Finsweet number count.
  - Lenis (commented out, not running).
  - The countdown timer.
  - `roncelli-main.js` (24 KB): Swiper lazy-loader, nav shrink, nav hover images, form guard, accordion.
- **Page code:**
  - Contact: tab hash script.
  - News, What We Build, Leadership: Finsweet Attributes v2 (list, smart lightbox).
  - News: also cmsselect v1.
  - Project and News templates: social share and mailto script.
- **Embeds:**
  - Global styles, likely inside the `G | Embed Code` component (26 instances).
  - Copyright year.
  - Project template: tabs style and drag-scroll script.
- **reCAPTCHA** isn't in the custom code. Webflow adds it because spam protection is on for the forms. Action list A6 changes there, not in code.

**Components: 11**
- Navigation (24 instances), Footer (25), Footer CTA (19), General Inquiry Form (21), Button (97), Accordion (4), Map (2), Embed Code (26).
- 3 have no instances: Projects Tab, Timer Gallery Group, Timer Gallery W.

**Forms: 4**, across 266 instances
- Newsletter (Email): in the footer, on 27 pages.
- Contact — General Inquiry: a component, on 22 pages.
- Contact — Request Solution: on Contact.
- "Email Form" on News: actually the Finsweet filter.

Interactions weren't read; they need the Designer open.
