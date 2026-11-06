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
