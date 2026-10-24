# ♡ Publish Buttercup for Que using GitHub Pages

The project already contains `.github/workflows/deploy.yml`, which will **build React with Vite and publish the resulting `dist` website for you**. There is no need to upload `dist` or run `npm run build` on your computer just for GitHub Pages.

## Step 1 — Create the repository

1. Sign in to https://github.com/ and go to https://github.com/new.
2. Repository name: `buttercup-for-que` (or another name you like).
3. Select **Public** if you are using free GitHub Pages.
4. Do **not** initialize with a README, `.gitignore`, or license (these files are in this download).
5. Click **Create repository**.

**Privacy:** A public repository exposes the text and photos in it. A GitHub Pages website is publicly accessible even when its source repository can be private on certain paid plans. Don't put anything sensitive there.

## Step 2 — Upload the *contents* of the unzipped project

Use your terminal in the extracted `buttercup-for-que` folder:

```bash
git init
git add .
git commit -m "Create Buttercup birthday scrapbook"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/buttercup-for-que.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your own GitHub username. If you chose a different repository name, replace `buttercup-for-que` in the remote address as well.

Alternative: GitHub Desktop → **File → Add Local Repository** (choose the extracted folder), create the Git repository when asked, then **Publish repository**. Or use GitHub's **Add file → Upload files** and upload the *contents* (not the ZIP file and not an enclosing parent folder), including the hidden `.github/workflows/deploy.yml` file.

## Step 3 — Enable GitHub Pages

1. In your GitHub repository open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**, not "Deploy from a branch".
3. Open the **Actions** tab and check the **Publish Buttercup to GitHub Pages** workflow. If the first run happened before you enabled Pages and failed, use **Run workflow** (or rerun the failed workflow) now.
4. Once it succeeds, return to **Settings → Pages** and click **Visit site**.

Your link will usually look like:

`https://YOUR-USERNAME.github.io/buttercup-for-que/`

The repository name determines the final path. Allow GitHub Pages time to finish publishing.

## Step 4 — Make sure Que sees *your* edits

**IMPORTANT:** The **Edit** button on the website saves changes only on the browser you are using. Changes will **not automatically** appear on her phone.

To publish changes made with the website's editor:

1. Run the app locally with `npm install` then `npm run dev`, or open your published site.
2. Edit the photos, letter, notes and timeline from **Edit**.
3. Click **Edit → Export gift-data.json**.
4. Copy this downloaded file into **`public/gift-data.json`** in your project folder.
5. Push that file to GitHub:

   ```bash
   git add public/gift-data.json
   git commit -m "Personalize Que's scrapbook"
   git push
   ```

6. GitHub Actions publishes the newly updated gift automatically.
7. Test from a **private/incognito window** or Que's device. Your own browser's stored draft may override the published file.

**Other option:** Store real photos in `public/memories/`, change paths and text in `src/data/content.js`, commit and push. All website edits checked into the repository become public.

## Updating later

When you edit files again:

```bash
git add .
git commit -m "Update Buttercup's scrapbook"
git push
```

The GitHub Actions workflow rebuilds automatically.

## Troubleshooting

- **White page / missing pictures:** Make sure you uploaded the `.github/workflows/deploy.yml` file, selected **GitHub Actions** in Settings → Pages, and you're opening the URL with the repository name and a trailing slash. `vite.config.js` uses the relative base `./` so image URLs work in a Pages project subfolder.
- **Workflow fails on install:** Check the Actions log for exact npm error. This project does not initially include a `package-lock.json`, so the workflow intentionally uses `npm install` instead of `npm ci`.
- **New photos don't show:** You probably saved edits in browser storage only. Export `gift-data.json`, add it to `public/`, and push it; then test from a private browser window.
- **Browser's old version shows:** Hard-refresh, or test in a private window.
- **URL 404:** Confirm deployment has completed under **Actions** and the correct URL under **Settings → Pages**.

Happy birthday, Buttercup ♡
