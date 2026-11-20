# Gotchas

A running log of things that cost time on this project. Agents read it at
the start of every session and add to it when they hit something new (see
the Session protocol in `AGENTS.md`). Never delete an entry — update its
`Status` instead.

Lessons from earlier builds are in the skill, not here:
`.claude/skills/webflow-build/lessons/` (one file per area). Read the file
for the area you work in. Entries tagged `Scope: template-candidate` are
collected from client repos into those files.

## Entry format

```md
### YYYY-MM-DD · Short title
- Area: designer | css | loader | release | mcp | ci | js | perf
- Scope: project | template-candidate
- Symptom: what was observed
- Cause: why it happened
- Fix: what was done, or the workaround
- Status: open | fixed <sha> | upstreamed wf-template <sha>
- Found by: claude | codex | human
```

## This project

### 2026-11-06 · Template tests fail in a freshly set-up client repo
- Area: ci
- Scope: template-candidate
- Symptom: The first push after `pnpm new-project` failed the staging workflow at `pnpm test`, in 4 test files.
- Cause: The tests assume the template's own state.
  - `loader.check.mjs` and `environment-switcher.spec.mjs` hard-code `localhost:3000`, but new-project writes the client's own dev port (3666 here) into `loader.html`.
  - `progress.check.mjs` expects an empty `progress.json` and copies it into its throwaway repos. A client's file holds its plans, so a second "plan add" is refused.
  - `update-skills.check.mjs` reads `CHANGELOG.md`, which new-project removes as template-only.
- Fix:
  - Read the dev port back from `loader.html`.
  - Seed the progress test repos with `empty()`, and skip the empty-seed test in client repos.
  - Skip the changelog test when there is no `CHANGELOG.md`, the same way `new-project.check.mjs` skips once set up.
- Status: open (fixed here, not upstreamed)
- Found by: claude

<!-- Add new entries here, newest first. -->

### 2026-11-20 · `bulk_update_pages` refused with 403; the single-page update works
- Area: mcp
- Scope: template-candidate
- Symptom: `data_pages_tool › bulk_update_pages` (openGraph on 3 pages) answered 403 "Your token does not have sufficient user-level permissions for this action". The same change through `update_page_settings`, one page at a time, succeeded straight after with the same sign-in.
- Cause: the bulk endpoint needs a permission the per-page one doesn't (not a missing OAuth scope: the error code is `insufficient_permissions`, not `missing_scopes`).
- Fix: send page settings with `update_page_settings`, one action per page, in one call. Read each result back.
- Status: worked around
- Found by: claude

### 2026-11-20 · A heading drawn as an SVG: wrap it in a DOM h1 with an SVG title
- Area: designer, mcp
- Scope: template-candidate
- Symptom: the home hero title "We Build What Matters" is an inline SVG (DOM `svg`) in a Div Block, so the page had no H1. `set_tag` can't make a Block an `h1` (Block tags are div/section/header…), and a Heading element can't hold a DOM `svg`.
- Cause: lettering exported as an SVG instead of live text.
- Fix: `data_element_builder` › `DOM` with `dom_tag: "h1"` inside the old wrapper, `move_element` the SVG into it, `role="img"` + `aria-label` on the SVG, and a `BY_CUSTOM_TAG` `title` child with `set_text` (it stores a real text node, so `textContent`, `wf:outline` and crawlers see the words). Give the h1 a class with `font-size`, `line-height` and `font-weight: inherit`: Webflow's `h1` tag style (38px/44px) otherwise changes the inline SVG's line box. Checked with `wf:baseline compare`: no shift.
- Status: fixed, live 2026-11-20
- Found by: claude

### 2026-11-20 · Making a hero heading the H1 can create a level skip below it
- Area: designer
- Scope: template-candidate
- Symptom: on /news the hero H2 became the H1, and the post cards (H3) then sat directly under it: `wf:outline` flagged "skipped a level". Before, H2 → H3 was correct.
- Cause: the cards were levelled relative to the old H2 hero.
- Fix: post card titles H3 → H2 (class D6 sets size, line-height and weight, so the look is unchanged). Run `wf:outline` after every H1 change, not only `wf:seo`.
- Status: fixed, live 2026-11-20
- Found by: claude

### 2026-11-20 · `wf:seo` counted an inline SVG's `<title>` as a second page title
- Area: ci
- Scope: template-candidate
- Symptom: after the home H1 got an SVG `<title>` (see the entry above), `wf:seo` failed `/` with "2 <title> tags".
- Cause: `seo.mjs` matched every `<title>` in the HTML. Browsers and search engines take the document title from `<head>` only; an SVG's `<title>` is its accessible name.
- Fix: `seo.mjs` reads titles from the part before `</head>`. Upstream it to wf-template (a template update would overwrite this file).
- Status: open (fixed here, not upstreamed)
- Found by: claude
