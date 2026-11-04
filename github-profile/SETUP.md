# Publish the GitHub profile + portfolio

Two things ship together: the profile README and the portfolio site it links to.

## 1. Portfolio site (GitHub Pages)

The site lives in `site/` — React + Vite + Motion. It deploys from `.github/workflows/deploy-site.yml`.

1. In `11SenjiMuramasa11/11SenjiMuramasa11`, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the **Deploy portfolio** workflow manually).
4. Live at <https://11senjimuramasa11.github.io/11SenjiMuramasa11/>.

Local check:

```powershell
cd site
npm install
npm run dev
```

## 2. Profile README

GitHub only renders the root `README.md` of this repository as the profile.

1. Copy `README.md` from this folder to the repository root.
2. Copy `hero.jpg` and every `sec-*.jpg` beside it. The README references `./hero.jpg` and `./sec-*.jpg`.
3. Keep the images in the same folder as `README.md`, or the links break.
4. Commit and push, then open <https://github.com/11SenjiMuramasa11>.

The hero image and the Portfolio badge both link to the Pages URL. Publish the site first so the link works.

## Editing

- Text and links: edit `README.md` directly. The body text is real Markdown, not baked into images.
- Section header cards: `src/render-cards.mjs` (renders `hero.jpg` and `sec-*.jpg`).
- README preview: `python src/preview.py` writes `preview.html`.
- Link check: `node src/check-links.mjs`.
- Site content: `site/src/data.js`.
- Site styles: `site/src/styles.css`.

Not published: `SETUP.md`, `preview.html`, `src/`.
