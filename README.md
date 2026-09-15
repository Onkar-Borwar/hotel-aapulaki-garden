# Hotel Aapulaki Garden

Responsive restaurant website for Hotel Aapulaki Garden, a Maharashtrian, Indian, North Indian and seafood dining destination on the Talegaon–Chakan Highway in Malwadi, Talegaon Dabhade.

## Built with

- React + TypeScript + Vite
- Wouter client-side routing
- Tailwind CSS
- Lucide icons
- Local browser storage for the takeaway basket and theme preference
- WhatsApp deep links for reservations, takeaway and event enquiries

## Verified business details



Opening hours, current prices, offers, ratings, reviews, awards and social accounts were not verified, so the site does not present them as facts. The supplied Google Maps listing photo is used in the homepage and gallery with a direct link back to the listing.

## Run locally

### 1. Install the required software

Install these tools on Windows:

- **Node.js 20 LTS or newer:** https://nodejs.org/
- **Git:** https://git-scm.com/downloads
- **pnpm 10:** open PowerShell after installing Node.js and run:

```powershell
corepack enable
corepack prepare pnpm@10 --activate
```

Close and reopen PowerShell after installing them, then confirm:

```powershell
node --version
pnpm --version
git --version
```

### 2. Open the website folder

The downloadable source bundle contains an inner folder named `artifacts\hotel-aapulaki-garden`.
Open PowerShell and move into that folder:

```powershell
cd "C:\Users\Onkar\OneDrive\Desktop\python\HOTEL AAPULAKI GARDEN\artifacts\hotel-aapulaki-garden"
```

If you copied the contents of that inner folder into the root of a new GitHub repository, use the repository folder instead:

```powershell
cd "C:\path\to\your\github-repository"
```

### 3. Install dependencies

```powershell
pnpm install
```

### 4. Start the development website

PowerShell uses this syntax for environment variables:

```powershell
$env:BASE_PATH="/"
$env:PORT="4173"
pnpm run dev
```

Open **http://localhost:4173** in your browser. Keep the PowerShell window open while using the site. Press `Ctrl+C` to stop it.

### 5. Create a production build locally

```powershell
$env:BASE_PATH="/"
$env:PORT="4173"
pnpm run build
```

The finished static website is created in:

```text
dist\public
```

To preview that production build locally:

```powershell
pnpm run serve
```

Open **http://localhost:4173** again.

### If you use Command Prompt instead of PowerShell

Use these commands instead:

```bat
set BASE_PATH=/
set PORT=4173
pnpm run dev
```

### Useful editing locations

Most restaurant content is in `src\App.tsx`:

- `PHONE`, `WHATSAPP`, `ADDRESS` and `MAPS_URL`
- `menuItems`
- `galleryItems`
- `faqItems`
- `LISTING_PHOTO_URL`

After editing, stop and restart the development server if the browser does not update automatically.

## Save the project to GitHub

Yes. GitHub is a good place to save the source code and version history.

### 1. Create a GitHub repository

1. Sign in at https://github.com/
2. Click **New repository**.
3. Use a name such as `hotel-aapulaki-garden`.
4. Choose **Public** if you want free GitHub Pages hosting without restrictions.
5. Do not add a README, `.gitignore`, or license during creation because this project already has its own files.
6. Click **Create repository**.

### 2. Put the website files in the repository

For a simple standalone GitHub repository, copy the **contents** of:

```text
artifacts\hotel-aapulaki-garden
```

into the root of the new repository. The repository root should contain `package.json`, `src`, `public`, `vite.config.ts`, and `.github`.

Do not put the website one level too deep. GitHub Actions must be able to find `package.json` and `.github\workflows\deploy-pages.yml` directly in the repository root.

### 3. Upload the files using Git

In PowerShell, from the root of the new repository:

```powershell
git init
git branch -M main
git add .
git commit -m "Add Hotel Aapulaki Garden website"
git remote add origin https://github.com/YOUR-USERNAME/hotel-aapulaki-garden.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username and use your repository's exact URL.

If GitHub asks you to sign in, complete its browser authentication or use GitHub Desktop:
https://desktop.github.com/

### 4. Turn on GitHub Pages

The project already includes `.github/workflows/deploy-pages.yml`. It automatically:

1. Installs Node.js and pnpm.
2. Installs the website dependencies.
3. Builds with the correct repository base path.
4. Uploads `dist/public`.
5. Publishes the site to GitHub Pages.

After the first push:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy Hotel Aapulaki Garden** to finish.
5. Return to **Settings → Pages** and open the published URL.

For a repository named `hotel-aapulaki-garden`, the URL normally looks like:

```text
https://YOUR-USERNAME.github.io/hotel-aapulaki-garden/
```

Every future push to the `main` branch will rebuild and publish the website automatically.

### 5. Update the website later

After changing files:

```powershell
git add .
git commit -m "Update restaurant website"
git push
```

GitHub Actions will deploy the new version automatically. Check the **Actions** tab if the site does not update.

## GitHub Pages with a custom domain

If you later have a domain such as `www.aapulakigarden.com`:

1. Open **Settings → Pages** in GitHub.
2. Enter the custom domain.
3. Add the DNS records GitHub shows at your domain provider.
4. Once the custom domain is active, change the workflow's `BASE_PATH` from:

```yaml
BASE_PATH: /${{ github.event.repository.name }}/
```

to:

```yaml
BASE_PATH: /
```

5. Push the change and wait for the next deployment.

## Troubleshooting

- **`pnpm` is not recognized:** close and reopen PowerShell after running `corepack enable`, or install pnpm from https://pnpm.io/installation.
- **The page is blank on GitHub Pages:** confirm that the GitHub Pages source is **GitHub Actions** and that the Actions deployment completed successfully.
- **Images or links look wrong on GitHub Pages:** confirm that you used the included workflow; it builds with the repository name as `BASE_PATH`.
- **A route such as `/menu` gives a 404:** keep the included `public/404.html` file in the repository.
- **The site still shows an older version:** wait for the Actions run to finish, then hard-refresh the browser with `Ctrl+F5`.

## Existing commands

```bash
pnpm install
pnpm --filter @workspace/hotel-aapulaki-garden run dev
```

The artifact workflow supplies `PORT` and `BASE_PATH`. For a direct production build:

```bash
BASE_PATH=/ PORT=4173 pnpm --filter @workspace/hotel-aapulaki-garden run build
```

## Edit the site

The editable content is intentionally concentrated in `src/App.tsx`:

- Update `PHONE`, `WHATSAPP`, `ADDRESS` and `MAPS_URL` for contact details.
- Replace `menuItems` with the confirmed menu and prices.
- Replace `LISTING_PHOTO_URL` and `galleryItems` when the team has permanent, owner-approved restaurant photography.
- Update `faqItems` with only answers the team has verified.
- Add real social links only when they are available.

The current listing photo is credited to the supplied Google Maps listing. Any remaining editorial image treatments are labeled as placeholders and are not photographs of Hotel Aapulaki Garden.

## GitHub Pages

1. Build with the repository path as the Vite base. For a repository called `hotel-aapulaki-garden`, use `BASE_PATH=/hotel-aapulaki-garden/`.
2. Publish the generated `dist/public` directory from the `main` branch using **Settings → Pages → Deploy from a branch → main → / (root)**.
3. The included `404.html` sends deep links back through the SPA shell so routes such as `/menu` continue to work on GitHub Pages.
4. For a custom domain, configure the domain in GitHub Pages and add the DNS records GitHub provides. Create a `CNAME` file only after the real domain is known.

For a custom domain or a `username.github.io` repository, build with the appropriate base path instead of assuming `/`.
