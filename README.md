# Nordic Portfolio Showcase

I need your help to do a portfolio for me and store it on GitHub in a new repositories, i will give you all pictures later and the theme should be inspiried by scandinavian animation of norsken in the background with a nice timeline of me and and build the portfolio website according to this instructions attached.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d04d78f9-3f69-4856-88ac-5033fb5f0581).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Self-hosting on a Synology NAS (Container Manager / Docker)

The production build runs as a Node SSR server on port 3000.

```sh
npm run build   # outputs .output/
npm run start   # node .output/server/index.mjs
```

On the NAS:

1. Copy this repository into a shared folder (e.g. `/docker/rickard-portfolio`).
2. Container Manager → **Project** → Create → point it at the folder's `docker-compose.yml`.
3. Build and start. The site is served at `http://<nas-ip>:3000`.

Optionally put Synology's reverse proxy (Control Panel → Login Portal → Advanced → Reverse Proxy) in front of port 3000 for a custom domain and HTTPS.
