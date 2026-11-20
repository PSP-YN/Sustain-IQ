# SUSTAINIQ 2026 — Official Hackathon Website

Public event website for SUSTAINIQ 2026, a 24-hour national-level multidisciplinary sustainability hackathon organized by the **Innovators & Visionaries Club (IVC), VVCE**, in collaboration with **inunity**.

**Production:** https://sustain-iq-ivc.vercel.app/
**Repository:** https://github.com/PSP-YN/Sustain-IQ

## Official event facts

| Detail | Brochure information |
|---|---|
| Event | SUSTAINIQ 2026 — Build. Solve. Sustain. |
| Organizers | Innovators & Visionaries Club (IVC), VVCE, in collaboration with inunity |
| Dates | 3–4 December 2026 |
| Format | 24-hour, in-person, national-level multidisciplinary sustainability hackathon |
| Venue | Sports Complex, VVCE, Mysuru, Karnataka, India |
| Team size | 3–4 students; mixed-college teams permitted |
| Registration window | 16–23 November 2026 |
| Preliminary PPT deadline | 23 November 2026, 11:59:59 PM |
| PPT screening | 25/26 November 2026 — tentative |
| Finalists | 80 teams total; 20 per domain |
| Shortlisted-team confirmation | ₹999 per team, payable only after shortlisting |
| Official case studies | 1 December 2026; 10 per domain, 40 total |
| Problem allocation | First come, first served after an approximately five-hour review; maximum two teams per problem statement |
| Prize pool | ₹60,000 total; ₹15,000 per domain |
| Food | Lunch, snacks, dinner, midnight snacks and breakfast |
| Accommodation | Not provided |

## Challenge domains

1. **AI, Data Science & Digital Innovation** — AI/ML, climate and environmental data, digital civic services, sustainability dashboards and predictive insights.
2. **IoT, Embedded Systems & Smart Technologies** — sensor systems, smart agriculture, energy and water monitoring, connected devices and embedded control.
3. **Clean Energy & Sustainable Engineering** — renewable power, mechanical efficiency, low-carbon machines, thermal systems and resource recovery.
4. **Smart Infrastructure & Environmental Sustainability** — water conservation, resilient cities, sustainable materials, wastewater and infrastructure.

## Schedule

**Thursday, 3 December**
- 09:00 AM — On-site check-in and team verification
- 10:00 AM — Inauguration and official hackathon kickoff
- 01:00 PM — Mentoring Session 1 (mandatory)
- 05:00 PM — Judging Round 1 (mandatory)
- 09:00 PM — Mentoring Session 2 (mandatory)

**Friday, 4 December**
- 09:00 AM — Final Judging Round (mandatory)
- 10:00 AM — 24-hour build window concludes
- By 01:00 PM — Results, awards and closing (timing to be finalized)

## Judging rubric

| Criterion | Points |
|---|---:|
| Problem understanding & user relevance | 10 |
| Novelty & technical depth | 15 |
| Feasibility & completeness | 15 |
| Prototype / model quality | 20 |
| Validation & evidence | 15 |
| Sustainability impact & scalability | 15 |
| Usability & presentation | 10 |
| **Total** | **100** |

## Rules and submissions

- Teams have 3–4 students and register in one domain.
- Mixed-college teams are permitted.
- Develop the project during the event; do not pass off completed work as newly built.
- AI, APIs, libraries and pre-trained models are allowed; disclose their use in the PPT.
- Bring laptops, sensors and equipment. Extra electronics may be available at cost.
- Scheduled mentoring and judging checkpoints are mandatory.
- Final submission: PPT, repository, deployed link if applicable, and supporting Drive/docs.
- Avoid unsafe wiring, exposed batteries and hazardous materials. State simulation limits.

## Organizer contacts

- Moksh, Marketing Lead: +91 83103 53103
- Parinitha, Secretary: +91 63614 55193
- Email as printed in the brochure: ivcoffical@vvce.ac.in

The brochure does not name a registration platform or provide a registration URL. The website therefore does not link to an unconfirmed platform. The 25/26 November screening date is explicitly tentative, and the results/closing timing on 4 December is to be finalized.

## Experience and interaction

- A persistent, full-viewport recorded Minecraft gameplay video sits behind the page.
- Page scroll position scrubs the video timeline: scrolling down advances the footage and scrolling up reverses it.
- The supplied source video is optimized as public/minecraft/videos/world-journey.mp4.
- The processed MP4 is H.264, 1,920×1,080 at 24 fps, approximately 14.9 seconds (358 frames), about 25 MB, with audio removed and fast-start metadata. It is not native 4K. The Gemini sparkle is removed by localized LaMa inpainting; the original framing and all 358 frames are preserved.
- The visible Gemini sparkle watermark was removed from the bottom-right corner using localized LaMa inpainting on each frame. The video remains 1,920×1,080 at 24 fps with the original frame count and duration; no crop, resize, frame-rate change or audio track was introduced. Only the small masked watermark region was reconstructed. The original user-supplied source remains outside the repository for preservation.
- The video is muted and uses a static gameplay poster while it initializes.

## Stack

- Next.js App Router 16 + React 19 + TypeScript
- React Three Fiber 9 + Three.js 0.187
- Tailwind CSS 4 and custom responsive CSS
- Lucide icons

## Local development

Requirements: Node.js 20+ (22 LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

Check production routes after deployment:

```bash
curl -I https://sustain-iq-ivc.vercel.app/
curl -I https://sustain-iq-ivc.vercel.app/robots.txt
curl -I https://sustain-iq-ivc.vercel.app/sitemap.xml
```

## SEO, AEO and local discovery

- Canonical metadata, descriptive title/description, keywords, Open Graph and Twitter card metadata.
- Semantic page sections, one primary page H1, visible answer-first FAQs and synchronized FAQ JSON-LD.
- JSON-LD for WebSite, Event and FAQPage.
- Local discovery signals for Mysuru, Karnataka, India (en-IN, IN-KA).
- Event details are kept aligned with the event brochure; tentative and unspecified details are labeled accordingly.

Search rankings, rich-result eligibility and inclusion in AI answers are not guaranteed. Validate structured data with Schema.org Validator and Google Search Console after release.

Set NEXT_PUBLIC_SITE_URL to the canonical origin if deploying to a different domain. The default is the production URL above.

## Asset attribution and licensing

See docs/ASSETS.md for background-image source and license notes. Third-party assets retain their own terms and do not imply Minecraft/Mojang/Microsoft endorsement.

## Deployment

The repository is connected to Vercel. Push to main to trigger a production deployment. Confirm the deployment is READY, then verify the canonical URL and static assets return HTTP 200.

## Project docs

- docs/ASSETS.md — asset credits and image rights
- docs/SEO.md — SEO / AEO / GEO operations
- CONTRIBUTING.md
- SECURITY.md

## License

Website source code is licensed under the MIT License. Third-party assets retain their own licenses.
