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

_To be filled in from `pnpm wf:baseline compare --live --dir .webflow-build/baselines`._
