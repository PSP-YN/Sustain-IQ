import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sustain-iq-ivc.vercel.app";
const title = "SUSTAINIQ 2026 | 24-Hour Student Hackathon in Mysuru";
const description = "SUSTAINIQ 2026 is a 24-hour, in-person student hackathon at VVCE, Mysuru on 3–4 December 2026. Teams of 3–4, 80 planned team spots and a ₹75,000+ prize pool.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | SUSTAINIQ 2026" },
  description,
  applicationName: "SUSTAINIQ 2026",
  category: "education",
  keywords: ["SUSTAINIQ 2026", "Mysuru hackathon", "VVCE hackathon", "Karnataka student hackathon", "24 hour hackathon India", "sustainability hackathon", "college hackathon December 2026", "Civil Department Association VVCE"],
  authors: [{ name: "Civil Department Association, VVCE" }],
  creator: "Civil Department Association, VVCE",
  publisher: "Vidyavardhaka College of Engineering",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: siteUrl, locale: "en_IN", siteName: "SUSTAINIQ 2026",
    title: "SUSTAINIQ 2026 — Build. Solve. Sustain.", description,
    images: [{ url: "/og-sustainiq.png", width: 1200, height: 630, alt: "SUSTAINIQ 2026 student hackathon at VVCE, Mysuru" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-sustainiq.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { "geo.region": "IN-KA", "geo.placename": "Mysuru, Karnataka, India", "content-language": "en-IN" },
};

const eventJsonLd = {
  "@context": "https://schema.org", "@type": "Event", "@id": `${siteUrl}/#event`,
  name: "SUSTAINIQ 2026", alternateName: "SUSTAINIQ — Build. Solve. Sustain.",
  description: "A 24-hour in-person student hackathon hosted by the Civil Department Association at VVCE, Mysuru. Teams identify a problem, then build a solution to an organiser-released challenge during the onsite event.",
  startDate: "2026-12-03", endDate: "2026-12-04", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled", inLanguage: "en-IN", isAccessibleForFree: false,
  location: { "@type": "Place", name: "Sports Complex, Vidyavardhaka College of Engineering", address: { "@type": "PostalAddress", streetAddress: "Vidyavardhaka College of Engineering", addressLocality: "Mysuru", addressRegion: "Karnataka", addressCountry: "IN" } },
  organizer: { "@type": "Organization", name: "Civil Department Association, VVCE", url: siteUrl },
  audience: { "@type": "Audience", audienceType: "Students from all departments and institutions" },
  offers: { "@type": "Offer", price: "999", priceCurrency: "INR", availability: "https://schema.org/LimitedAvailability", url: siteUrl, description: "Team registration fee listed in the event brochure; check the official registration announcement for payment instructions." },
  maximumAttendeeCapacity: 320,
  keywords: "student hackathon, sustainability, software development, Mysuru, Karnataka, India",
  url: siteUrl,
};

const websiteJsonLd = {
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl,
  name: "SUSTAINIQ 2026", description, inLanguage: "en-IN",
  publisher: { "@type": "Organization", name: "Civil Department Association, VVCE" },
};

const faqJsonLd = {
  "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "What is SUSTAINIQ 2026?", acceptedAnswer: { "@type": "Answer", text: "SUSTAINIQ 2026 is a 24-hour, in-person student hackathon hosted by the Civil Department Association at Vidyavardhaka College of Engineering in Mysuru, Karnataka." } },
    { "@type": "Question", name: "When and where is SUSTAINIQ 2026?", acceptedAnswer: { "@type": "Answer", text: "The event is scheduled for 3–4 December 2026 at the Sports Complex, Vidyavardhaka College of Engineering, Mysuru, Karnataka, India." } },
    { "@type": "Question", name: "Who can participate and what is the team size?", acceptedAnswer: { "@type": "Answer", text: "Students from all departments and institutions can participate. Each team must have 3–4 members." } },
    { "@type": "Question", name: "What is the registration fee for SUSTAINIQ 2026?", acceptedAnswer: { "@type": "Answer", text: "The event brochure lists a registration fee of ₹999 per team. Confirm final payment instructions on the official registration platform when it is announced." } },
    { "@type": "Question", name: "What is the prize pool?", acceptedAnswer: { "@type": "Answer", text: "The currently published prize pool is ₹75,000 or more, subject to sponsorship updates." } },
    { "@type": "Question", name: "Is accommodation provided?", acceptedAnswer: { "@type": "Answer", text: "No. Accommodation or hostel facilities are not provided. Participants must arrange their own stay and travel." } },
    { "@type": "Question", name: "Are meals provided?", acceptedAnswer: { "@type": "Answer", text: "Food will be provided during the event." } },
    { "@type": "Question", name: "How does the SUSTAINIQ hackathon work?", acceptedAnswer: { "@type": "Answer", text: "Before the event, teams select a topic or problem and submit a preliminary presentation using the organiser template. At the venue, teams select an official problem statement and build their solution during the 24-hour onsite hackathon." } },
    { "@type": "Question", name: "Where can I register for SUSTAINIQ 2026?", acceptedAnswer: { "@type": "Answer", text: "The organisers are confirming whether registration will be hosted on Unstop or HackBriven. The official registration link will be published on this website when confirmed." } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-IN"><body>{children}
    {[websiteJsonLd, eventJsonLd, faqJsonLd].map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
  </body></html>;
}
