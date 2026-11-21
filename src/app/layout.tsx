import type { Metadata } from "next";
import "./globals.css";
import "./brand-layout.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sustain-iq-ivc.vercel.app";
const title = "SUSTAINIQ 2026 | Sustainability Hackathon at VVCE, Mysuru";
const description = "Join SUSTAINIQ 2026, a 24-hour student sustainability hackathon at Vidyavardhaka College of Engineering (VVCE), Mysuru, Karnataka, on 3–4 December 2026. Explore four domains, 40 case studies and a ₹60,000 prize pool.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | SUSTAINIQ 2026" },
  description,
  applicationName: "SUSTAINIQ 2026",
  category: "education",
  keywords: [
    "SUSTAINIQ 2026", "Sustain IQ hackathon", "Mysuru hackathon 2026",
    "VVCE hackathon", "Vidyavardhaka College of Engineering",
    "Karnataka student hackathon", "sustainability hackathon India",
    "24 hour hackathon", "student innovation challenge",
    "Innovators and Visionaries Club", "IVC VVCE"
  ],
  authors: [{ name: "Innovators & Visionaries Club, VVCE" }],
  creator: "Innovators & Visionaries Club, VVCE",
  publisher: "Vidyavardhaka College of Engineering",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_IN",
    siteName: "SUSTAINIQ 2026",
    title: "SUSTAINIQ 2026 — Build. Solve. Sustain.",
    description,
    images: [{ url: "/og-sustainiq.png", width: 1200, height: 630, alt: "SUSTAINIQ 2026 sustainability hackathon at VVCE in Mysuru, Karnataka" }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-sustainiq.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Mysuru, Karnataka, India",
    "content-language": "en-IN"
  }
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": siteUrl + "/#event",
  name: "SUSTAINIQ 2026",
  alternateName: "SUSTAINIQ — Build. Solve. Sustain.",
  description: "A 24-hour national-level multidisciplinary student sustainability hackathon organized by the Innovators & Visionaries Club (IVC) at Vidyavardhaka College of Engineering (VVCE), Mysuru, in collaboration with inunity. The event brings students together to build practical solutions for real-world sustainability challenges.",
  startDate: "2026-12-03T10:00:00+05:30",
  endDate: "2026-12-04T10:00:00+05:30",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  inLanguage: "en-IN",
  location: {
    "@type": "Place",
    name: "Sports Complex, Vidyavardhaka College of Engineering",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vidyavardhaka College of Engineering",
      addressLocality: "Mysuru",
      addressRegion: "Karnataka",
      addressCountry: "IN"
    }
  },
  organizer: {
    "@type": "Organization",
    name: "Innovators & Visionaries Club (IVC), VVCE",
    url: siteUrl,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Vidyavardhaka College of Engineering",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mysuru",
        addressRegion: "Karnataka",
        addressCountry: "IN"
      }
    }
  },
  audience: {
    "@type": "Audience",
    audienceType: "Students from all branches and institutions; teams of 3–4 students"
  },
  keywords: "student hackathon, sustainability, multidisciplinary innovation, Mysuru, Karnataka, India",
  url: siteUrl
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteUrl + "/#website",
  url: siteUrl,
  name: "SUSTAINIQ 2026",
  description,
  inLanguage: "en-IN",
  publisher: { "@type": "Organization", name: "Innovators & Visionaries Club (IVC), VVCE" }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is SUSTAINIQ 2026?", acceptedAnswer: { "@type": "Answer", text: "A 24-hour national-level multidisciplinary sustainability hackathon organized by the Innovators & Visionaries Club (IVC) at VVCE, Mysuru, in collaboration with inunity." } },
    { "@type": "Question", name: "When and where is SUSTAINIQ 2026?", acceptedAnswer: { "@type": "Answer", text: "The on-site hackathon takes place on 3–4 December 2026 at the Sports Complex, Vidyavardhaka College of Engineering, Mysuru, Karnataka, India." } },
    { "@type": "Question", name: "Who can participate and what is the team size?", acceptedAnswer: { "@type": "Answer", text: "Students from all branches and institutions can participate. Each team must have 3–4 students. Mixed-college teams are permitted." } },
    { "@type": "Question", name: "What is the registration and selection process?", acceptedAnswer: { "@type": "Answer", text: "Registration and domain selection are scheduled for 16–23 November 2026. Teams submit a preliminary PPT by 23 November at 11:59:59 PM. PPT screening is tentative for 25/26 November. Organizers plan to shortlist 20 teams per domain, 80 teams total." } },
    { "@type": "Question", name: "When is the ₹999 team payment due?", acceptedAnswer: { "@type": "Answer", text: "Only shortlisted teams pay ₹999 per team after shortlisting to confirm their final-round place." } },
    { "@type": "Question", name: "When are the official problem statements released?", acceptedAnswer: { "@type": "Answer", text: "The 40 official case studies, 10 in each domain, are scheduled for release on 1 December 2026. Each problem statement has a maximum of two team slots." } },
    { "@type": "Question", name: "What is the prize pool?", acceptedAnswer: { "@type": "Answer", text: "The total prize pool is ₹60,000. Each of the four domains has ₹7,000 for first place, ₹5,000 for second place and ₹3,000 for third place." } },
    { "@type": "Question", name: "Are food and accommodation provided?", acceptedAnswer: { "@type": "Answer", text: "Lunch, snacks, dinner, midnight snacks and breakfast are listed as provided. Accommodation and hostel facilities are not provided; participants must arrange their own stay and travel." } }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        {children}
        {[websiteJsonLd, eventJsonLd, faqJsonLd].map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      </body>
    </html>
  );
}
