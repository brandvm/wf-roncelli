# Roncelli — combined action list, November 2026

Sources:
- The monthly health check (wf-template scripts, run 2026-11-06).
- The Screaming Frog crawl `https-www-buildroncelli-com-.dbseospider`: 1,414 URLs, 303 pages, 921 images.

Tags: **SF** = found in the Screaming Frog crawl · **HC** = found in the health check · **Both** = found in both.

---

## A. We can do (dev, design, CMS template or settings; no client content needed)

### Priority 1 — fix this cycle
| # | Issue | Where | Fix | Src |
|---|---|---|---|---|
| A1 | Pinch-to-zoom disabled (critical WCAG failure) | Every page | Remove `maximum-scale=1` from the viewport meta in Site settings › Head code. It was added to stop iOS zooming into form fields; do that instead by giving inputs a 16px font size. | HC |
| A2 | Hidden placeholder content: "Project Title" and lorem ipsum in 5 hidden blocks. Google can still read hidden text. | /how-we-build/self-perform-group | Delete the hidden placeholder blocks, or bind them to real content | SF |
| A3 | No `<h1>` | / and /news | Make the hero heading an H1 | Both |
| A4 | Several H1s per page (2–4) | 4 news posts: 2025-cam-showcase-awards-project-of-the-year, cam-annual-meeting-2025, henry-ford-health-…-sterile-compounding-center, largest-general-contractor | Change the extra H1s in the rich text to H2 | Both |
| A5 | Open Graph tags missing. About 100 CMS pages have no og:title or og:description. 114 have no og:image and 12 have an empty one. | Project and news templates and static pages | Bind the OG title, description and image to CMS fields. Add a default share image to the static pages. | HC |
| A6 | reCAPTCHA script blocks rendering on every page. Mobile LCP is 5.7–11.5 s and the score is 57–63. | Every page (Webflow adds it, not custom code) | Webflow injects it because spam protection is on for the forms, and a form is in the footer of every page. Options: keep it and rely on FormGuard, or turn it off and load it only where needed. Decide with the team. | HC |
| A7 | Oversized images: 560 of 921 are over 100 KB, 201 over 300 KB and 59 over 1 MB (the largest is 3 MB) | Project galleries and market headers | Recompress and resize. Use `webflow-compress-cms-image` for the CMS images. | SF |

### Priority 2 — accessibility
| # | Issue | Where | Fix | Src |
|---|---|---|---|---|
| A8 | Footer labels (`.u-muted-40`) fail color contrast | Every page | Raise the label color's opacity or contrast | HC |
| A9 | Mobile menu link `.g-nav-menu-drawer` has no accessible name | Every page | Add an `aria-label` | HC |
| A10 | "Close" link and empty `#` links in the nav. "All News" is a `#` link. | Every page; news posts | Make them buttons, or give them real URLs | HC |
| A11 | Industry filter `<select>` has no label | /news | Add a label or `aria-label` | HC |
| A12 | Paycom iframe has no `title`, and its scroll area can't be reached by keyboard | /careers | Add a title and `tabindex="0"` to the wrapper | HC |
| A13 | Missing alt text on 610 images. Some are decorative (logos, SVGs), but most are project photos. | Sitewide | We set decorative images to empty alt and bind the CMS alt field. Writing descriptive alt text is item C6. | SF |
| A14 | 31 pages skip heading levels (H2 is not in order) | Mostly CMS templates | Fix the heading levels in the templates | SF |
| A15 | 922 images have no width or height attributes | Sitewide | Set sizes on the image elements (prevents layout shift) | SF |

### Priority 3 — technical SEO and housekeeping
| # | Issue | Where | Fix | Src |
|---|---|---|---|---|
| A16 | Two newest news posts are missing from sitemap.xml: building-certainty-before-construction-begins and corewell-health-taylor-hospital-… | Sitemap | Check that their sitemap setting isn't excluded, then republish | SF |
| A17 | 49 paginated URLs (`/news?56f66de0_page=…`) can be crawled, and old pages show Webflow's placeholder image | /news pagination | Check the collection list's empty-image fallback. Make sure the canonical points at /news. | SF |
| A18 | No structured data (JSON-LD) anywhere | Sitewide | Add an Organization block to the home page, Article to the news template, and an optional LocalBusiness block | HC |
| A19 | ~~Ahrefs analytics installed twice~~ **Resolved 2026-11-10:** the head code labels them "Brand Vision's Ahrefs" and "Tony's Ahrefs", so both are intentional. Nothing to do. | Site head | — | Both |
| A20 | No security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) | Every page | Add them in Cloudflare (the site is already behind it). Low priority. | SF |
| A21 | Long titles: 87 are over 60 characters | Mostly the news template | Shorten the title pattern, e.g. drop "\| Roncelli" on long post titles. Rewording individual titles is C7. | Both |
| A22 | Privacy policy has no meta description | /legal/privacy-policy | Write one (boilerplate) | HC |

---

## B. Needs the client's go-ahead (content they own: deletions, rewrites, merges)

| # | Issue | Where | What we'd propose | Src |
|---|---|---|---|---|
| B1 | **Duplicate CMS items.** 10 projects and 2 news posts exist twice, with the same title, description and H1. | Projects: engineering-laboratory-office-renovations, fred-and-barbara-erb-discovery-trails, freedom-hill-amphitheater-expansion-renovation, general-motors-vehicle-engineering-center-tower, lgcmi-h-project-battery-manufacturing-facility, operating-engineers-324-training-facility, state-savings-bank-renovation, wagner-place-development, wayne-county-airport-authority-michael-berry-…, zf-office-renovation (each also has a `-xxxxx` or `-2` copy). News: cam-safety-achievement-award(-2), lumen-restaurant-project-team-receives-award / the-lumen-restaurant-… | Client picks the copy to keep. We archive the other and add a 301 redirect. | Both |
| B2 | **Email "safe link" wrappers pasted into posts.** Outlook safelinks (one includes a staff email address) and a Barracuda linkprotect link. | /news/how-epc-contractors-keep-clean-energy-projects-on-track-2026 (6 links), /news/3844-2 | Replace each one with the direct URL. Needs the client's OK because it's article content. | Both |
| B3 | **Broken external links in news posts** (the sites are dead or the pages are gone) | 6 Mailchimp newsletter links (2018–2021 newsletter posts), cavuconsultinggroup.com/services, ibewlocal58.org, rejournals.com (504), freep.com video (2015) | Remove each link, point it to an archived copy, or unpublish the post | SF |
| B4 | **Links to paywalled or bot-blocked pages** (they probably work for people but should be checked) | detroitnews ×2, dbusiness, michiganmedicine, crohnscolitisfoundation ×2, thebestandbrightest ×2 | Client spot-checks them; we replace any that are dead | SF |
| B5 | **Private Vimeo videos** (401 error) | /news/a-fresh-look-for-roncellis-60th-year, /project/pediatric-behavioral-health-inpatient-unit | Client makes them public or embeddable on the domain, or we remove them | SF |
| B6 | **Links to the old site, roncelli-inc.com** (7 links) | /news/largest-general-contractor, /news/roncelli-announces-executive-leadership-team-… | We'd re-point them to the matching /project/ pages | SF |
| B7 | **About 35 shortened links** (bit.ly, ow.ly, on.freep.com) in old news posts. They work but redirect, and some may die. | Old news posts, 2016–2021 | Replace them with the final URLs (we can do this in bulk once approved) | SF |
| B8 | **Thin pages** (under 200 words). Mostly old newsletters and "featured in CAM Magazine" stubs. | 22 pages (the list is in the crawl) | Client chooses for each page: expand it, merge it into a roundup, or unpublish it with a redirect | SF |
| B9 | **Missing or empty meta descriptions** on 2 old posts | /news/best-theater-contractor, /news/roncellis-october-2017-newsletter | We draft them and the client approves | HC |
| B10 | **LinkedIn links on /leadership and the market pages** redirect, so some profile URLs have changed | 6 on /leadership, 7 on the market pages | Client confirms each person's current profile URL | SF |

## C. Client to do (only the client can)

| # | Item | Src |
|---|---|---|
| C1 | Test-submit every form (contact, careers and any others) and confirm the notifications arrive | HC |
| C2 | Check Webflow plan, CMS and form limits (about 300 CMS-driven pages so far) | HC |
| C3 | Paycom: the career portal logo returns 404. Fix the portal customization in Paycom. | HC |
| C4 | Check the BuildingConnected links on /trade-partners still work when logged in (bots can't reach them) | SF |
| C5 | Supply alt text for project photos, or approve AI-drafted alt text for review (follows A13) | SF |
| C6 | Approve shorter rewrites of the longest titles (follows A21) | SF |

## D. Decisions for the client
| # | Question | Src |
|---|---|---|
| D1 | Do you need a cookie consent banner? GA4 runs with no banner today. | HC |
| D2 | ~~Two Ahrefs tracking codes~~ Resolved: one is Brand Vision's and one is Tony's. Don't ask the client. | Both |
| D3 | For B1 and B8: which duplicate project copy stays, and should the thin old news posts stay live? | Both |

---

### Healthy (no action)
- No broken internal links or internal 4xx/5xx errors (SF and HC).
- SSL valid, renews itself.
- Domain registered to 2035.
- http, apex and www redirects are correct.
- GA4 on every page.
- No layout shift (CLS 0).
- Every page has exactly one title.
- No H2 is missing.
- No soft 404s.
