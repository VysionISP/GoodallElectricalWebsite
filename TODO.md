# Outstanding items

Tracking what's left before this site is fully ready to replace the live one.

## Blocking / needs real data from you

- [ ] **Real email address** — footer/contact still use a placeholder (`info@goodallelectrical.com.au`). Confirm if that's actually correct or swap it.
- [ ] **Real street address** — only "Sale, VIC" is used (no street number). Fine for schema/local SEO as-is, but confirm if you want a full address shown.
- [ ] **Fergus PAT needed on the VM** — the contact form now posts to `/api/enquiry`, which relays into Fergus's `POST /enquiries` API (see `server/README.md`). The server code is built and ready, but it needs: (1) the Ubuntu VM actually set up, (2) `server/.env` created directly on the VM with the real Fergus Personal Access Token (never via git, never pasted in chat), and (3) the nginx `/api/` proxy block from `deploy/nginx.conf.example` added to the live config. Until then the contact form will show "Something went wrong sending that" since there's nothing at `/api/enquiry` yet.
- [ ] **More project photos** — 4 of 10 project pages now have a real photo (Sale Greyhound Racing, The Vines on Avon, Wonthaggi Workmen's Club, Sporting Legends). The other 6 (Sale Business Park, Gippsland Storage Facility, Maffra Cool Store, Longford Family Home, Stratford Renovation, Loch Sport Holiday House) still use the abstract placeholder tile — send photos whenever you have them.
- [ ] **More client logos** — 6 client logos are now shown in the homepage "Trusted By" strip (Greyhound Racing Victoria/Sale, The Vines on Avon, Wonthaggi Workmen's Club, Sporting Legends, Star Hotel Sale, Maffra Community Sports Club). Send more if you want the strip to grow.
- [ ] **Social links** — Facebook/Instagram/LinkedIn icons in the footer currently link to `#` (nowhere). Send the real profile URLs.
- [ ] **Real testimonials** — testimonials.html currently has only the one quote already used on the homepage. Send more client feedback to fill it out.

## Done

- [x] CBUS lighting control &amp; automation landing page (service-control-automation-cbus), linked from the Control & Automation hub — full SEO stack, wall plate design section, FAQ
- [x] SEO-STATUS.md — auto-generated audit of every page (which schema/tags are present), regenerate via the audit script rather than hand-editing
- [x] llms.txt at site root — structured summary for AI/LLM crawlers to read and index
- [x] robots.txt updated to explicitly welcome known AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot, etc.)
- [x] Full site build (home, services, projects, blog + posts, about, contact)
- [x] Five dedicated service pages with real copy/rates/FAQ (Electrical, Audio Visual, Control & Automation, Communications, TV Antennas)
- [x] 100 service+town landing pages (20 towns × all 5 services: Electrical, Audio Visual, Control & Automation, Communications, TV Antennas)
- [x] "Service Areas" town-pill sections added to the Audio Visual, Control & Automation and Communications hub pages, linking to their new town pages
- [x] 20 general area hub pages (one per town, covering all five services) — footer "Areas" column links to these
- [x] 10 individual project detail pages, linked from every project card sitewide
- [x] Testimonials page
- [x] Privacy Policy page (discloses GA4, Meta Pixel, Clarity)
- [x] 404 page
- [x] HTML sitemap page (sitemap.html) + XML sitemap (sitemap.xml, 151 URLs) + robots.txt
- [x] Real logo + favicon (cropped from the real file)
- [x] Real phone number, ACN, five-service lineup everywhere
- [x] Meta Pixel, Microsoft Clarity, and Google Analytics 4 installed sitewide, with explicit per-page title/path
- [x] JSON-LD: LocalBusiness/Electrician, Service (with per-town areaServed), BreadcrumbList, FAQPage schema (506 blocks, all validated)
- [x] Linked the "Where We Work" town pills on services.html to the 20 area hub pages (were previously plain, non-clickable text, and listed two towns — Wonthaggi, Warragul — with no page behind them)
- [x] Dedicated "Featured System" callout section for CBUS on the service-control-automation.html hub page (previously only a small buried text link) with its own heading, highlights and CTA button — reachable from the hub page, sitemap.html, sitemap.xml and llms.txt
- [x] Tried an animated circuit-diagram treatment for the service category tiles and a CBUS system-architecture diagram — reverted, didn't land well and broke on narrower viewports. Tiles and the CBUS page are back to plain static icons.
- [x] Dedicated residential CBUS page (service-control-automation-cbus-residential.html) and commercial CBUS page (service-control-automation-cbus-commercial.html), linked from a new "Residential or Commercial?" section on the main CBUS page
- [x] "Found CBUS in your home or business?" support page (cbus-existing-system.html) for people who've bought a property with an existing CBUS system — how to tell you have it, what to do next, common issues, contact CTA. Linked from the main CBUS page and both new residential/commercial pages
- [x] Canonical tags + Open Graph/Twitter card tags on every page
- [x] Zero broken internal links across all 152 pages (checked programmatically)
- [x] Real project photos received and put to use: Sale Greyhound Racing Club (action shot), The Vines on Avon (aerial), and Wonthaggi Workmen's Club (exterior) now show real photos on their project pages, the homepage "Selected Work" cards, projects.html, and service-audio-visual.html's project grid — replacing the abstract placeholder tile everywhere they appeared
- [x] New project page: Sporting Legends Sale — sportsbar fitout (project-sporting-legends-sportsbar.html), built from a real interior photo, added to projects.html and service-audio-visual.html
- [x] "Trusted By" client logo strip added to the homepage — 6 real client logos (Greyhound Racing Victoria/Sale, The Vines on Avon, Wonthaggi Workmen's Club, Sporting Legends, Star Hotel Sale, Maffra Community Sports Club) shown as light silhouettes that reveal full colour on hover
- [x] Replaced the empty gradient/grid placeholder tile with real project photos on all 5 services.html service teasers, each of the 5 service hub pages' hero tiles, both service-antennas.html tiles, and both service-control-automation-cbus.html tiles (14 tiles total) — reusing the 4 real venue photos received so far. Fixed a z-index bug found along the way where the tile-tag label was being covered by the new photo.
- [x] REC 33852 added sitewide — footer credit line on all 152 pages ("ACN 684 711 224 · REC 33852") and a dedicated "Registered Electrical Contractor — REC 33852" line on the About page's Credentials section
- [x] Contact form wired up for real: it now POSTs to `/api/enquiry` with client-side validation, a loading state, and success/error messaging (previously a no-op that just showed a "demo form" message). Built `server/` — a small Node/Express relay that forwards the enquiry into Fergus's `POST /enquiries` API using a Personal Access Token, kept strictly server-side (env var, never in the repo). Added `server/README.md` with full setup/systemd/nginx instructions, and `/api/` reverse-proxy blocks to both `deploy/nginx.conf.example` and `deploy/apache.htaccess.example`. Not live yet — needs the Ubuntu VM and the real Fergus PAT (see blocking list above).

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
- Clean URLs (no .html) — deploy/nginx.conf.example and deploy/apache.htaccess.example are ready for when the Ubuntu VM's server rewrite rules are actually in place; the site itself uses plain .html links for now since that migration caused a live 404 last time it was tried
