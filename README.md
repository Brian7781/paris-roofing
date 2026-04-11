# Paris Roofing Services — Website

Static, single-page marketing site for **Paris Roofing Services** (Liberty Hill, TX). Built for GitHub Pages — no build step, no framework, no backend.

**Business facts baked into the site:**
- Owner: Terry Paris (founded 1976, returning to active work)
- Phone: (512) 740-3215
- Based in: Liberty Hill, TX (service-area business — **no street address published**)
- Tagline: *Central Texas Roofing Since 1976*
- Hook: *We beat any written estimate by $300 — guaranteed*

---

## File structure

```
PariRoofing/
├── index.html          # Full single-page site + Schema.org JSON-LD
├── css/style.css       # All styling (mobile-first)
├── js/main.js          # Nav, smooth scroll, storm alert toggle, scroll-to-top
├── images/             # Drop real photos here (see images/README.txt)
└── README.md           # This file
```

---

## Placeholders to fill in before launch

Search (grep) the project for each of these and replace:

| Placeholder                 | Where it lives                                | What to do |
|----------------------------|-----------------------------------------------|------------|
| `[GBP_LINK]`               | `index.html` (reviews section, footer)        | Replace with the public Google Business Profile URL once verified. |
| `[FACEBOOK_LINK]`          | `index.html` (footer)                         | Replace with the Facebook page URL, or remove the link. |
| `[REVIEW PLACEHOLDER ...]` | `index.html` (reviews section, 3 cards)       | Replace with real Google review text + first name + city. |
| `[First Name], [City]`     | `index.html` (reviews section)                | Real reviewer first name and city. |
| `info@parisroofingservices.com` | `index.html` (form `action`)             | Replace with the real email address that should receive estimate requests. |
| `parisroofingservices.com` | `index.html` (canonical, OG URL, schema)      | Replace with the real domain once registered. |
| `og-cover.jpg`             | `images/` + `index.html` (OG + schema image)  | Drop a 1200×630 social cover image in `images/`. |

Quick grep to find them all:

```bash
grep -rnE "\[(GBP_LINK|FACEBOOK_LINK|REVIEW PLACEHOLDER|First Name|City)\]|parisroofingservices\.com|og-cover\.jpg" .
```

> The phone number **is already real** — (512) 740-3215 is hardcoded throughout.
> No `PHONE_PLACEHOLDER` to replace.

---

## Replacing review placeholders

In `index.html`, find the `<!-- SECTION 6 — REVIEWS -->` block. Each of the three review cards looks like this:

```html
<div class="card review">
  <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
  <p>"[REVIEW PLACEHOLDER — to be replaced with real Google review text]"</p>
  <div class="review__author">— [First Name], [City]</div>
</div>
```

Replace the `<p>` text with the real review and update the author line. Leave the star rating alone unless the actual review was less than 5 stars.

---

## Adding real photos

1. Drop photos into `images/` (see `images/README.txt` for sizing).
2. Keep file names lowercase with hyphens.
3. Reference them in `index.html` with real `alt` text.
4. For a hero background photo, open `css/style.css`, find the `.hero` rule, and add:
   ```css
   background: linear-gradient(135deg, rgba(18,26,48,.78), rgba(26,39,68,.82)), url('../images/hero.jpg') center/cover no-repeat;
   ```

---

## Toggling the storm alert banner

At the very top of `js/main.js`:

```js
const showStormAlert = true;   // red banner is ON
// const showStormAlert = false; // red banner is OFF
```

Flip this variable on after a hail event — the banner appears across the top of every page with a link to the estimate form. Flip it off when the storm wave passes.

---

## Deploy to GitHub Pages

From `~/Desktop/PariRoofing/`:

```bash
# 1. Stage + commit
git add .
git commit -m "Initial Paris Roofing Services site"

# 2. Create the GitHub repo (either via the web UI or `gh repo create`)
#    Then wire up the remote — replace YOUR_USER and REPO_NAME:
git remote add origin https://github.com/YOUR_USER/REPO_NAME.git

# 3. Push
git push -u origin main
```

Then in GitHub:

1. Open the repo on github.com.
2. **Settings → Pages**.
3. Under **Source**, pick **Deploy from a branch**.
4. Branch: `main` · Folder: `/ (root)` · **Save**.
5. Wait ~60 seconds; the site URL appears at the top of the Pages panel:
   `https://YOUR_USER.github.io/REPO_NAME/`

---

## Connecting a custom domain

Once you own `parisroofingservices.com` (or similar):

1. At your DNS host, add:
   - **A records** pointing the apex (`@`) to GitHub's Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `YOUR_USER.github.io`
2. In the repo: **Settings → Pages → Custom domain** → enter `parisroofingservices.com` → Save.
3. Wait for DNS to propagate, then check **Enforce HTTPS**.
4. Update the canonical URL and OG URL in `index.html` to match the real domain.

---

## Google Business Profile — the step that cannot be skipped

A website alone won't rank locally. Terry (or Richard on his behalf) has to verify a **Google Business Profile** at `business.google.com`, category *Roofing Contractor*. Because Paris Roofing is a **service-area business**, configure GBP to *hide* the street address and list the service-area cities instead — Google still requires a real address during verification (postcard or phone/video), but it will not display publicly. Once verified, paste the GBP URL into `[GBP_LINK]` throughout `index.html`.
