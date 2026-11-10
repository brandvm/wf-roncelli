# Manual Designer steps

Everything the Webflow MCP can't do, for a person to do in the Designer.
Claude adds a row the moment it hits a limit, with *why* the API can't;
the person marks it done; Claude then reads the result back (or checks it on
the canvas when the API can't read it) and says so.

Common reasons, so they don't need re-explaining (see the skill's
`lessons/mcp.md`):
- a value mixing a variable with `calc()`, a gradient or a shadow;
- conditional visibility on a CMS field; a list sourced from a
  multi-reference or multi-image field; "exclude current item";
- a link to the current CMS item, in a list or a component prop;
- tag styles that have never been set; reserved class names;
- placeholders, slot names, variant props exposed from nested instances.

How to enter a value with variables: select the class, switch to the
breakpoint, type `calc(` in the field and insert variables with the
variable picker. Gradients: Backgrounds → gradient, pick each stop from the
variables.

Letters run A, B, C… then AA, AB… and are never reused, so a letter
mentioned in GOTCHAS or a commit stays unambiguous. The next free letter is
also kept in `REVIEW.md` once the review phase starts.

Rows that change something visible on a page also get a marker there, so
the step is found on the canvas and nobody mistakes the unfinished state
for the design: a small Caption next to the element (on the style guide,
next to its specimen) with the attribute `data-manual-todo="<letter>"` and
the text "Manual step <letter>: <what>". When the row is done, Claude
removes the marker in the same batch that ticks the row. Before the build
handoff and before launch, no `data-manual-todo` may be left on any
published page (search the published HTML for it).

Categories to expect on every build. Go through them at the start and
again at each gate, so the steps are found early and not at the end:

1. **Values with variables in a calc, gradient or shadow** (negative
   section padding, nav height + padding, gradient stops).
2. **Reserved class names** (Label, Form) and **tag styles** never set
   before (All H1–H6 Headings, All Paragraphs, All Links): one property
   set by hand, then the API can do the rest.
3. **CMS bindings:** lists from a multi-reference or multi-image field,
   "exclude current item", links to the current item, conditional
   visibility, decimal number formats, date bindings.
4. **Component wiring:** slots made and named, variant props exposed from
   a nested instance, variant styles on an element with a combo class,
   conditional classes (typed text: check the published class list).
5. **Forms:** field names (type a value that differs from the one shown),
   placeholders, the notification address, the success and error states.
6. **Page settings:** sitemap and search exclusion, the 404 and password
   pages (the API can't reach utility pages), Open Graph images for CMS
   templates.
7. **Site settings:** fonts uploaded, head and footer code pasted, the
   staging password.

| ID | Where (page › element or class) | Breakpoint | Set | Why the API can't | Done |
| --- | --- | --- | --- | --- | --- |
| A | Market template › projects Collection List (filter) | All | Filter: `Industries` contains Current Market. On staging (2026-11-10) the filter is missing and the list shows all 86 projects. Before 2026-11-09 it was `Industry` equals Current Market. | API can't edit Collection List filters | ☑ 2026-11-10 (checked on staging) |
| B | Project template › market pill | All | Replace the single pill with a Collection List sourced from `Industries` (one pill per market, same pill class). "Back to all Projects" stays on `Industry` | API can't source a list from a multi-reference field | ☑ 2026-11-10 (checked on staging) |
| C | Site settings › 301 redirects | — | 10 redirects `/project/<copy>` → `/project/<kept>` (DECISIONS.md 2026-11-10 table) | Redirects are set in Site settings | ☐ |
| D | Market template › projects Collection List (sort) | All | Sort: Sort Order, ascending. The sort was lost when the filter changed (2026-11-10): staging lists by date created, live by Sort Order. | API can't edit Collection List settings | ☑ 2026-11-10 (checked on staging: all 10 pages in Sort Order) |
| E | Home › featured projects grid | All | Re-pick Wagner Place Development and Wayne County Airport Authority Michael Berry Administration Building. The grid had the copies (`-4wdmc`, `-hvx02`), which are archived, so it now shows 7 of 9. | Hand-picked items aren't reachable through the API | ☐ |
| F | Project template › "other projects" tabs (`.sw-other-projects`): 10 static tabs, each with its own list filtered to that tab's fixed industry | All | In each tab's list, change the filter from `Industry` equals <tab's industry> to `Industries` contains <the same industry>. The filter stays fixed per tab; it has nothing to do with the current project. Counts after the fix should match the market pages: Automotive 17 (now 14), Office 12 (now 9), Parks 5 (now 3), Entertainment 13 (now 12), Government 6 (now 5), Education 5 (now 4). Otherwise a kept project shows only under its main industry: e.g. GM Vehicle Engineering Center Tower is gone from the Advanced Manufacturing tab. | API can't edit Collection List filters | ☑ 2026-11-10, Claude in the Designer (your Chrome): all 10 tabs read back as `Industries` contains <tab's industry> |
