# Roncelli — monthly health check, November 2026

Site: https://www.buildroncelli.com · Run 2026-11-06 · Checklist: wf-template `webflow-maintenance` › Monthly health check, using the template's `wf:*` scripts with `--live`.

There is no Roncelli client repo, progress file or last month's results, so this month is the **baseline**. Next month's numbers get compared against it.

## Checklist

| Check | Result |
|---|---|
| Broken links (`wf:links`, 130 pages crawled) | ⚠️ No broken internal links. Two problems in the content (see below). |
| Forms submit and notify | ⏳ **Person.** Bots can't pass reCAPTCHA. Submit /contact (and any other forms) once, marked as a test. |
| Accessibility (`wf:a11y`, 14 pages × desktop and mobile) | ❌ 81 serious or critical failures. They come from 5 site-wide causes (see below). |
| Mobile speed (Lighthouse, median of 3) | ❌ Home 63 · Contact 59 · Project page 57. LCP is 5.7–11.5 s (target < 2.5 s). CLS 0. |
| Released code version | n/a: the site isn't built on wf-template, so there's no RELEASE to match. |
| Console errors (12 pages × desktop and mobile) | ⚠️ Only third-party errors (Paycom logo 404 on /careers, a reCAPTCHA CSP report, GA storage-access). No errors from the site's own code. |
| SSL and domain | ✅ Google Trust cert to 2026-12-09, renews itself. Domain to 2035-05-07 (Squarespace Domains). http, apex and www all redirect to https://www. |
| Webflow plan, CMS and form limits | ⏳ **Person.** Check in the Webflow dashboard. The sitemap lists 301 pages. |
| Third-party scripts | ⚠️ GA4 (G-YZ52HY5MDF) runs on every page. **Ahrefs analytics is installed twice with two different keys.** HubSpot, reCAPTCHA, Finsweet, Lenis and Google Fonts are also loaded. No cookie banner. |

## Findings

### Fix soon
1. **Pinch-to-zoom is disabled sitewide.** The viewport meta has `maximum-scale=1`. This is a critical WCAG failure on every page. Remove `maximum-scale=1` from the head code.
2. **Outlook "safelinks" links in a news post.** `/news/how-epc-contractors-keep-clean-energy-projects-on-track-2026` links through `nam10.safelinks.protection.outlook.com`. That address times out, and it contains a Roncelli staff email address. Replace them with the direct ferc.gov links.
3. **The home page and /news have no `<h1>`.** Four news posts have 2–4 H1s: 2025-cam-showcase-awards-project-of-the-year, cam-annual-meeting-2025, henry-ford-health-…-sterile-compounding-center, largest-general-contractor.
4. **Duplicate CMS items.** 10 projects are listed twice, under the original slug and a `-xxxxx` or `-2` copy, for example `zf-office-renovation` and `zf-office-renovation-tjvtq`. Two news posts are also duplicated. These are duplicate titles and descriptions in Google's index. Decide which copy stays, then archive the other and add a 301 redirect.
5. **Render-blocking reCAPTCHA in the site head.** `google.com/recaptcha/api.js` loads synchronously on every page. Make it `async defer`, or load it only on pages with forms. This is likely part of the slow FCP (6.7 s on /contact).

### Accessibility (repeats on every page)
- Footer labels (`.u-muted-40`) fail color contrast (8 per page).
- On mobile, the menu drawer link `.g-nav-menu-drawer` has no accessible name. Add an aria-label.
- On /news, the filter `<select id="Industry">` has no label.
- On /careers, the Paycom iframe has no `title`, and its scroll area can't be reached by keyboard.
- The "Close" link and empty `#` links in the nav (all pages) and the "All News" `#` link on news posts should be buttons or real links.

### SEO
- About 100 CMS pages (projects and news) have no og:title or og:description. 114 pages have no og:image, and 12 have an empty one. Bind the Open Graph fields in the CMS templates to the item's name, summary and main image.
- /legal/privacy-policy has no meta description. Two older news posts have an empty one.
- No JSON-LD anywhere. An Organization or LocalBusiness block on the home page would be a quick win.

### To raise with the client
- GA4 runs without a cookie banner. Ask whether they need one for their audience.
- Ahrefs analytics is installed twice with two different keys. Confirm which one is theirs and remove the other.

## Not checked by Claude
- Form submissions and notifications (Person).
- Webflow plan, CMS and form limits, and site backup (Person).
- Template tooling update: doesn't apply, because there is no client repo.

---

## Monthly note (draft for the person to send)

> Hi team,
>
> Here's the November health check for buildroncelli.com.
>
> **All good:** The SSL certificate and domain are current (the domain runs to 2035). Every internal link on the site works. Analytics is recording on every page.
>
> **We'd like to fix:**
> - Visitors can't zoom the site on phones. It's a one-line fix, and it's an accessibility requirement.
> - Several project and news entries are in the CMS twice, so Google sees duplicate pages. We'll confirm which version to keep and redirect the other.
> - The homepage and news page have no main heading for search engines, and a few news posts have more than one.
> - Social share previews (LinkedIn and so on) on project and news pages are missing their image and description. We'll connect them to the CMS fields.
> - Mobile load time is 6–11 seconds on key pages. The spam-protection script loads on every page and holds the page back. We'll move it to the pages with forms.
> - One news article links through an Outlook email-safety address instead of the real site. We'll replace those links.
>
> **For you to decide:**
> - Do you need a cookie consent banner? (It depends on whether you market to the EU, the UK or US states with privacy laws.)
> - We found two separate Ahrefs tracking codes. Which account is yours?
>
> Thanks!
