# Outstanding items

Tracking what's left before this site is fully ready to replace the live one.

## Blocking / needs real data from you

- [ ] **Real email address** — footer/contact still use a placeholder (`info@goodallelectrical.com.au`). Confirm if that's actually correct or swap it.
- [ ] **Real street address** — only "Sale, VIC" is used (no street number). Fine for schema/local SEO as-is, but confirm if you want a full address shown.
- [ ] **Licence / REC number** — only ACN (684 711 224) shows. Add licence number if you want it displayed.
- [ ] **Photos** — every project tile, service page and blog post still uses an abstract gradient/grid placeholder — no real jobsite photos, team photos, or venue shots anywhere on the site. This is the single biggest thing standing between this site and looking fully "real." Send photos (via GitHub upload, same as the logo) whenever you have them and I'll swap them in everywhere they're needed.
- [ ] **Social links** — Facebook/Instagram/LinkedIn icons in the footer currently link to `#` (nowhere). Send the real profile URLs.
- [ ] **Real testimonials** — testimonials.html currently has only the one quote already used on the homepage. Send more client feedback to fill it out.

## Done

- [x] CBUS lighting control &amp; automation landing page (service-control-automation-cbus), linked from the Control & Automation hub — full SEO stack, wall plate design section, FAQ
- [x] SEO-STATUS.md — auto-generated audit of every page (which schema/tags are present), regenerate via the audit script rather than hand-editing
- [x] llms.txt at site root — structured summary for AI/LLM crawlers to read and index
- [x] robots.txt updated to explicitly welcome known AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot, etc.)
- [x] Clean URLs sitewide (no .html) — see deploy/nginx.conf.example and deploy/apache.htaccess.example for the Ubuntu VM server config needed to serve them
- [x] Full site build (home, services, projects, blog + posts, about, contact)
- [x] Five dedicated service pages with real copy/rates/FAQ (Electrical, Audio Visual, Control & Automation, Communications, TV Antennas)
- [x] 100 service+town landing pages (20 towns × all 5 services: Electrical, Audio Visual, Control & Automation, Communications, TV Antennas)
- [x] "Service Areas" town-pill sections added to the Audio Visual, Control & Automation and Communications hub pages, linking to their new town pages
- [x] 20 general area hub pages (one per town, covering all five services) — footer "Areas" column links to these
- [x] 9 individual project detail pages, linked from every project card sitewide
- [x] Testimonials page
- [x] Privacy Policy page (discloses GA4, Meta Pixel, Clarity)
- [x] 404 page
- [x] HTML sitemap page (sitemap.html) + XML sitemap (sitemap.xml, 147 URLs) + robots.txt
- [x] Real logo + favicon (cropped from the real file)
- [x] Real phone number, ACN, five-service lineup everywhere
- [x] Meta Pixel, Microsoft Clarity, and Google Analytics 4 installed sitewide, with explicit per-page title/path
- [x] JSON-LD: LocalBusiness/Electrician, Service (with per-town areaServed), BreadcrumbList, FAQPage schema (506 blocks, all validated)
- [x] Linked the "Where We Work" town pills on services.html to the 20 area hub pages (were previously plain, non-clickable text, and listed two towns — Wonthaggi, Warragul — with no page behind them)
- [x] Canonical tags + Open Graph/Twitter card tags on every page
- [x] Zero broken internal links across all 148 pages (checked programmatically)

## Worth considering later (not asked for yet)

- Update the 20 `area-{town}.html` general hub pages to link to the new Audio Visual / Control & Automation / Communications town pages (currently link to the main hub pages for those three services)
- **Google Search Console** — need a verification meta tag or DNS record
- **Google Ads conversion tracking** — only relevant once you're running Google Ads; would track form submits + phone clicks as conversions
- **Google Local Services Ads (Google Guaranteed)** — pay-per-lead, badge shows above regular search ads, strong fit for a trades business
- **Google Tag Manager** — worth moving Meta Pixel + Clarity + GA4 into one GTM container instead of hardcoded snippets, so future tags don't need a code change
- **Trade lead-gen directories**: hipages, Oneflare, ServiceSeeking — AU-specific job marketplaces, often higher ROI than social for trades
- **Bing Places** — free, Bing's equivalent of Google Business Profile
- **Nextdoor** — hyper-local community app, growing for trade recommendations in Australia
- **Google Business Profile** — not code, but the single highest-value thing for local search ("electrician near me" / Maps pack); make sure it's claimed and fully filled out
- Compressed/optimized image pipeline once real photos are in (currently only the logo + favicon are raster assets)
