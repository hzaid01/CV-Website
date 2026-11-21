import { useState, type ReactNode } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Token } from "@astryxdesign/core/Token";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core/SegmentedControl";
import {
  FaBroom,
  FaChartLine,
  FaMagnifyingGlassLocation,
  FaRobot,
  FaVideo,
} from "react-icons/fa6";
import {
  SiDocker,
  SiElectron,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGooglecloud,
  SiJavascript,
  SiOllama,
  SiPython,
  SiPytorch,
  SiReact,
  SiTypescript,
  SiWebrtc,
} from "react-icons/si";
import BuildSection from "./BuildSection";
import "./styles/Sections.css";

const EMAIL = "zaidsohail555@gmail.com";

/* ---------------- 1. Work that speaks ---------------- */

type Filter = "all" | "ai" | "full" | "desktop" | "oss";

type Project = {
  title: string;
  kind: string;
  year: string;
  tags: Filter[];
  stack: string[];
  icon: ReactNode;
  link?: string;
  linkLabel?: string;
  code?: string;
};

const PROJECTS: Project[] = [
  {
    title: "ValoraTrade",
    kind: "Crypto signals: XGBoost on 37 causal features, live on Cloud Run",
    year: "2025",
    tags: ["ai", "full"],
    stack: ["FastAPI", "XGBoost", "PyTorch", "React", "Firebase", "Cloud Run"],
    icon: <FaChartLine />,
    link: "https://valoratrade.web.app",
    linkLabel: "Live site",
    code: "https://github.com/hzaid01/Valoratrade.com",
  },
  {
    title: "BuildMeLeads",
    kind: "Open-source lead engine: Maps scraping → profile gaps → AI outreach",
    year: "2026",
    tags: ["ai", "full", "oss"],
    stack: ["Python", "FastAPI", "Groq LLMs", "Docker", "SQLite", "Gmail OAuth"],
    icon: <FaMagnifyingGlassLocation />,
    code: "https://github.com/hzaid01/buildmeleads",
  },
  {
    title: "JARVIS",
    kind: "Cross-platform AI assistant on a local LLM with voice",
    year: "2026",
    tags: ["ai", "desktop", "oss"],
    stack: ["Electron", "React", "Ollama", "Voice I/O"],
    icon: <FaRobot />,
    code: "https://github.com/hzaid01/Jarvis",
  },
  {
    title: "Document Cleaner",
    kind: "Desktop app that strips hidden metadata and watermark artifacts",
    year: "2026",
    tags: ["ai", "desktop", "oss"],
    stack: ["Electron", "React", "TypeScript", "Python", "Ollama"],
    icon: <FaBroom />,
    link: "https://github.com/hzaid01/AI-watermark-remover/releases/latest",
    linkLabel: "Download",
    code: "https://github.com/hzaid01/AI-watermark-remover",
  },
  {
    title: "UniConnect",
    kind: "B2B LMS with live video, built in about 15 days",
    year: "2026",
    tags: ["full"],
    stack: ["React", "Firebase", "WebRTC"],
    icon: <FaVideo />,
  },
];

export const Works = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = PROJECTS.filter((p) => filter === "all" || p.tags.includes(filter));

  return (
    <BuildSection id="work" className="sx sx-works" cursors={5}>
      <p className="sx-eyebrow" data-build="Eyebrow">
        Selected work · from github.com/hzaid01
      </p>
      <h2 className="sx-title" data-build="Heading">
        WORK THAT <em>SPEAKS.</em>
      </h2>
      <div className="sx-filter" data-build="Filter">
        <SegmentedControl
          label="Filter projects"
          value={filter}
          onChange={(v) => setFilter(v as Filter)}
          size="sm"
        >
          <SegmentedControlItem value="all" label="All" />
          <SegmentedControlItem value="ai" label="AI & ML" />
          <SegmentedControlItem value="full" label="Full Stack" />
          <SegmentedControlItem value="desktop" label="Desktop" />
          <SegmentedControlItem value="oss" label="Open Source" />
        </SegmentedControl>
      </div>
      <div className="sx-cards">
        {shown.map((p) => (
          <article className="sx-card" key={p.title} data-build={p.title}>
            <div className="sx-card-visual">
              <span className="sx-card-icon">{p.icon}</span>
              <span className="sx-card-watermark">{p.title}</span>
              <span className="sx-card-year">{p.year}</span>
            </div>
            <div className="sx-card-body">
              <h3>{p.title}</h3>
              <p>{p.kind}</p>
              <div className="sx-card-stack">
                {p.stack.map((s) => (
                  <Token key={s} label={s} size="sm" />
                ))}
              </div>
              <div className="sx-card-actions">
                {p.link && (
                  <Button
                    label={p.linkLabel ?? "Open"}
                    variant="primary"
                    size="sm"
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                )}
                {p.code && (
                  <Button
                    label="Source"
                    variant="secondary"
                    size="sm"
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                )}
                {!p.link && !p.code && (
                  <span className="sx-muted">Private build · demo on request</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </BuildSection>
  );
};

/* ---------------- 2. Stack strip ---------------- */

const STACK = [
  { name: "Python", icon: <SiPython /> },
  { name: "FastAPI", icon: <SiFastapi /> },
  { name: "React", icon: <SiReact /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Electron", icon: <SiElectron /> },
  { name: "Ollama", icon: <SiOllama /> },
  { name: "Google Cloud", icon: <SiGooglecloud /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "WebRTC", icon: <SiWebrtc /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "PyTorch", icon: <SiPytorch /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "Git", icon: <SiGit /> },
];

export const StackStrip = () => (
  <BuildSection className="sx sx-stack" cursors={4}>
    <p className="sx-eyebrow" data-build="Label">
      Built with
    </p>
    <ul className="sx-stack-row">
      {STACK.map((s) => (
        <li key={s.name} data-build={s.name}>
          {s.icon}
          <span>{s.name}</span>
        </li>
      ))}
    </ul>
  </BuildSection>
);

/* ---------------- 3. The work. The results. ---------------- */

const MILESTONES = [
  { year: "2025", what: "ValoraTrade live on Google Cloud Run", detail: "XGBoost · 37 causal features · BTC, ETH, SOL champions" },
  { year: "2025", what: "Found and fixed model overfitting", detail: "Uptrend-biased BTC data → retrained on engineered features" },
  { year: "2026", what: "BuildMeLeads released open source (MIT)", detail: "Self-hostable alternative to paid lead-gen SaaS" },
  { year: "2026", what: "Document Cleaner shipped installers", detail: "Windows x64 installer · Linux .deb" },
  { year: "2026", what: "JARVIS released open source", detail: "Local LLM via Ollama · wake word · voice I/O" },
];

export const Results = () => (
  <BuildSection className="sx sx-results" cursors={4}>
    <div className="sx-results-left">
      <h2 className="sx-title" data-build="Heading">
        THE WORK.
        <br />
        <em>THE RESULTS.</em>
      </h2>
      <div className="sx-bignum" data-build="Counter">
        <span>5</span>
        <p>
          products built
          <br />
          end to end
        </p>
      </div>
    </div>
    <ol className="sx-milestones">
      {MILESTONES.map((m) => (
        <li key={m.what} data-build="Milestone">
          <span className="sx-ms-year">{m.year}</span>
          <span className="sx-ms-what">{m.what}</span>
          <span className="sx-ms-detail">{m.detail}</span>
        </li>
      ))}
    </ol>
  </BuildSection>
);

/* ---------------- 4. From data. To deploy. ---------------- */

export const Story = () => (
  <BuildSection className="sx sx-story" cursors={4}>
    <div className="sx-story-copy">
      <h2 className="sx-title" data-build="Heading">
        FROM DATA.
        <br />
        <em>TO DEPLOY.</em>
      </h2>
      <p data-build="Story">
        ValoraTrade started as a model and ended as a live product. When its
        signals failed in downtrends, I traced it to training data biased toward
        BTC's uptrend, dropped the weak time-series head and rebuilt on 37 causal
        features, triple-barrier labels and a champion/challenger pipeline that
        only promotes models that beat every baseline.
      </p>
      <span data-build="CTA">
        <Button
          label="Open ValoraTrade"
          variant="primary"
          href="https://valoratrade.web.app"
          target="_blank"
          rel="noopener noreferrer"
        />
      </span>
    </div>
    <figure className="sx-terminal" data-build="Pipeline" aria-label="ValoraTrade pipeline">
      <div className="sx-term-bar">
        <i />
        <i />
        <i />
        <span>valoratrade / pipeline</span>
      </div>
      <pre>
        <code>
          <b>$</b> stream binance --ws aggTrades,klines{"\n"}
          <b>$</b> features build --causal --n 37{"\n"}
          <b>$</b> label triple-barrier --h 4,8,12,24{"\n"}
          <b>$</b> train xgboost --walk-forward 5{"\n"}
          <s>  ✗ time-series head dropped (overfit)</s>{"\n"}
          <b>$</b> promote --champion-challenger{"\n"}
          <b>$</b> deploy gcloud run{"\n"}
          <u>  ✓ live → BTCUSDT · ETHUSDT · SOLUSDT</u>
        </code>
      </pre>
    </figure>
  </BuildSection>
);

/* ---------------- 5. Not just code ---------------- */

const SKILLS = [
  { group: "Backend & ML", items: ["Python", "FastAPI", "XGBoost", "PyTorch", "Groq / Ollama", "GCP"] },
  { group: "Frontend & Desktop", items: ["React", "TypeScript", "Electron", "WebRTC", "Firebase"] },
  { group: "Tooling", items: ["Docker", "Git / GitHub", "Linux", "Pine Script"] },
];

export const Craft = () => (
  <BuildSection id="about" className="sx sx-craft" cursors={5}>
    <p className="sx-eyebrow" data-build="Eyebrow">
      About me
    </p>
    <h2 className="sx-title" data-build="Heading">
      NOT JUST CODE.
      <br />
      <em>HOW IT SHIPS.</em>
    </h2>
    <div className="sx-craft-grid">
      <p className="sx-craft-about" data-build="About">
        CS student who builds full products instead of just coursework. Shipped
        a live crypto trading platform deployed on GCP, and a desktop AI
        assistant running a local LLM with real-time voice.
      </p>
      <div className="sx-skills" data-build="Skills">
        {SKILLS.map((g) => (
          <div key={g.group} className="sx-skill-group">
            <h4>{g.group}</h4>
            <div>
              {g.items.map((s) => (
                <Token key={s} label={s} size="sm" color="blue" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <blockquote className="sx-quote" data-build="Quote">
        <p>
          “Backend is where I'm strongest — but I build the whole stack when the
          project needs it.”
        </p>
        <cite>— Zaid</cite>
      </blockquote>
    </div>
  </BuildSection>
);

/* ---------------- 6. Always building ---------------- */

const JOURNEY = [
  { when: "2026", role: "Creator", what: "BuildMeLeads", note: "Open-source lead engine: Google Maps scraping, profile-gap detection, Groq-written outreach with send safeguards." },
  { when: "2026", role: "Creator", what: "Document Cleaner", note: "Electron + Python desktop app with Windows and Linux installers." },
  { when: "Feb 2026 — Now", role: "Founder & Developer", what: "JARVIS", note: "Open-source AI assistant: local LLM, wake word, live system monitoring." },
  { when: "May — Jun 2026", role: "Developer", what: "UniConnect", note: "B2B LMS for Pakistani universities with live video, built in ~15 days." },
  { when: "Jan — Nov 2025", role: "Founder & Developer", what: "ValoraTrade", note: "Crypto signal platform on Google Cloud Run with risk controls and a kill switch." },
  { when: "Expected 2028", role: "BS Computer Science", what: "UMT, Lahore", note: "Studying computer science while shipping real products." },
];

export const Journey = () => (
  <BuildSection className="sx sx-journey" cursors={4}>
    <div className="sx-journey-head">
      <p className="sx-eyebrow" data-build="Eyebrow">
        Journey
      </p>
      <h2 className="sx-title" data-build="Heading">
        ALWAYS BUILDING.
      </h2>
    </div>
    <ol className="sx-timeline">
      {JOURNEY.map((j) => (
        <li key={j.what} data-build={j.what}>
          <span className="sx-tl-when">{j.when}</span>
          <div>
            <h4>
              {j.what} <small>{j.role}</small>
            </h4>
            <p>{j.note}</p>
          </div>
        </li>
      ))}
    </ol>
    <p className="sx-journey-tag" data-build="Tagline">
      SMALL WINS.
      <br />
      <em>REAL LEARNING.</em>
    </p>
  </BuildSection>
);

/* ---------------- 7. Let's work together ---------------- */

export const Together = () => (
  <BuildSection id="contact" className="sx sx-together" cursors={6}>
    <div className="sx-together-copy">
      <h2 className="sx-title sx-title-xl" data-build="Heading">
        LET'S WORK
        <br />
        TOGETHER.
      </h2>
      <p data-build="Intro">
        Open to internships, freelance builds and backend / ML roles. Tell me
        what you are building.
      </p>
      <ul className="sx-contact-list" data-build="Links">
        <li>
          <span>Email</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </li>
        <li>
          <span>GitHub</span>
          <a href="https://github.com/hzaid01" target="_blank" rel="noopener noreferrer">
            github.com/hzaid01
          </a>
        </li>
        <li>
          <span>LinkedIn</span>
          <a href="https://www.linkedin.com/in/h-zaid01/" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/h-zaid01
          </a>
        </li>
      </ul>
    </div>
    <div className="sx-cta-card" data-build="CTA Card">
      <p className="sx-cta-title">
        MAKE IT
        <br />
        <em>SHIP.</em>
      </p>
      <Button label="Start a conversation" variant="primary" size="lg" href={`mailto:${EMAIL}`} />
    </div>
    <footer className="sx-footer">© 2026 Zaid Sohail · Lahore</footer>
  </BuildSection>
);
