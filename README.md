# APCEGEN Technologies — Website

Premium dark-themed static website for APCEGEN Technologies, an innovation-driven biopharmaceutical company.

## Structure

```
.
├── index.html        # Single-page site with all sections
├── css/styles.css    # Premium dark design system (deep navy + gold)
├── js/main.js        # Animations, particles, smooth scroll, tabs
└── README.md
```

## Sections

1. Cinematic hero with animated typing tagline and particle network
2. About Us — vision, values, glassmorphism cards
3. Core Capabilities — Cell line, Process, Antibody Engineering, Analytics
4. Research Areas — Autoimmune, Oncology, Cardiovascular & Metabolism
5. Product Pipeline — animated horizontal pipeline chart (5 programs)
6. Milestones — vertical alternating timeline (2010 → 2025)
7. Team — leadership cards
8. Investors & Partners — including IIT Kanpur, BIRAC, NSTEDB/DST, TePP, ISBA
9. Events & Conferences — past and upcoming, with tab switcher
10. Awards & Recognitions — including ISBA Outstanding Performer 2020
11. Careers — open roles
12. Contact — info + form

## Design

- Deep navy `#06091a / #0a0e27 / #0d1230` backgrounds
- Gold gradient accents `#d4af37 → #f4d36b`
- Glassmorphism cards with backdrop-filter blur
- Inter + Playfair Display typography
- Smooth scroll, scroll-triggered animations, canvas particles, parallax

## Local Development

Open `index.html` directly in any modern browser, or serve with:

```sh
python3 -m http.server 8000
# or
npx serve .
```

## Deployment

Static files only. Deploy to any static host: GitHub Pages, Netlify, Vercel, S3+CloudFront.

For GitHub Pages: enable Pages on the `main` branch root.

## Updating Content

To add new events, awards, milestones, or team members, edit `index.html` directly. The agent that built this site can also accept content via the runner workflow and commit updates automatically.

---

© 2026 APCEGEN Technologies. Solutions for a Healthier & Happier Life.
