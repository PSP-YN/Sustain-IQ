# SUSTAINIQ 2026 — Hackathon Website

Responsive, frontend-only event website for SUSTAINIQ 2026, hosted by the Civil Department Association at Vidyavardhaka College of Engineering (VVCE), Mysuru.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS 4 + custom responsive design system
- React Three Fiber + Three.js + Drei for the 3D hero world
- Lucide icons

## Run locally
\`\`\`bash
npm install
npm run dev
\`\`\`
Open http://localhost:3000.

## Production checks
\`\`\`bash
npm run lint
npm run build
npm start
\`\`\`

## Event facts published
- Dates: 3–4 December 2026
- Venue: Sports Complex, VVCE, Mysuru, Karnataka
- Format: 24-hour onsite hackathon
- Team size: 3–4 students
- Participation: students across all departments
- Capacity: 80 teams (40 Karnataka, 40 outside Karnataka)
- Team registration fee: ₹999 (per event brochure)
- Prize pool: ₹75,000+, subject to sponsorship updates
- Food: provided during the event
- Accommodation: not provided

## Organiser-confirmation items
Four domain names, registration platform (Unstop or HackBriven), registration URL, PPT submission deadline, final schedule and official problem-statement release date are intentionally not fabricated. Update these in \`src/app/page.tsx\` after confirmation.

The source information conflicts on official problem statement release date: WhatsApp details mention 1 December; brochure indicates 3 December. The site avoids publishing an unconfirmed date.

## SEO / AEO / GEO
Metadata, Open Graph, robots.txt, sitemap.xml, semantic headings, answer-oriented FAQs and Event JSON-LD are included. Set \`NEXT_PUBLIC_SITE_URL\` to the final canonical domain before deployment. AI-answer and generative-search visibility cannot be guaranteed; keep event details accurate and consistent across official channels.

## Deploy
Import this repository into Vercel. Framework: Next.js. Build command: \`npm run build\`. No environment variables or backend services are required (set \`NEXT_PUBLIC_SITE_URL\` for the final domain).
