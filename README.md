# ♡ A Little World for Buttercup

A handmade, romantic digital scrapbook for **Haziqah (Que)**, affectionately called **Buttercup**, celebrating her **21st birthday on October 25, 2026**. Built with **React, Vite, Tailwind CSS, Framer Motion, Swiper, and Lucide React**.

The website includes a birthday page, photo carousels, polaroid wall, story timeline, flip-over notes, surprise cards, a clickable envelope with a birthday/apology letter, a photo lightbox, a tiny music player, and an edit panel.

## Publish on GitHub Pages (recommended)

**This download is GitHub Pages-ready.** A GitHub Actions workflow in `.github/workflows/deploy.yml` automatically installs dependencies, runs `npm run build`, and publishes `dist/` whenever you push to `main`. Select **Settings → Pages → Source: GitHub Actions**.

**See [GITHUB_PAGES.md](GITHUB_PAGES.md) for the full beginner-friendly steps**, including how to upload your personal photos and letter so Que can see them on her phone.

## Run on your laptop

You need Node.js **18 or newer** and an internet connection for installing npm packages.

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173/`).

For a production build:

```bash
npm run build
npm run preview
```

The compiled site is in **dist/**. Upload its contents to a static host (Netlify, Vercel, GitHub Pages, etc.).

## Make it *your* gift before sharing

**1. Replace the illustrations with your real photos.** The six images included here are original illustrated placeholders, NOT claims about your actual memories. You have two easy options:

- **Inside the website:** click **Edit** at the top. In Photos, add photos, edit titles and captions, and rearrange. Or click **Add another memory** on the photo wall.
- **In the code:** put your actual photo files in `public/memories/` and edit the `sampleMemories` image paths, captions and dates in `src/data/content.js`. An example photo path is `/memories/our-date.jpg`.

**2. Make the letter personal.** Open **Edit → Letter** and rewrite details to reflect what you actually want to apologize for. The sample does not invent what the arguments were about or pressure her to forgive you. Alternatively edit `sampleLetter` in `src/data/content.js`.

**3. Customize the timeline and notes.** Open **Edit → Little things** or **Edit → Story** to replace the example messages. You can also edit all these in **`src/data/content.js`**. The date labels on the sample story are placeholders, not your real history.

**4. Replace the song (optional).** The music player includes an **original instrumental placeholder** at `public/audio/our-song.wav`; you can replace that file with your own `.wav` or edit the path in `src/components/MusicPlayer.jsx` for `.mp3` or `.ogg`. Music never plays automatically.

**5. Change your signature.** The example letter ends "Your person ♡". Replace this with what you normally call yourself. The default website does not mention a long-distance relationship.

### VERY IMPORTANT: browser edits do not publish themselves

Because this version needs no backend, editing text and uploading photos in the website saves your changes **only to that browser's localStorage**. Que will **not** see those changes on her phone merely because you send her the same URL.

To publish exactly what you edited in the website:

1. In the site, finish editing all photos, the letter, little notes and timeline.
2. Click **Edit → Export gift-data.json**.
3. Place the downloaded **`gift-data.json`** file in this project's **`public/`** directory.
4. Run `npm run build` again and upload the new **dist/** folder to your host.
5. Open the website in a **private/incognito** window or different phone and check that the photos and edits are present.

That's it! The exported JSON includes your images and text so they can be loaded from the publicly deployed website. **Any photos embedded into `gift-data.json` will become publicly accessible to anyone with access to the site's files.** Share the URL only with whom you intend, and don't use sensitive photos on a public static host.

If you've previously edited the site in your own browser, the old local edits override the published JSON on that device. Use a private window or **Edit → Restore original sample** (this clears only that browser's edits) to preview the deployed data.

> **Photo size/storage:** The browser automatically resizes images before saving them. For large galleries, browser storage may fill up. Export a backup regularly. For lots of high-resolution images, prefer putting photos directly in `public/memories/` and editing `src/data/content.js`.

## Folder structure

```text
buttercup-for-que/
├─ public/
│  ├─ audio/our-song.wav       # working original placeholder melody
│  ├─ memories/                # six original SVG illustrations; add real photos here
│  └─ favicon.svg
├─ src/
│  ├─ components/              # polaroid, navigation, editor, gallery lightbox, music player
│  ├─ sections/                # all website chapters
│  ├─ data/content.js          # all default editable personal text and photos
│  ├─ hooks/useKeepsake.js     # localStorage and exported gift loading
│  ├─ utils/photos.js          # photo resizing before storage
│  ├─ styles.css               # Tailwind directives and handmade scrapbook styling
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.js
```

## Tips before giving it to Que

- Replace the sample artwork with actual memories together, if you have them.
- Check that every letter sentence feels authentic and that you mean what you promise.
- Avoid sharing the preview `localhost` URL; use a real deployment URL so she can open it from her phone.
- Test the published link on Android/iPhone, including the audio button, photo viewer and letter.
- The best surprise is a sincere, personal note. An apology takes more than a website; this is a thoughtful starting point, not a shortcut to reconciliation.

Made with care. ♡
