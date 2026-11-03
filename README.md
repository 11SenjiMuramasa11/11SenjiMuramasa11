# Muramasa — Adventure Log

A Genshin Impact-inspired portfolio for **Justine James "Muramasa" Prades**. It borrows the shape of an in-game profile: a navy namecard, a gold book frame, parchment pages, ranked stats, equipment cards, and a tabbed project archive.

The site is plain HTML, CSS, and JavaScript. There is no framework, package manager, build step, or server code.

This repository also houses the source of my GitHub profile README in `github-profile/`. The profile is meant to live in the special `11SenjiMuramasa11/11SenjiMuramasa11` repository, not in a new repo.

## Run it locally

Open `index.html` directly, or serve the folder so relative paths and fonts behave exactly as they would online:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then visit <http://127.0.0.1:4173>.

A local server is recommended. Opening the file directly works, but some browsers restrict local asset loading.

## Edit your information

Almost everything lives in **`assets/data.js`**. It is a single `window.PORTFOLIO` object. Edit it in any text editor and reload the page.

```js
identity: {
  name: "Justine James Prades",
  alias: "Muramasa",
  handle: "11SenjiMuramasa11",
  role: "Backend developer in progress",
  signature: "I turn ideas into REST APIs — currently leveling up one endpoint at a time.",
  bio: "I’m Justine, a JavaScript developer who learns by building...",
  avatar: "assets/avatar-cropped.png",
  github: "https://github.com/11SenjiMuramasa11",
  email: "",
  resume: "",
  githubJoined: "2025-05-26",
  projectsBuilt: 3
}
```

`Days on GitHub` is calculated from `githubJoined` each time the page loads, so it stays current. `projectsBuilt` is the number shown in the second rank bar; update it when you add a project.

### Fields that disappear when blank

`email` and `resume` are optional. If a value is an empty string, the corresponding link or detail is hidden automatically. There is no broken placeholder to clean up.

### Adding a résumé

1. Put the file in `assets/`, for example `assets/justine-prades-resume.pdf`.
2. Set `resume: "assets/justine-prades-resume.pdf"` in `assets/data.js`.
3. The **Résumé** button appears in the profile actions.

The site only links to the file. It does not read or extract text from a PDF.

### Other editable sections

| Key | What it controls |
| --- | --- |
| `stats` | The four numbers in the strip under the intro. |
| `ledger` | The "developer record" rows on the left page. |
| `skills` | The eight Equipment namecards. Clicking one opens a detail dialog. |
| `projects` | The project cards and their detail dialogs. |
| `log` | The Adventure Log timeline on the Projects tab. |

Each skill needs a unique `id`, a `label`, an `art` key, a `tag`, a `summary`, a `description`, and a `usedIn` list. Available `art` keys are defined in `index.html`:

`js`, `node`, `express`, `mysql`, `rest`, `git`, `github`, `backend`, `music`, `student`, `portfolio`.

Each project needs a unique `id`, `title`, `art`, `type`, `year`, `summary`, `description`, `stack`, `highlights`, `note`, and `repo`. Leave `repo` empty to hide the repository button in its dialog.

## Replace the avatar

Replace `assets/avatar-cropped.png` with a square image, ideally at least 320 × 320 px. Keep the same filename, or update `identity.avatar`.

The current image is the public GitHub avatar, cropped to remove the baked-in "Traveler" label.

## Deploy with GitHub Pages

1. Create a repository, for example `portfolio`.
2. Push these files to the default branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then select the default branch and the `/ (root)` folder.
5. Save. GitHub publishes the site at `https://11SenjiMuramasa11.github.io/portfolio/`.

If you name the repository `11SenjiMuramasa11.github.io`, it publishes at `https://11SenjiMuramasa11.github.io/` instead. No build command is needed.

The `.taste-skill/` folder contains local design-check output. It is excluded in `.gitignore` and is not needed by the site.

## GitHub profile README

`github-profile/` contains the ready-to-publish GitHub profile README and its centered circular portrait. Follow `github-profile/SETUP.md`; do not publish `SETUP.md` itself. Keep `README.md` and `avatar-circle.png` side by side so the portrait path resolves.

## Project structure

```text
.
├── index.html                 Page structure, SVG artwork, tabs, dialog
├── assets/
│   ├── styles.css             Visual system and responsive rules
│   ├── data.js                Editable content (start here)
│   ├── app.js                 Rendering, tabs, dialogs, motion
│   ├── avatar-cropped.png     Profile portrait
│   ├── avatar.png             Original GitHub avatar
│   ├── favicon.svg            Site icon
│   └── starfield.svg          Page background
├── github-profile/
│   ├── README.md              Ready-to-publish GitHub profile README
│   ├── SETUP.md               Publish instructions (not for GitHub)
│   └── avatar-circle.png      Centered circular profile portrait
└── README.md
```

## Design notes

- All namecard and equipment artwork is original inline SVG. No official game art is copied or hotlinked.
- Fonts are Cormorant Garamond and Nunito Sans from Google Fonts. If they fail to load, the page falls back to Georgia and Segoe UI.
- The layout is a two-page book on desktop and a stacked card on tablets and phones.
- Tabs support arrow keys, Home, and End. The project and skill dialogs close with Escape and restore focus.
- Motion is reduced automatically when the operating system asks for it.

## Disclaimer

This is a fan-made portfolio. **Genshin Impact** is a trademark of HoYoverse. This project is not affiliated with or endorsed by HoYoverse.
