# Decisions

One entry per decision: what was decided, who made it, when, and what it means for the site. Newest first.

## 2026-11-10 · One CMS item per project, tagged with several industries

- **Decided by:** tsgrazzutti (Roncelli), in Slack with Asheem (Brand Vision). Tony Roncelli raised the question first, by text on 2026-11-09.
- **Problem:** 10 projects each exist twice in the Projects collection, so they can appear on two market pages. The Market field is a single reference.
- **Decision:**
  1. Add a multi-reference field from Projects to Markets.
  2. Keep one item per project, tagged with every market it belongs to.
  3. On the project page, show a pill for each market. The design is a row of pills, for example "Mixed Use & Multifamily" and "Second Industry".
  4. Delete the duplicate items and 301-redirect their slugs to the item that stays.
- **Client's condition:** every project still shows on every market page it shows on today. Confirmed by Asheem.
- **Pairs.** The kept item is the one at the original slug; the other is the copy.

  | Kept (original slug) | Market | Copy (archive and redirect) | Market |
  |---|---|---|---|
  | engineering-laboratory-office-renovations | advanced-manufacturing | …-tobrj | office-workplace |
  | fred-and-barbara-erb-discovery-trails | parks-recreation | …-0a9z4 | government-municipality |
  | freedom-hill-amphitheater-expansion-renovation | entertainment-hospitality | …-pryla | parks-recreation |
  | general-motors-vehicle-engineering-center-tower | office-workplace | …-fglqe | advanced-manufacturing |
  | lgcmi-h-project-battery-manufacturing-facility | energy | …-4zwup | advanced-manufacturing |
  | operating-engineers-324-training-facility | advanced-manufacturing | …-2 | education |
  | state-savings-bank-renovation | office-workplace | …-7bxy0 | entertainment-hospitality |
  | wagner-place-development | mixed-use-multi-family | …-4wdmc | office-workplace |
  | wayne-county-airport-authority-michael-berry-administration-building | government-municipality | …-hvx02 | office-workplace |
  | zf-office-renovation | office-workplace | …-tjvtq | advanced-manufacturing |

- **Not covered:** the 2 duplicate news posts. They aren't market copies; they were posted twice. They need their own decision.

### How it gets done (staging first)

1. **[Person]** Take a Webflow backup (Site settings › Backups).
2. **[Claude, MCP]** ✅ 2026-11-10: added the `Industries` multi-reference field (slug `industries`, field `2bc42860e4b94a0157239e571a8dc900`, → Markets) to Projects. Filled on all 88 items: each item's current `industry`, plus the copy's industry on the 10 kept items. Checked against the API response: 88 of 88 match. These are staged CMS changes, not published yet.
3. **[Person, Designer]**
   - Market template: filter the projects list by `Industries` contains the current Market, instead of `Market` equals it (MANUAL-TODO A).
   - Project template: replace the single market pill with a nested list sourced from `Industries`. The API can't source a list from a multi-reference field (MANUAL-TODO B).
   - Keep "Back to all Projects" on the single `Market` field, as the main market.
4. **[Claude checks]** ✅ 2026-11-10, staging (published 21:04): all 10 market pages list every project from the snapshot, with no other projects. The copies were still listed alongside their originals until archived. Pills checked on 4 projects: Wagner Place, ZF, Operating Engineers 324 (two pills each) and Beacon Park (one). "Back to all Projects" goes to the main industry.
   - On staging, every market page lists the same projects as before. The copies are replaced by their originals, so the counts stay the same.
   - Before: `audits/data/market-projects-2026-11-10.json`: Advanced Manufacturing 17, Education 5, Energy 4, Entertainment & Hospitality 13, Government & Municipality 6, Healthcare 15, Mission Critical 4, Mixed Use & Multifamily 5, Office & Workplace 12, Parks & Recreation 5.
   - Check any other lists filtered by Market too (the inventory will show them).
5. **[Claude, MCP]** ✅ 2026-11-10: archived the 10 copies (staged; they leave the site on the next publish). **[Person]** Add the 10 301 redirects `/project/<copy>` → `/project/<kept>` (Site settings › Publishing › 301 redirects; MANUAL-TODO C).
6. **[Claude checks]** Publish to staging, then to live with the person's OK. Then:
   - The market pages match the snapshot.
   - Each old URL returns 301 to its kept project.
   - The sitemap no longer lists the copies.

### 2026-11-10 · Industry (single reference) to be removed; back link uses the first industry

- **Decided by:** the person (Brand Vision): remove the single `Industry` field so `Industries` is the only source. "Back to all Projects" goes to the project's **first** industry in `Industries`.
- **Done in the Designer (Claude, through the person's Chrome and the MCP bridge):**
  - All 10 "other projects" tab lists now filter on `Industries` contains <tab's industry>. Each was read back.
  - "Back to all Projects" is now a Code Embed inside a Collection List sourced from `Industries`, limited to 1 item, and bound to the industry's Slug (`/market/{Slug}#projects`). The old embed bound to `Industry › Slug` was removed.
- **Checked on staging (2026-11-10):**
  - Back links on ZF, Wagner Place, Beacon Park and GM go to their first industry.
  - The tab counts match the market pages, less the project being viewed.
  - The home grid shows 9 projects.
- **Visual differences from live, all expected:**
  - Home grid: the two re-picked projects sit in different positions.
  - Healthcare: two projects with the same Sort Order (3) swapped places.
  - Project tabs: merged originals now sort by their own Sort Order.
- **Done 2026-11-10:**
  - The person deleted `Industry` and published live (21:59).
  - Checked on live: the 10 redirects pass `wf:redirects test --live`; all 10 market pages match the snapshot, with originals in place of copies; back links and pills are right on ZF, Wagner Place and Beacon Park; the home grid has 9 projects; no copies are in the sitemap.
  - The `Industries` help text now says the first industry is the main one, and not to duplicate projects.
