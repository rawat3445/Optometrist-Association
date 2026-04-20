"use client";

import { useState } from "react";

const today = "Thursday, April 16, 2026";
const edition = "Vol. XVIII, No. 4";

const articles = [
  {
    id: 1,
    col: "Clinical Research",
    headline:
      "Myopia Progression Control: Five-Year Study Yields Surprising Results Across Pediatric Cohort",
    deck: "Orthokeratology found superior to atropine therapy in patients under 10; results invert for adolescents over 13, raising questions about age-stratified protocols.",
    body: "A landmark longitudinal study spanning 1,200 pediatric patients across six tertiary care centres has delivered findings that are expected to reshape myopia management guidelines for the coming decade. The study, conducted under the auspices of the All India Optometry Research Consortium, tracked subjects from ages 6 through 18 across a median follow-up period of five years.\n\nResearchers found that orthokeratology lenses produced a statistically significant reduction in axial elongation — the primary anatomical driver of myopic progression — in children under ten years of age, outperforming low-dose atropine (0.05%) by a margin of 34% in that sub-cohort. However, this advantage reversed markedly in adolescents aged 13 and above, where atropine therapy demonstrated superior efficacy and significantly higher patient compliance.",
    author: "Dr. Priya Mehta, OD, PhD",
    authorRole: "Director, Paediatric Vision Research, AIIMS Delhi",
    size: "lead",
  },
  {
    id: 2,
    col: "Technology",
    headline:
      "AI-Assisted Retinal Imaging Achieves 94% Sensitivity in Multi-Site Diabetic Retinopathy Trials",
    deck: "Deep learning models outperform junior clinicians in screening accuracy, but integration challenges remain significant.",
    body: "The results of a six-site validation study of AI-assisted retinal imaging have been released, showing a diagnostic sensitivity of 94.3% for early-stage diabetic retinopathy — a figure that surpasses the average performance of resident-level clinicians by approximately 11 percentage points.\n\nThe study, coordinated across six cities including Mumbai, Chennai, and Hyderabad, evaluated three commercially available AI platforms against a ground-truth dataset assembled by a panel of senior vitreoretinal specialists.",
    author: "Dr. Arjun Kapoor, FAAO",
    authorRole: "Consultant, Vitreoretinal Services, Sankara Nethralaya",
    size: "standard",
  },
  {
    id: 3,
    col: "Practice Management",
    headline:
      "Restructuring Frame Galleries: Evidence-Based Planogram Strategies Deliver 40% Revenue Uplift",
    deck: "Three multi-location practices share results from a 12-month retail redesign study applying consumer psychology to optical dispensing.",
    body: "A controlled trial across three multi-location optical practices has demonstrated that applying structured planogram principles to optical frame display can yield a revenue increase of up to 40% within a 12-month window.\n\nThe study drew on established consumer packaged goods retail methodology, adapting zone-based display theory, eye-level anchoring, and decision-fatigue reduction strategies to the specific demands of optical dispensing.",
    author: "Dr. Neha Sharma, OD, MBA",
    authorRole: "Director, Clarity Vision Group, Bengaluru",
    size: "standard",
  },
  {
    id: 4,
    col: "Society Bulletin",
    headline:
      "Annual Conference Opens Registration; Jaipur Set to Host 200 Speakers in November",
    deck: "The OSI Annual Summit 2026 will feature 80+ CME hours, a dedicated dry eye symposium, and the inaugural Young Optometrist Awards.",
    body: "The Optometrists Society of India has formally opened registration for its Annual Summit 2026, to be held at the Jaipur Convention Centre from 14 to 16 November. The event is expected to draw over 3,000 delegates from across India and abroad.",
    author: "OSI Secretariat",
    authorRole: "New Delhi",
    size: "brief",
  },
  {
    id: 5,
    col: "Dry Eye",
    headline:
      "Revised MGD Grading Scale Released by Joint International Taskforce",
    deck: "Updated staging criteria incorporate meibography findings and introduce a tiered treatment algorithm covering IPL, thermal pulsation, and novel topicals.",
    body: "The international joint taskforce on Meibomian Gland Dysfunction has released a revised grading scale that represents the most significant update to MGD staging criteria since 2011. The new framework incorporates meibography-based morphological grading alongside conventional secretion quality assessment.\n\nThe five-tier scale replaces the previous three-tier system and is designed to better stratify patients for treatment selection, particularly in differentiating candidates for in-office procedures such as intense pulsed light therapy from those likely to respond to topical regimens alone.",
    author: "Dr. Rohit Verma, OD",
    authorRole: "Lead, OSI Ocular Surface Sub-Committee",
    size: "standard",
  },
  {
    id: 6,
    col: "Paediatric Vision",
    headline:
      "Post-COVID Convergence Insufficiency Surge Prompts Urgent Call for Standardised Screening",
    deck: "Practitioners report a threefold increase in CI presentations among adolescents; OSI urges schools to adopt binocular vision screening by 2027.",
    body: "Optometrists across India have reported a striking increase in convergence insufficiency presentations among school-age children in the post-pandemic period, with some practices noting a threefold rise compared to pre-2020 referral rates. The increase is hypothesised to be linked to extended near-work demands during remote schooling.\n\nThe OSI Binocular Vision Sub-Committee has responded by issuing a position paper urging state education departments to incorporate binocular vision assessment into mandatory school eye health programmes by the 2027 academic year.",
    author: "Dr. Kavita Patel, FCOVD",
    authorRole: "Binocular Vision Specialist, Rainbow Children's Hospital",
    size: "standard",
  },
];

const categories = [
  "All",
  "Clinical Research",
  "Technology",
  "Dry Eye",
  "Paediatric Vision",
  "Practice Management",
  "Society Bulletin",
];

export default function Newsletter() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [expanded, setExpanded] = useState({});

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.col === activeCategory);

  const lead = filtered.find((a) => a.size === "lead") || filtered[0];
  const rest = filtered.filter((a) => a.id !== lead?.id);
  const standards = rest.filter((a) => a.size !== "brief");
  const briefs = rest.filter((a) => a.size === "brief");

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div
      className="min-h-screen bg-[#f5f0e8]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* TOP UTILITY BAR */}
      <div className="flex flex-col items-start justify-between gap-2 bg-stone-900 px-4 py-2 text-sm text-stone-300 sm:flex-row sm:items-center sm:px-6">
        <span style={{ fontFamily: "sans-serif", letterSpacing: "0.05em" }}>
          {today}
        </span>
        <div
          className="flex flex-wrap items-center gap-3 sm:gap-4"
          style={{ fontFamily: "sans-serif" }}
        >
          <a href="#" className="hover:text-white transition-colors">
            Archive
          </a>
          <span className="text-stone-600">|</span>
          <a href="#" className="hover:text-white transition-colors">
            CME Portal
          </a>
          <span className="text-stone-600">|</span>
          <a href="#" className="hover:text-white transition-colors">
            Submit Article
          </a>
        </div>
      </div>

      {/* MASTHEAD */}
      <header className="border-b-[3px] border-stone-900 bg-[#f5f0e8] px-4 pb-3 pt-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex-1 border-t border-stone-400" />
            <p
              className="text-center text-[10px] uppercase tracking-widest text-stone-500 sm:text-xs"
              style={{ fontFamily: "sans-serif" }}
            >
              Optometrists Society of India &nbsp;·&nbsp; Est. 2023
              &nbsp;·&nbsp; New Delhi
            </p>
            <div className="flex-1 border-t border-stone-400" />
          </div>

          <div className="text-center mb-2">
            <h1
              className="font-black text-stone-900 leading-none"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              The Dristi Mitigya Journal
            </h1>
            <p
            className="text-sm text-stone-500 mt-2 tracking-[0.2em] uppercase"
              style={{ fontFamily: "sans-serif" }}
            >
              Peer-Reviewed Clinical Optometry &mdash; Published Monthly
            </p>
          </div>

          <div
            className="mt-3 flex flex-col items-stretch justify-between gap-3 border-b border-t border-stone-400 py-2.5 text-sm text-stone-600 md:flex-row md:items-center"
            style={{ fontFamily: "sans-serif" }}
          >
            <span>{edition}</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {!subscribed ? (
                <>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-stone-400 bg-transparent px-3 py-2 text-base outline-none focus:border-stone-700 sm:w-52 sm:py-1.5 sm:text-sm"
                    style={{ fontFamily: "sans-serif" }}
                  />
                  <button
                    onClick={() => email && setSubscribed(true)}
                    className="bg-stone-900 px-4 py-2 text-sm text-[#f5f0e8] transition-colors hover:bg-stone-700 sm:py-1.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Subscribe Free
                  </button>
                </>
              ) : (
                <span className="italic">✓ Subscribed — check your inbox</span>
              )}
            </div>
            <span>10+ Members &nbsp;·&nbsp; ISSN 2349-XXXX</span>
          </div>
        </div>
      </header>

      {/* SECTION TABS */}
      <nav className="border-b border-stone-400 bg-[#f5f0e8] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-0 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
              style={{ fontFamily: "sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN NEWSPAPER BODY */}
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        {lead && (
          <>
            {/* === FRONT PAGE === */}
            <div className="mb-5 grid grid-cols-12 gap-0 border-b-2 border-stone-900 pb-5">
              {/* LEFT: Lead story — 8 cols */}
              <div className="col-span-12 lg:col-span-8 lg:pr-6 lg:border-r lg:border-stone-300">
                <Kicker text={lead.col} />
                <h2
                  className="font-black text-stone-900 leading-tight mb-2"
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "clamp(1.9rem, 3.5vw, 3rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {lead.headline}
                </h2>
                <p
                  className="mb-3 text-base italic leading-snug text-stone-700 sm:text-lg"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {lead.deck}
                </p>
                <Byline author={lead.author} role={lead.authorRole} />
                <HRule />

                {/* Body in 2-col newspaper format */}
                <div className="gap-6 columns-1 md:columns-2">
                  <BodyText
                    text={lead.body}
                    id={lead.id}
                    expanded={expanded}
                    onToggle={toggleExpand}
                    dropCap
                  />
                </div>
              </div>

              {/* RIGHT: Index + promo boxes — 4 cols */}
              <div className="col-span-12 lg:col-span-4 lg:pl-6 mt-5 lg:mt-0 space-y-4">
                {/* Inside this issue */}
                <div className="border border-stone-400 p-3 bg-[#ede8de]">
                  <p
                    className="text-xs font-black tracking-widest uppercase text-stone-500 mb-3 pb-2 border-b border-stone-300"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Inside This Issue
                  </p>
                  {articles
                    .filter((a) => a.id !== lead.id)
                    .map((a, i, arr) => (
                      <div
                        key={a.id}
                      className={`flex flex-col gap-1 py-1.5 sm:flex-row sm:gap-2 ${i < arr.length - 1 ? "border-b border-stone-200" : ""}`}
                      >
                        <span
                          className="text-[11px] text-stone-500 uppercase tracking-wider whitespace-nowrap mt-0.5 w-20 shrink-0"
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {a.col}
                        </span>
                        <p className="text-sm text-stone-800 leading-snug">
                          {a.headline}
                        </p>
                      </div>
                    ))}
                </div>

                {/* CME box */}
                <div className="border-2 border-stone-900 p-3">
                  <p
                    className="text-xs font-black tracking-widest uppercase text-stone-500 mb-2"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    CME Opportunity
                  </p>
                  <p
                    className="text-lg font-bold text-stone-900 leading-tight mb-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Earn 20 CME Hours — New Modules Now Live
                  </p>
                  <p
                    className="text-sm text-stone-700 mb-3 leading-relaxed"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Accredited modules in dry eye, paediatric vision, and low
                    vision. Self-paced online access.
                  </p>
                  <a
                    href="#"
                    className="text-sm font-bold text-stone-900 underline underline-offset-2"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Browse Modules →
                  </a>
                </div>

                {/* Conference */}
                <div className="bg-stone-900 text-[#f5f0e8] p-3">
                  <p
                    className="text-xs font-black tracking-widest uppercase text-stone-400 mb-2"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Save the Date
                  </p>
                  <p
                    className="text-lg font-bold leading-tight mb-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    OSI Annual Summit 2026
                  </p>
                  <p
                    className="text-sm text-stone-300 mb-3"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Jaipur · 14–16 November 2026
                    <br />
                    200+ Speakers · 80+ CME Hours
                  </p>
                  <a
                    href="#"
                    className="text-sm font-bold text-stone-300 underline underline-offset-2"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Register Now →
                  </a>
                </div>
              </div>
            </div>

            {/* === SECONDARY STORIES — true newspaper column grid === */}
            {standards.length > 0 && (
              <>
                <SectionRule label="Continued Coverage" />
                <div
                  className={`grid gap-0 divide-y divide-stone-300 md:divide-x md:divide-y-0 ${
                    standards.length === 1
                      ? "grid-cols-1"
                      : standards.length === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {standards.map((article, idx) => (
                    <div
                      key={article.id}
                      className={`py-5 md:py-2 ${idx > 0 ? "md:pl-5" : ""} ${idx < standards.length - 1 ? "md:pr-5" : ""}`}
                    >
                      <Kicker text={article.col} />
                      <h3
                        className="font-bold text-stone-900 leading-tight mb-1.5"
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontSize: "1.35rem",
                        }}
                      >
                        {article.headline}
                      </h3>
                      <p
                        className="text-base italic text-stone-700 leading-snug mb-3"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {article.deck}
                      </p>
                      <Byline
                        author={article.author}
                        role={article.authorRole}
                        small
                      />
                      <HRule />
                      <BodyText
                        text={article.body}
                        id={article.id}
                        expanded={expanded}
                        onToggle={toggleExpand}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* === BRIEFS === */}
            {briefs.length > 0 && (
              <>
                <SectionRule label="Society Briefs" />
                <div
                  className={`grid gap-x-6 gap-y-4 ${
                    briefs.length === 1
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  }`}
                >
                  {briefs.map((b) => (
                    <div
                      key={b.id}
                      className="border-t-2 border-stone-900 pt-3"
                    >
                      <Kicker text={b.col} />
                      <p
                        className="text-sm font-bold text-stone-900 leading-snug mb-1.5"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {b.headline}
                      </p>
                      <p
                        className="text-sm text-stone-700 leading-relaxed"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {b.body}
                      </p>
                      <p
                        className="text-sm text-stone-500 mt-2 italic"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        — {b.author}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* FOOTER */}
        <div className="mt-10 grid grid-cols-1 gap-6 border-t-2 border-stone-900 pt-5 md:grid-cols-3">
          <div>
            <p
              className="text-xs font-black tracking-widest uppercase text-stone-500 mb-3 pb-2 border-b border-stone-300"
              style={{ fontFamily: "sans-serif" }}
            >
              Editorial Board
            </p>
            {[
              ["Editor-in-Chief", "Dr. Sunita Agarwal, OD, PhD"],
              ["Deputy Editor", "Dr. Manoj Bhargava, FAAO"],
              ["Clinical Review", "Dr. Leena Krishnan, OD"],
              ["Research Editor", "Dr. Aditya Rao, PhD"],
            ].map(([role, name]) => (
              <div key={role} className="mb-1 flex flex-col gap-1 sm:flex-row">
                <span
                  className="text-[11px] text-stone-500 uppercase tracking-wider whitespace-nowrap"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {role}:{" "}
                </span>
                <span className="text-sm text-stone-800">{name}</span>
              </div>
            ))}
          </div>
          <div>
            <p
              className="text-xs font-black tracking-widest uppercase text-stone-500 mb-3 pb-2 border-b border-stone-300"
              style={{ fontFamily: "sans-serif" }}
            >
              Publication
            </p>
            <p
              className="text-sm text-stone-700 leading-relaxed"
              style={{ fontFamily: "sans-serif" }}
            >
              The Vision Journal is published monthly by the Optometrists
              Society of India. All articles are subject to double-blind peer
              review. Indexed in Index Medicus (India). ISSN 2349-XXXX.
            </p>
          </div>
          <div>
            <p
              className="text-xs font-black tracking-widest uppercase text-stone-500 mb-3 pb-2 border-b border-stone-300"
              style={{ fontFamily: "sans-serif" }}
            >
              Correspondence
            </p>
            <p
              className="text-sm text-stone-700 leading-relaxed"
              style={{ fontFamily: "sans-serif" }}
            >
              Submissions, letters to the editor, and advertising enquiries may
              be addressed to the OSI Secretariat, New Delhi — 110 001.{" "}
              <a href="#" className="underline hover:text-stone-900">
                journal@optometryindia.org
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-stone-300 pt-3 text-center">
          <p
            className="text-xs text-stone-500"
            style={{ fontFamily: "sans-serif" }}
          >
            © 2026 Optometrists Society of India. All rights reserved. · {today}
          </p>
        </div>
      </main>
    </div>
  );
}

/* ── Utility components ── */

function Kicker({ text }) {
  return (
    <p
      className="text-xs font-black tracking-widest uppercase text-stone-500 mb-2"
      style={{ fontFamily: "sans-serif" }}
    >
      {text}
    </p>
  );
}

function Byline({ author, role, small }) {
  return (
    <p
      className={`text-stone-600 mb-3 ${small ? "text-xs" : "text-sm"}`}
      style={{ fontFamily: "sans-serif" }}
    >
      By <span className="font-semibold text-stone-700">{author}</span>
      {role && (
        <>
          {" "}
          <span className="text-stone-400">·</span> {role}
        </>
      )}
    </p>
  );
}

function HRule() {
  return <div className="border-t border-stone-300 mb-3" />;
}

function SectionRule({ label }) {
  return (
    <div className="flex items-center gap-3 mb-4 mt-2">
      <div className="border-t-2 border-stone-900 flex-1" />
      <span
        className="text-[9px] font-black tracking-widest uppercase text-stone-700 whitespace-nowrap"
        style={{ fontFamily: "sans-serif" }}
      >
        {label}
      </span>
      <div className="border-t-2 border-stone-900 flex-1" />
    </div>
  );
}

function BodyText({ text, id, expanded, onToggle, dropCap }) {
  const paragraphs = text.split("\n\n");
  const isExpanded = expanded[id];
  const show = isExpanded ? paragraphs : [paragraphs[0]];

  return (
    <div>
      {show.map((para, i) => (
        <p
          key={i}
        className="mb-4 text-[16px] leading-[1.85] text-stone-900"
          style={{
            fontFamily: "'Georgia', serif",
            textAlign: "justify",
            hyphens: "auto",
          }}
        >
          {dropCap && i === 0 ? (
            <>
              <span
                className="float-left font-black text-stone-900 leading-none mr-1"
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "3.6rem",
                  lineHeight: "0.78",
                  marginTop: "4px",
                }}
              >
                {para[0]}
              </span>
              {para.slice(1)}
            </>
          ) : (
            para
          )}
        </p>
      ))}
      {paragraphs.length > 1 && (
        <button
          onClick={() => onToggle(id)}
          className="text-sm font-bold text-stone-600 hover:text-stone-900 underline underline-offset-2 transition-colors"
          style={{ fontFamily: "sans-serif" }}
        >
          {isExpanded ? "Collapse ↑" : "Continue reading →"}
        </button>
      )}
    </div>
  );
}
