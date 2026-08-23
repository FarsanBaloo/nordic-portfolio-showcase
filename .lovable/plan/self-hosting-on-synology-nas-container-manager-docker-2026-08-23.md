# Self-hosting on Synology NAS (Container Manager / Docker)

Goal: run the existing site as a Node SSR container on your NAS, with zero changes to routes, content, SEO or design. Lovable preview and Lovable's own deploys keep working exactly as today.

## What changes

1. **vite.config.ts** — add a Nitro preset to the existing Lovable wrapper config:
   ```ts
   export default defineConfig({
     tanstackStart: { server: { entry: "server" } },
     nitro: { preset: "node-server" },
   });
   ```
   No extra Nitro/Vite plugin is added — the wrapper already bundles Nitro. Inside Lovable, `LOVABLE_NITRO_PRESET` still wins, so preview and Lovable publishing are unaffected; the Node preset only applies to builds run outside Lovable (i.e. in Docker).

2. **package.json** — keep `"build": "vite build"`, add:
   ```json
   "start": "node .output/server/index.mjs"
   ```

3. **Dockerfile** (new, multi-stage, Node 22 alpine)
   - Build stage: copy manifests, `npm ci` (falls back to `npm install` if no `package-lock.json` — this repo uses bun.lock, so the build stage will run `npm install`), copy source, `npm run build`.
   - Runtime stage: copy only `.output/`, set `NODE_ENV=production`, `PORT=3000`, `HOST=0.0.0.0`, `EXPOSE 3000`, run `node .output/server/index.mjs` as a non-root user.

4. **docker-compose.yml** (new)
   ```yaml
   services:
     rickard-portfolio:
       container_name: rickard-portfolio
       build: .
       restart: unless-stopped
       ports: ["3000:3000"]
       environment:
         NODE_ENV: production
         HOST: 0.0.0.0
         PORT: 3000
   ```

5. **.dockerignore** (new) — exclude `node_modules`, `.output`, `.git`, `.lovable`, logs, so the image stays small and builds clean.

6. **README** — short "Self-hosting on Synology" section: upload the repo to a shared folder, Container Manager → Project → build from `docker-compose.yml`, then reach the site at `http://<nas-ip>:3000`, optionally behind Synology's reverse proxy for a domain + HTTPS.

No database, auth, Supabase or Cloud runtime dependencies are introduced.

## Verification

- Lovable preview still loads (dev server unaffected).
- `npm run build` succeeds and `.output/server/index.mjs` exists.
- Start the built server on port 3000 and fetch `/`, `/journey`, `/projects`, `/education`, `/about`, `/contact` and a `/projects/<slug>` page — all must return 200 with server-rendered HTML (this also proves deep-link refresh works, since SSR handles nested URLs directly).

## Notes

- The Docker build runs `npm install` inside the image; since the repo ships `bun.lock` rather than `package-lock.json`, versions resolve from the semver ranges in `package.json`. If you want fully pinned installs I can add a `package-lock.json` generation step or switch the image to Bun — say the word.
- Nothing in `src/` is touched.
