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
2. **[Claude, MCP]** Add a `Markets` multi-reference field (→ Markets) to Projects. Fill it on **every** project with its current Market. On the 10 kept items, also add the copy's market.
3. **[Person, Designer]**
   - Market template: filter the projects list by `Markets` contains the current Market, instead of `Market` equals it (MANUAL-TODO A).
   - Project template: replace the single market pill with a nested list sourced from `Markets`. The API can't source a list from a multi-reference field (MANUAL-TODO B).
   - Keep "Back to all Projects" on the single `Market` field, as the main market.
4. **[Claude checks]**
   - On staging, every market page lists the same projects as before. The copies are replaced by their originals, so the counts stay the same.
   - Before: `audits/data/market-projects-2026-11-10.json`: Advanced Manufacturing 17, Education 5, Energy 4, Entertainment & Hospitality 13, Government & Municipality 6, Healthcare 15, Mission Critical 4, Mixed Use & Multifamily 5, Office & Workplace 12, Parks & Recreation 5.
   - Check any other lists filtered by Market too (the inventory will show them).
5. **[Claude, MCP]** Archive the 10 copies. **[Person]** Add the 10 301 redirects `/project/<copy>` → `/project/<kept>` (Site settings › Publishing › 301 redirects; MANUAL-TODO C).
6. **[Claude checks]** Publish to staging, then to live with the person's OK. Then:
   - The market pages match the snapshot.
   - Each old URL returns 301 to its kept project.
   - The sitemap no longer lists the copies.
