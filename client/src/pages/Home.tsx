import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  FileCheck2,
  FileText,
  LockKeyhole,
  Menu,
  ScanLine,
  Scale,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";

const steps = [
  {
    index: "01",
    title: "Set the rules",
    body: "Define the requirements, scoring method, and disclosure policy before the first supplier sees the tender.",
    icon: FileText,
    tag: "BUYER CONTROL",
  },
  {
    index: "02",
    title: "Collect sealed bids",
    body: "Suppliers submit commercial details into a sealed workspace. Bid values stay out of view while the window is open.",
    icon: LockKeyhole,
    tag: "PRIVATE BY DEFAULT",
  },
  {
    index: "03",
    title: "Verify eligibility",
    body: "Eligibility proofs confirm that each supplier meets the brief without exposing credentials or sensitive evidence.",
    icon: ShieldCheck,
    tag: "PROOF, NOT EXPOSURE",
  },
  {
    index: "04",
    title: "Reveal and award",
    body: "When the review window opens, reveal only what the decision requires and leave a clear record of the award.",
    icon: Scale,
    tag: "CONTROLLED REVEAL",
  },
];

const faqs = [
  {
    question: "Are bid values visible before the tender closes?",
    answer: "No. Bid values and private supplier details remain sealed while the tender is open. The buyer sets the reveal policy before publishing and can reveal only the fields needed for review.",
  },
  {
    question: "What is an eligibility proof?",
    answer: "It is a verification that a supplier satisfies a requirement without sharing the underlying document or personal data. For example, a supplier can prove it is insured without putting its full policy on the public record.",
  },
  {
    question: "Can a buyer reveal one field without revealing everything?",
    answer: "Yes. Bidveil is designed around selective disclosure. A buyer may reveal a bid value, a compliance result, or a final award record according to the tender's policy.",
  },
  {
    question: "What does the audit trail contain?",
    answer: "The audit trail records actions that matter to procurement integrity: tender publication, submission timestamps, proof results, reveal events, and the final award. It does not need to expose every private field.",
  },
  {
    question: "How do suppliers participate?",
    answer: "Suppliers receive an invitation, review the tender rules, complete their private eligibility checks, and submit a sealed bid. They receive a submission receipt without exposing their bid to competing suppliers.",
  },
  {
    question: "Does Bidveil replace procurement judgment?",
    answer: "No. Bidveil protects the process around a decision. Organizations still define the brief, weigh the proposals, and make the award. The product helps make those decisions fairer and easier to audit.",
  },
];

const docs = [
  {
    label: "01 / CONCEPT",
    title: "The privacy model",
    body: "A plain-language guide to sealed fields, eligibility proofs, and selective disclosure.",
    icon: LockKeyhole,
  },
  {
    label: "02 / OPERATIONS",
    title: "The bid lifecycle",
    body: "How a tender moves from rules to submission, review, reveal, and award.",
    icon: ScanLine,
  },
  {
    label: "03 / EVIDENCE",
    title: "Auditability by design",
    body: "What gets recorded, what stays private, and how procurement teams can review the record.",
    icon: FileCheck2,
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const closeMobile = () => setMobileOpen(false);

  return (
    <main className="site-shell">
      <div className="top-note">
        <span className="top-note__pulse" aria-hidden="true" />
        <span>Private procurement, made legible.</span>
        <a href="#how-it-works">See how it works <ArrowUpRight size={13} /></a>
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <BrandMark />
          <nav className={`site-nav ${mobileOpen ? "site-nav--open" : ""}`} aria-label="Primary navigation">
            <a href="#how-it-works" onClick={closeMobile}>How it works</a>
            <a href="#docs" onClick={closeMobile}>Docs</a>
            <a href="#faqs" onClick={closeMobile}>FAQs</a>
            <a href="/dashboard" className="nav-dashboard" onClick={closeMobile}>Enter dashboard <ArrowUpRight size={15} /></a>
          </nav>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-section__inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow__mark" /> Private procurement infrastructure</p>
            <h1>Run fair procurement <em>without exposing every bid.</em></h1>
            <p className="hero-copy__lede">Bidveil helps organizations collect sealed bids, verify supplier eligibility, and reveal only what the decision requires.</p>
            <div className="hero-actions">
              <a href="/dashboard" className="button button--primary">Preview the dashboard <ArrowUpRight size={16} /></a>
              <a href="#how-it-works" className="text-link">How it works <ArrowDownRight size={16} /></a>
            </div>
            <div className="hero-proofline" aria-label="Bidveil product principles">
              <span><Check size={14} /> Sealed by default</span>
              <span><Check size={14} /> Selective disclosure</span>
              <span><Check size={14} /> Clear audit trail</span>
            </div>
          </div>

          <div className="hero-figure" aria-label="Illustration of a sealed tender moving through verification and award" role="img">
            <div className="hero-figure__header">
              <span className="mono-label">TENDER / BV—2041</span>
              <span className="status-pill status-pill--sealed"><span /> SEALED</span>
            </div>
            <div className="document-stack">
              <div className="document document--back" />
              <div className="document document--middle" />
              <div className="document document--front">
                <div className="document__topline"><span /> <span /> <span /></div>
                <div className="document__title">Office fit-out</div>
                <div className="document__rule document__rule--wide" />
                <div className="document__rule" />
                <div className="document__rule document__rule--short" />
                <div className="document__seal"><LockKeyhole size={18} /></div>
              </div>
            </div>
            <div className="hero-figure__footer">
              <div><span className="status-dot status-dot--violet" /> Eligibility proof ready</div>
              <div className="hero-figure__line" />
              <div><span className="status-dot status-dot--amber" /> Reveal policy set</div>
            </div>
            <span className="figure-coordinate figure-coordinate--top">PRIVATE STATE / 01</span>
            <span className="figure-coordinate figure-coordinate--bottom">CONTROLLED DISCLOSURE</span>
          </div>
        </div>
        <div className="hero-caption"><span>01</span><span className="hero-caption__line" /><span>THE BIDVEIL METHOD</span></div>
      </section>

      <section className="statement-section">
        <div className="section-index">01 / WHY BIDVEIL</div>
        <div className="statement-section__content">
          <h2>Procurement works better when trust is part of the infrastructure.</h2>
          <p>Every tender asks suppliers to share sensitive information. Bidveil keeps that information sealed while giving buyers the proofs and records they need to make a confident decision.</p>
        </div>
        <div className="statement-section__aside"><span className="aside-number">01</span><span>Privacy that supports a decision, not privacy for its own sake.</span></div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <div>
            <div className="section-index">02 / HOW IT WORKS</div>
            <h2>Four moves from brief to award.</h2>
          </div>
          <p>The process is familiar. The information handling is different.</p>
        </div>
        <div className="steps-list">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article className="step-row" key={step.index}>
                <span className="step-row__index">{step.index}</span>
                <div className="step-row__icon"><Icon size={22} strokeWidth={1.5} /></div>
                <div className="step-row__body"><span className="mono-label">{step.tag}</span><h3>{step.title}</h3><p>{step.body}</p></div>
                <ArrowUpRight className="step-row__arrow" size={19} />
              </article>
            );
          })}
        </div>
      </section>

      <section className="split-section">
        <div className="split-section__visual">
          <div className="ledger-visual">
            <div className="ledger-visual__top"><span>PROCUREMENT LEDGER</span><span>LIVE PREVIEW</span></div>
            <div className="ledger-visual__row"><span>Supplier eligibility</span><strong><span className="status-dot status-dot--violet" /> VERIFIED</strong></div>
            <div className="ledger-visual__row"><span>Bid value</span><strong><LockKeyhole size={13} /> SEALED</strong></div>
            <div className="ledger-visual__row"><span>Review window</span><strong><span className="status-dot status-dot--amber" /> 02d 14h</strong></div>
            <div className="ledger-visual__divider" />
            <div className="ledger-visual__stamp"><ShieldCheck size={17} /><span>Integrity<br />preserved</span></div>
          </div>
        </div>
        <div className="split-section__copy">
          <div className="section-index">03 / THE DECISION</div>
          <h2>Reveal only what the decision requires.</h2>
          <p>Bidveil gives buyers a clear line between what is verified and what is visible. That makes sensitive procurement easier to explain internally—and easier for suppliers to trust.</p>
          <a href="/dashboard" className="text-link text-link--strong">See the dashboard preview <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="dashboard-bridge">
        <div className="dashboard-bridge__header">
          <div><div className="section-index">04 / THE PRODUCT</div><h2>A quiet surface for consequential work.</h2></div>
          <p>One place for buyers and suppliers to see the state of a tender without losing sight of what stays private.</p>
        </div>
        <a href="/dashboard" className="dashboard-preview-link">
          <div className="dashboard-preview">
            <div className="dashboard-preview__rail"><BrandMark compact light /><span className="rail-line" /><span className="rail-dot rail-dot--active" /><span className="rail-dot" /><span className="rail-dot" /><span className="rail-line rail-line--bottom" /></div>
            <div className="dashboard-preview__main">
              <div className="dashboard-preview__top"><span className="mono-label">BUYER WORKSPACE</span><span className="status-pill status-pill--preview"><span /> PREVIEW</span></div>
              <div className="dashboard-preview__title"><span>Good morning, Avery.</span><strong>Overview</strong></div>
              <div className="dashboard-preview__metrics"><div><span>ACTIVE TENDERS</span><strong>04</strong></div><div><span>SEALED BIDS</span><strong>12</strong></div><div><span>VERIFIED SUPPLIERS</span><strong>18</strong></div></div>
              <div className="dashboard-preview__table"><div className="table-head"><span>TENDER</span><span>STATUS</span><span>DEADLINE</span></div><div className="table-row"><span>Office fit-out / BV—2041</span><span className="preview-status"><span className="status-dot status-dot--violet" /> Collecting bids</span><span>2d 14h</span></div><div className="table-row"><span>Security review / BV—2037</span><span className="preview-status"><span className="status-dot status-dot--green" /> Ready to reveal</span><span>Today</span></div></div>
            </div>
          </div>
          <span className="dashboard-preview-link__label">Enter dashboard preview <ArrowUpRight size={16} /></span>
        </a>
      </section>

      <section className="docs-section" id="docs">
        <div className="section-heading section-heading--docs">
          <div><div className="section-index">05 / DOCUMENTATION</div><h2>Start with the system, not the jargon.</h2></div>
          <p>Short, practical notes for the people who publish a tender and the people who answer one.</p>
        </div>
        <div className="docs-list">
          {docs.map((doc) => {
            const Icon = doc.icon;
            return <a href="/dashboard" className="doc-row" key={doc.title}><div className="doc-row__icon"><Icon size={19} /></div><div><span className="mono-label">{doc.label}</span><h3>{doc.title}</h3><p>{doc.body}</p></div><ArrowUpRight className="doc-row__arrow" size={18} /></a>;
          })}
        </div>
        <div className="docs-footer"><BookOpen size={16} /><span>Documentation is being shaped alongside the first procurement workspace.</span><a href="/dashboard">View product preview <ArrowUpRight size={15} /></a></div>
      </section>

      <section className="faq-section" id="faqs">
        <div className="faq-section__intro"><div className="section-index">06 / FAQS</div><h2>Questions worth answering before the first bid.</h2><p>Bidveil is designed for procurement teams that need privacy to be practical, explainable, and fair.</p></div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={faq.question}><button type="button" className="faq-question" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}><span>{faq.question}</span><span className="faq-question__icon"><ChevronDown size={17} /></span></button>{isOpen && <div className="faq-answer"><p>{faq.answer}</p></div>}</div>;
          })}
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta__rule" />
        <div className="final-cta__content"><span className="mono-label">BIDVEIL / PRIVATE PROCUREMENT</span><h2>Make the decision.<br /><em>Keep the details yours.</em></h2><a href="/dashboard" className="button button--light">Enter the dashboard <ArrowUpRight size={16} /></a></div>
        <div className="final-cta__mark"><Users size={22} /><span>For buyers<br />and suppliers</span></div>
      </section>

      <footer className="site-footer"><BrandMark light /><div className="site-footer__links"><a href="#how-it-works">How it works</a><a href="#docs">Docs</a><a href="#faqs">FAQs</a><a href="/dashboard">Dashboard</a></div><div className="site-footer__meta"><span>© 2026 Bidveil</span><span>Private by default.</span></div></footer>
    </main>
  );
}
