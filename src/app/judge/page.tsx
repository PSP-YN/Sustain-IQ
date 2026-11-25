"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Box,
  CalendarDays,
  CheckCircle2,
  Clock,
  Cpu,
  FileText,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import WorldScene from "@/components/WorldScene";

const rubric = [
  {
    label: "Problem Understanding & User Relevance",
    points: 10,
    desc: "Clarity of the specific sustainability challenge, empathy with real-world users, and context within the chosen domain.",
  },
  {
    label: "Novelty & Technical Depth",
    points: 15,
    desc: "Originality of the engineering approach, technical ambition, and appropriate application of modern tech stack / AI / embedded tools.",
  },
  {
    label: "Feasibility & Completeness",
    points: 15,
    desc: "Viability of implementation in realistic operational conditions, resource efficiency, and workflow completeness.",
  },
  {
    label: "Prototype / Working Model Quality",
    points: 20,
    desc: "Working demo fidelity, sensor/code execution, hardware robustness, and tangible progress achieved during the 24-hour build window.",
  },
  {
    label: "Validation & Evidence",
    points: 15,
    desc: "Rigorous testing methodologies, verified measurements, benchmark data, and evidence supporting sustainability claims.",
  },
  {
    label: "Sustainability Impact & Scalability",
    points: 15,
    desc: "Measurable ecological and social benefit, scalability to broader communities or industries, and alignment with UN SDGs.",
  },
  {
    label: "Usability & Presentation",
    points: 10,
    desc: "Clarity of presentation, intuitive user experience / dashboard design, and confident handling of judges' technical Q&A.",
  },
];

const rounds = [
  {
    time: "Day 1 · 05:00 PM",
    title: "Judging Round 1 (Checkpoint)",
    status: "Mandatory",
    desc: "Midway checkpoint: review project architecture, planned deliverables, initial code/hardware setup, and approach feasibility.",
  },
  {
    time: "Day 1 · 09:00 PM",
    title: "Mentoring Session 2",
    status: "Mandatory",
    desc: "Domain experts consult with teams to troubleshoot blockers, refine data models, and guide final sprint execution.",
  },
  {
    time: "Day 2 · 09:00 AM",
    title: "Final Judging Round",
    status: "Mandatory",
    desc: "Comprehensive evaluation: live working demonstration, code inspection, slide deck presentation, and final scoring.",
  },
  {
    time: "Day 2 · 10:00 AM",
    title: "Build Concludes",
    status: "Deadline",
    desc: "Official close of the 24-hour continuous build window. All code and submissions frozen.",
  },
];

const domains = [
  {
    title: "AI, Data Science & Digital Innovation",
    icon: <Lightbulb size={20} />,
    criteria: "Focus on dataset provenance, ML pipeline validity, inference efficiency, and civic/sustainability utility.",
  },
  {
    title: "IoT, Embedded Systems & Smart Technologies",
    icon: <Cpu size={20} />,
    criteria: "Focus on circuit stability, sensor telemetry accuracy, power optimization, and edge control responsiveness.",
  },
  {
    title: "Clean Energy & Sustainable Engineering",
    icon: <Zap size={20} />,
    criteria: "Focus on thermodynamic/electrical efficiency, low-carbon mechanisms, durability, and resource circularity.",
  },
  {
    title: "Smart Infrastructure & Environmental Sustainability",
    icon: <MapPin size={20} />,
    criteria: "Focus on water/waste lifecycle impact, urban resilience, structural feasibility, and material sustainability.",
  },
];

export default function JudgePage() {
  return (
    <main className="judge-page">
      <div className="world-backdrop" aria-hidden="true">
        <WorldScene />
      </div>
      <div className="crt-overlay" aria-hidden="true" />

      {/* Navigation */}
      <nav className="nav">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Box size={19} />
          </span>
          <span>
            SUSTAIN<span className="brand-accent">IQ</span>
            <small>2026 · VVCE</small>
          </span>
        </Link>
        <div className="nav-links">
          <Link href="/#experience">About</Link>
          <Link href="/#domains">Domains</Link>
          <Link href="/#schedule">Schedule</Link>
          <a href="#rubric">Rubric</a>
          <a href="#rounds">Rounds</a>
        </div>
        <Link className="nav-cta" href="/">
          <ArrowLeft size={15} /> Main Website
        </Link>
      </nav>

      {/* Hero Header */}
      <section className="judge-hero section-pad">
        <div className="judge-hero-box">
          <div className="hero-kicker">
            <span className="pulse-dot" /> OFFICIAL EVALUATION PORTAL · SUSTAINIQ 2026
          </div>
          <h1>
            Judging Rubric<br />
            & <em>Guidelines</em><span className="period">.</span>
          </h1>
          <p className="hero-lede">
            Official evaluation criteria, scoring weights, and mandatory review checkpoints
            for judges, mentors, and the 80 finalist teams competing at VVCE Mysuru.
          </p>

          <div className="judge-stats">
            <div className="judge-stat">
              <strong>100</strong>
              <small>TOTAL POINTS</small>
            </div>
            <div className="judge-stat">
              <strong>2</strong>
              <small>EVALUATION ROUNDS</small>
            </div>
            <div className="judge-stat">
              <strong>4</strong>
              <small>CHALLENGE DOMAINS</small>
            </div>
            <div className="judge-stat">
              <strong>80</strong>
              <small>FINALIST TEAMS</small>
            </div>
          </div>
        </div>
      </section>

      {/* 100-Point Rubric Section */}
      <section className="rubric section-pad" id="rubric">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span />
              EVALUATION CRITERIA
            </div>
            <h2>
              The 100-Point<br />
              Rubric<span className="period">.</span>
            </h2>
          </div>
          <p>
            Each team is scored across seven key dimensions. Prototypes, validation, and real sustainability impact carry the highest weight.
          </p>
        </div>

        <div className="rubric-list">
          {rubric.map((item, index) => (
            <div className="rubric-item" key={item.label}>
              <div className="rubric-header">
                <span className="rubric-num">0{index + 1}</span>
                <div className="rubric-meta">
                  <h3>{item.label}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="rubric-score">
                  <strong>{item.points}</strong>
                  <span>POINTS</span>
                </div>
              </div>
              <div className="rubric-track">
                <i style={{ width: `${(item.points / 20) * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="rubric-total">
            <span>TOTAL SCORE PER TEAM</span>
            <strong>100 POINTS</strong>
          </div>
        </div>
      </section>

      {/* Review Rounds & Timeline */}
      <section className="judge-rounds section-pad" id="rounds">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span />
              MANDATORY CHECKPOINTS
            </div>
            <h2>
              Evaluation<br />
              Timeline<span className="period">.</span>
            </h2>
          </div>
          <p>
            All finalist teams must present their progress in both evaluation rounds at their assigned work stations in the Sports Complex.
          </p>
        </div>

        <div className="rounds-grid">
          {rounds.map((r) => (
            <article className="round-card" key={r.time + r.title}>
              <div className="round-top">
                <span className="round-time">
                  <Clock size={14} /> {r.time}
                </span>
                <span className={`round-pill ${r.status.toLowerCase()}`}>
                  {r.status}
                </span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Domain Evaluation Expectations */}
      <section className="judge-domains section-pad">
        <div className="section-head">
          <div>
            <div className="eyebrow">
              <span />
              DOMAIN CRITERIA
            </div>
            <h2>
              What Judges<br />
              Look For<span className="period">.</span>
            </h2>
          </div>
          <p>
            Specific technical and domain considerations applicable to each of the four sustainability tracks.
          </p>
        </div>

        <div className="judge-domains-grid">
          {domains.map((d) => (
            <article className="judge-domain-card" key={d.title}>
              <div className="judge-domain-icon">{d.icon}</div>
              <h3>{d.title}</h3>
              <p>{d.criteria}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Submission Checklist */}
      <section className="judge-checklist section-pad">
        <div className="checklist-box">
          <div className="checklist-copy">
            <div className="eyebrow">
              <span />
              DELIVERABLES VERIFICATION
            </div>
            <h2>Final Submission Checklist</h2>
            <p>
              Before final grading, judges confirm that teams have submitted all official artifacts:
            </p>
            <ul className="checklist-items">
              <li>
                <CheckCircle2 size={18} />
                <span>Presentation deck following official IVC organizer template</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Working code repository or schematics with transparent commit log</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Live working prototype, interactive deployed link, or hardware rig</span>
              </li>
              <li>
                <CheckCircle2 size={18} />
                <span>Full disclosure of any third-party APIs, libraries, or AI models used</span>
              </li>
            </ul>
          </div>

          <div className="checklist-contacts">
            <h3>Judge & Coordinator Support</h3>
            <p>For score sheet clarifications, rubric questions, or station assistance:</p>
            <div className="contact-links">
              <a href="tel:+918310353103">
                <Phone size={15} />
                <span>Moksh · Marketing Lead (+91 83103 53103)</span>
              </a>
              <a href="tel:+916361455193">
                <Phone size={15} />
                <span>Parinitha · Secretary (+91 63614 55193)</span>
              </a>
              <a href="mailto:ivcoffical@vvce.ac.in">
                <Mail size={15} />
                <span>ivcoffical@vvce.ac.in</span>
              </a>
            </div>
            <Link className="btn-primary" href="/">
              Return to Hackathon Home <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <Box size={18} />
          </span>
          <span>
            SUSTAIN<span className="brand-accent">IQ</span>
            <small>2026 · VVCE</small>
          </span>
        </Link>
        <div className="footer-center">
          BUILD. SOLVE. SUSTAIN.
          <small className="asset-credit">
            Official Evaluation Portal · Innovators & Visionaries Club (IVC), VVCE
          </small>
        </div>
        <div className="footer-right">
          <span>© 2026 SUSTAINIQ</span>
          <Link href="/">HOME ↑</Link>
        </div>
      </footer>
    </main>
  );
}
