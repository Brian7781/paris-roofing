# Paris Roofing Services — Project Context

## What This Is

Marketing website for **Paris Roofing Services**, a Central Texas roofing contractor founded in 1976 by Terry Paris. Single-page static site designed to drive local SEO rankings and generate estimate requests. The business specializes in storm/hail damage repair and insurance claim assistance across the Austin metro and Hill Country.

**Live URL:** https://parisroofingservices.com/
**GitHub Pages:** brian7781.github.io/paris-roofing (redirects to custom domain)

## Business Identity

- **Owner:** Terry Paris (founder, 1976)
- **Phone:** (512) 740-3215 — hardcoded throughout the site and all directories
- **Base:** Liberty Hill, TX 78642 (service-area business — no street address published)
- **Hours:** Mon–Sat 7am–7pm
- **Core hook:** "Beat any written estimate by $300 — guaranteed"
- **Service area:** 15 cities within ~60 miles of Liberty Hill
- **Customer inbox:** parisroofingservicesoftx@gmail.com
- **Account manager:** Richard (manages all digital marketing on Terry's behalf)

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| HTML | Semantic HTML5 | Schema.org RoofingContractor JSON-LD, Open Graph |
| CSS | Vanilla CSS3 | Custom properties, grid, flexbox, animations |
| JS | Vanilla ES5 | IntersectionObserver scroll reveals, no frameworks |
| Fonts | Barlow Condensed + DM Sans | Google Fonts, `display=swap` |
| Hosting | GitHub Pages | Auto-deploys on push to main |
| Build | None | No preprocessor, no bundler, no package.json |
| Form | `mailto:` action | Works but should upgrade to Formspree/Netlify Forms |

**Design system:** Navy `#162038` · Cream `#f7f4ee` · Amber `#c8860a`. Mobile-first with breakpoints at 520/680/760/880/960px. CSS noise texture overlay, layered shadows, scroll-triggered staggered reveals, hero entrance animations.

## What's Built

- Full 7-section single-page site (hero, storm damage, services, why us, service area, reviews, contact)
- Responsive mobile-first layout with hamburger nav at 880px
- Sticky header with scroll blur/shadow effect
- Hero with animated background settle, staggered text reveal, amber accent line
- IntersectionObserver scroll reveal system (staggered card cascades)
- Storm alert banner (toggle via `showStormAlert` in js/main.js)
- 3 real images: hero.jpg, roof-work.jpg, storm-damage.jpg
- Complete Schema.org and Open Graph metadata
- `prefers-reduced-motion` accessibility support

## What's Pending

### High Priority
- [ ] **Real Google reviews** — 3 placeholder cards in reviews section (lines 273–290 in index.html)
- [ ] **[GBP_LINK]** — Replace 2 placeholders with `g.page/parisroofingservices`
- [ ] **[FACEBOOK_LINK]** — Replace 1 placeholder with `facebook.com/profile.php?id=61574301045292`
- [ ] **Custom domain** — Register parisroofingservices.com, connect to GitHub Pages
- [ ] **GBP verification** — Created at g.page/parisroofingservices, awaiting postcard/phone verification

### Medium Priority
- [ ] Upgrade mailto form to Formspree or Netlify Forms
- [ ] Add Google Analytics 4 tracking code
- [ ] 25-directory citation submission package (detailed plan in CITATION_SUBMISSIONS.md)
- [ ] Create og-cover.jpg (1200×630 social sharing image)

### Low Priority
- [ ] Real crew/project photos (before/after, truck, team)
- [ ] AI-generated video content (scripts drafted, not produced)
- [ ] YouTube channel setup

## Social & Directory Status

| Platform | Status | URL |
|----------|--------|-----|
| Google Business Profile | Created, verification pending | g.page/parisroofingservices |
| Facebook | Live | facebook.com/profile.php?id=61574301045292 |
| Instagram | Live, connected to FB | @parisroofingservices |
| Nextdoor | Live | nextdoor.com/page/paris-roofing-services-liberty-hill-tx |
| 21 other directories | Planned, not submitted | See CITATION_SUBMISSIONS.md |

## Decisions Future Sessions Should Know

1. **Service-area business model** — No street address published publicly. Verification address is Liberty Hill, TX 78642 but hidden from listings. This is Google-approved for contractors who work at customer sites.

2. **NAP consistency is critical** — All directories must use identical formatting: `Paris Roofing Services` / `(512) 740-3215` (with parentheses) / same URL everywhere. Inconsistency hurts local SEO.

3. **No frameworks, no build step** — This is intentional. Pure HTML/CSS/JS committed directly. No npm, no webpack, no React. Keep it zero-dependency.

4. **Storm banner is a manual toggle** — Set `showStormAlert = true` in js/main.js after major Central Texas hail events. Set to `false` when the storm wave passes.

5. **Sensitive files are gitignored** — PRIVATE_CREDENTIALS.txt, CITATION_SUBMISSIONS.md, .directory_password.txt contain passwords and account details. Never commit these. They live only on the local machine.

6. **Two people manage this** — Terry Paris (owner/contractor) and Richard (account manager/marketing). Richard controls all digital accounts via a dedicated "Paris Roofing" Chrome profile.

7. **Font upgrade from Oswald/Open Sans to Barlow Condensed/DM Sans** — Done in the visual upgrade commit. Industrial, condensed headings fit the trades-business brand better than the generic Oswald pairing.

8. **parisroofingservices.com appears 8 times in HTML** — In canonical URL, OG tags, schema.org, and form action. All need updating once the real domain is registered and DNS is configured.

## File Structure

```
PariRoofing/
├── index.html              # Single-page site (all 7 sections)
├── css/style.css           # Complete stylesheet (~935 lines)
├── js/main.js              # Interactivity + scroll reveals (~159 lines)
├── images/
│   ├── hero.jpg            # Hero background (127KB)
│   ├── roof-work.jpg       # Why-us banner photo (101KB)
│   └── storm-damage.jpg    # Storm section background (192KB)
├── CONTEXT.md              # This file
├── README.md               # Deploy instructions
├── MASTER_REFERENCE.md     # Public business info index
├── CITATION_SUBMISSIONS.md # Directory submission plan (gitignored)
├── PRIVATE_CREDENTIALS.txt # Passwords & accounts (gitignored)
└── .gitignore
```
