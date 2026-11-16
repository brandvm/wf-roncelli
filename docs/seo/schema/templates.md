# Schema on the CMS templates

The global schema (`global.jsonld`: the Organization `#organization` and WebSite `#website`) is in **Site settings › Custom code › Head code**, on every page. Static pages carry their own schema (`pages/<page>.jsonld`) in **Page settings › Schema markup**. Both point at the Organization by `@id`.

The three CMS templates build their JSON-LD in the browser from the page. The script reads the H1, the meta description, the industry pill and the back link, and the visible date on news. It writes the block with `JSON.stringify`.

**Why a script and not field tokens:** project names contain `"` and `&` (`The "Barn" Warehouse`, `Lawrence & Idell…`). Webflow inserts PlainText fields into custom code without JSON escaping, so the JSON breaks or shows entities (template lesson: designer.md, "CMS text bindings inside JSON-LD can break the schema"). Only the cover image is a token, because a URL is always safe. Google runs the script before reading structured data.

| Template | File | Types |
|---|---|---|
| Projects (`/project/*`) | `templates/project.head.html` | WebPage, BreadcrumbList (Home › What We Build › first industry › project) |
| News (`/news/*`) | `templates/news.head.html` | NewsArticle (headline, image, datePublished from the visible date), WebPage, BreadcrumbList |
| Markets (`/market/*`) | `templates/market.head.html` | Service, CollectionPage, BreadcrumbList |
| Leaderships (not published) | `templates/leadership.head.html` | ProfilePage (Person), BreadcrumbList (Home › Leadership › person) |
| Authors, Jobs, Partners, Technologies, Project Portfolio, Timer Gallery, FAQs (not published) | `templates/generic.head.html` | WebPage, BreadcrumbList |

Each file goes at the **top** of the template's Page settings › Custom code › Head code, above the existing Finsweet tag. The files are the source of truth; the page code is a copy.

## Installed and checked, 2026-11-16 (staging only)

- **Site head:** `global.head.html` added before the "Global | Webflow Head Custom Code | End" marker. The rest of the head code is unchanged.
- **Static pages:** `pages/*.jsonld` written to Page settings › Schema markup through the API, for 18 pages including FAQPage with 46 questions. Facilities Management was added later the same day (see below).
- **Templates:** the head scripts are on Projects, News and Markets, above the existing Finsweet tag.
- **Checked:** all 295 sitemap pages on roncelli.webflow.io, in Chromium.
  - Every block parses, with no HTML entities.
  - Every `@id` reference resolves.
  - Every page has the global GeneralContractor + WebSite, plus its own types.
  - Quotes and & stay correct (e.g. `The "Barn" Warehouse`, `Lawrence & Idell…`).
  - The NewsArticle dates match the CMS on a sample of 6.
- **Gaps, content not code:**
  - 12 news posts have no cover image, so their NewsArticle has no `image`.
  - "Roncelli's October 2017 Newsletter" has the date 1970-01-01 in the CMS.
- **FAQ:** the FAQPage copies the questions on /faq as of 2026-11-16. Re-export it when the FAQs collection changes.

## Live, and every page covered, 2026-11-16

- **Live:** published to all four custom domains. All 296 live sitemap pages have the global block plus their own.
- **Every page in Webflow now has page-level schema**, drafts and unpublished ones too, so it is already there when they go live:
  - Facilities Management: WebPage, Service, BreadcrumbList. It is no longer a draft and is in the live sitemap.
  - Our Technology and Style Guide (drafts), Chatbot Leadership Preview, 404 and Password: WebPage, plus a BreadcrumbList on the drafts.
  - The 8 unpublished CMS templates: the generic script (Leaderships: ProfilePage).
- **Global block** is now indented in the site head (same content).
- **Stricter check** on all 297 staging pages, including the 404 (`docs/seo/schema/validate.py`):
  - every type and property checked against the schema.org vocabulary (current release);
  - breadcrumb positions, absolute URLs, no empty values, one node of each type per page;
  - Google's NewsArticle and FAQPage rules.
  - Result: 0 errors.
- **Published live 2026-11-16** and re-checked on all 297 live pages (296 sitemap + 404): 0 errors. The global block is indented in the live HTML.
- **News script fix:** an empty meta description is left out, not written as `""`. An unset CMS date shows on the page as "January 1, 1970" and is now left out, not published as 1970-01-01.
- **Content gaps left (CMS, not code):**
  - 5 news posts have no publish date: 2025 CAM Showcase Awards Project of the Year, Gino Roncelli construction AI leadership, Roncelli recognized for outstanding contributions to the community, Roncelli's October 2017 Newsletter, The Lumen restaurant project team receives award.
  - 12 news posts have no cover image.
  - 3 have no meta description: best-theater-contractor, building-certainty-before-construction-begins, roncellis-october-2017-newsletter.
