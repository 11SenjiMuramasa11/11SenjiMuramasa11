# Justine James Prades — Portfolio

Personal portfolio site. Full-stack developer and QA engineer based in Laguna, Philippines.

**Live URL:** https://11senjimuramasa11.github.io/11SenjiMuramasa11/ *(update when deployed)*

## Stack

- **React 19** — UI components
- **Vite 8** — build tooling and dev server
- **Motion (Framer Motion)** — scroll animations, parallax, and transitions
- Web Audio API — procedural UI sound effects (no audio files)

## Run locally

```bash
npm install
npm run dev        # dev server at http://localhost:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Folder structure

```
site/
├── public/
│   ├── me.webp              # hero photo
│   ├── portrait.png         # OG/fallback portrait
│   ├── favicon.svg
│   ├── projects/            # project screenshot WebPs
│   └── certs/               # certificate images (WebP) and PDFs
├── src/
│   ├── components/          # React components
│   ├── App.jsx
│   ├── data.js              # all editable content lives here
│   ├── audio.js             # Web Audio sound engine
│   ├── styles.css           # base design tokens and layout
│   └── genshin.css          # component-level styles
├── index.html
└── package.json
```

## Editing content

All text, links, project data, and certifications are in `src/data.js` and the top of each relevant component (`Work.jsx`, `Background.jsx`). No CMS required.
