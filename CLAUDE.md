# CLAUDE.md

Guidance for Claude Code when working in this repository. If you're reading this from a fresh
session, you have no memory of any prior work here — this file is the durable substitute.
Claude's cross-session memory is scoped to the directory a session was started in, so a session
started in *this* repo does not automatically inherit anything learned while working from a
different project's directory (e.g. TalkingScada). Whatever a future Claude needs to deploy or
maintain this site should live in this file, not only in session memory.

## What this project is

A Nordic-themed personal portfolio site for Rickard Sörlin, live at **https://rickardsorlin.se**.
Built and edited primarily through [Lovable](https://lovable.dev) — most commits on `main` are
merges authored by `gpt-engineer-app[bot]`, synced from the Lovable editor.

Stack: Vite + TanStack Start (SSR, React), Bun for install/build, served by Node 22 in production.

## Lovable sync — hard constraint

See `AGENTS.md`. This repo is connected to Lovable: **never force-push, rebase, or amend/squash a
commit already pushed to `main`** — that rewrites history on Lovable's side and can lose project
history there. Always merge/fast-forward forward, never rewrite backward.

## Working locally

```sh
npm i            # or: bun install
npm run dev      # vite dev
npm run build    # outputs .output/
npm run start    # node .output/server/index.mjs
```

## Deploying to the NAS

Production runs as a Docker container on Rickard's Synology NAS, reverse-proxied to
https://rickardsorlin.se. **Pushing to `main` does NOT auto-deploy** — deployment is a separate,
explicit step someone (or Claude, when asked) runs on the NAS.

### Precondition

An SSH alias named `nas` must exist in `~/.ssh/config` on whichever machine drives the deploy,
pointing at the Synology NAS with a working key. That's local machine config, intentionally not
recorded here since this repo is public — ask the user if it's missing.

### The runbook

1. **Check whether there's anything new to deploy** before touching anything:
   ```sh
   git fetch origin main
   git rev-parse HEAD origin/main            # local checkout vs GitHub
   ssh nas 'cd /volume1/docker/rickard-portfolio/release && git rev-parse HEAD'   # what's live
   ```
2. If the NAS's checked-out HEAD is behind `origin/main`, deploy:
   ```sh
   ssh nas 'cd /volume1/docker/rickard-portfolio/release && bash update.sh'
   ```
3. What `update.sh` actually does (it is tracked in this repo at the root — [update.sh](update.sh)
   is the source of truth, this is a description of it):
   - Puts `/usr/local/bin` on `PATH` itself and aborts up front if `docker` still isn't found.
     Non-interactive SSH on DSM only has `/usr/bin:/bin:/usr/sbin:/sbin`, so without this the
     script used to die at `docker: command not found` *after* `git pull` — leaving the checkout
     updated but the old container still running.
   - Refuses to run if the release checkout has uncommitted local changes (`git status
     --porcelain`) — if it does, that means someone edited the NAS copy directly; investigate
     (`git status`/`git diff` there) before doing anything else, don't overwrite it.
   - `git fetch` + `git pull --ff-only origin main`.
   - Tags the currently-running image as `rickard-portfolio:previous` (a rollback point) before
     building the new one. This overwrites `:previous` on every run, so re-running with no new
     code replaces the real pre-deploy image — tag it under a dated name first if you want to keep it.
   - `docker compose build` + `docker compose up -d --remove-orphans`.
   - Polls `http://127.0.0.1:3000/` for up to ~60s waiting for the container to come up.
   - Verifies 8 routes respond: `/ /journey /projects /education /about /contact
     /projects/talking-systems /assets/rickard-portrait.png`. It uses `curl --fail` without
     `-L`, so a redirect counts as OK — `/journey` intentionally 307s to `/`.
   - **On any route failing verification, it automatically rolls back** to `:previous`,
     re-verifies, and exits non-zero either way — a failure is never silently swallowed.
4. After it reports success, confirm the deployed commit and spot-check the live site:
   ```sh
   ssh nas 'cd /volume1/docker/rickard-portfolio/release && git rev-parse HEAD'
   curl -s -o /dev/null -w "%{http_code}\n" https://rickardsorlin.se/
   ```

### Where things live on the NAS

- Release checkout (contains the tracked `update.sh`): `/volume1/docker/rickard-portfolio/release`
- Container: `rickard-portfolio`, image `rickard-portfolio:local` (rollback tag `:previous`,
  `docker-compose.yml` in this repo defines the build)
- Bound to `127.0.0.1:3000` only — reached from the internet through Synology's own reverse
  proxy, never exposed directly on the LAN.

### Don't

- Don't run `docker compose down` or touch volumes on the NAS without checking what's there first
  — same "investigate before deleting" discipline as anywhere else.
- Don't force a deploy past a dirty release checkout (step 3's first bullet) — figure out what
  changed it before overwriting.
- Don't publish the NAS's internal IP, SSH username, or key filename into this repo — it's
  public. Keep connection specifics in local (untracked) machine config only.
