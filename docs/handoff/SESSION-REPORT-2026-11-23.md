# Session report: 2026-11-23

The Claude Code sessions listed below were archived and then deleted on 2026-11-23 to keep the Claude app responsive. This file records where each one left off, so a new session can pick up the work.

Read this with `HANDOFF.md` (the project brief and its Status section). If something here conflicts with `HANDOFF.md`, `HANDOFF.md` and the git history are more current.


## Open items

- None recorded. Check `HANDOFF.md` › Status and `MANUAL-TODO.md`.

## Repo state on 2026-11-23

Latest commits on the default branch:

- 4e590f8 2026-11-23 Merge pull request #2 from brandvm/rc-04-parity
- cb3b957 2026-11-23 RC-04 parity: move the site's JavaScript from Webflow into the bundle
- 1e37a0a 2026-11-23 Merge pull request #1 from brandvm/chore/template-1.0.1
- 2ee3108 2026-11-20 GOTCHAS: template test fix upstreamed in 1.0.1; seo.mjs fix re-applied after the update
- 80ccd98 2026-11-20 Template 0.23.0 -> 1.0.1 (RC-05)
- d4b7f13 2026-11-20 GOTCHAS: wf:baseline --live shoots staging; correct the SEO batch's visual-check claim

Branches not merged into the default branch:

- `origin/template-update`

## Sessions (newest first)

### Roncelli: SEO batch (H1s, Open Graph)

- **Active:** 2026-11-20 → 2026-11-23 11:44
- **Session:** `local_a9f468d5-43df-4dac-9436-d70339ce876a` (deleted 2026-11-23)
- **PR:** [brandvm/wf-roncelli#1](https://github.com/brandvm/wf-roncelli/pull/1)
- **PR:** [brandvm/wf-template#27](https://github.com/brandvm/wf-template/pull/27)
- **PR:** [brandvm/wf-roncelli#2](https://github.com/brandvm/wf-roncelli/pull/2)
- **Started with:** "Another Claude session sent a message: <cross-session-message from="local_63d734be-a5b4-428c-b937-21a62dc9c2d3" from-name="Harvest client lessons, then audit 8 client sites"> Go-ahead from the user ("can you tell them?", after the next-step list): next, plan RC-04, the parity release that moves the …"
- **Where it ended:** The parity release is on staging and checked: 63 of 64 shots match live (the 64th is known slider noise), behaviour is the same, and CLS is 0.
- **Recent progress:**
  - 2026-11-23 15:03 UTC: CI passed on both PRs (brandvm/wf-roncelli#1 for template 1.0.1, brandvm/wf-template#27 for the 1.0.2 seo.mjs fix), and neither is merged. RC-04 hasn't started and is waiting on the five plan decisions. Nothing has changed in Webflow since the SEO batch went live.
  - 2026-11-23 15:47 UTC: The RC-04 repo part is done and committed locally on rc-04-parity (cb3b957), not pushed. The site's JavaScript is bundled and matches live locally: 0 px difference, same behaviour. Real live reference shots are saved. Nothing is installed in Webflow yet.
  - 2026-11-23 16:44 UTC: The parity release is on staging and checked: 63 of 64 shots match live (the 64th is known slider noise), behaviour is the same, and CLS is 0. The live site is unchanged. Commit 8c426fc (the loader theme colour) is local and not pushed.

### Roncelli monthly audit

- **Active:** 2026-11-06 → 2026-11-20 12:08
- **Session:** `local_d20e4778-a0dd-4dd3-83d3-4a7423c63b82` (deleted 2026-11-23)
- **PR:** [brandvm/wf-template#26](https://github.com/brandvm/wf-template/pull/26)
- **Started with:** "@"/Users/Work/Documents/Webflow Projects/Roncelli/https-www-buildroncelli-com-.dbseospider" read this and make a combined list. and categorize into we can do, need client's go to implement (mostly for content change)"
- **Where it ended:** PR #26's merge conflicts are resolved and pushed as 63ec963.
- **Recent progress:**
  - 2026-11-16 18:03 UTC: Committed 3cfe7d9 to master and pushed it to brandvm/wf-roncelli: the schema sources, the validator, and action list A18 marked done and live. The CI result hasn't been checked.
  - 2026-11-20 17:04 UTC: PR #26's merge conflicts with master are resolved and pushed as f704196. The fix now ships as 0.25.1, after the new 0.25.0. Checks and the three changed tests pass locally; Auto-fix will re-check GitHub.
  - 2026-11-20 17:08 UTC: PR #26's merge conflicts are resolved and pushed as 63ec963. The fix now ships as 1.0.1, and the loader-port part was dropped because 1.0.0 removed dev mode. Checks and the touched tests pass locally; Auto-fix will re-check GitHub.

