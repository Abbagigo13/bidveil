import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, FileText, LockKeyhole, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { useBidveilWorkspace } from "@/contexts/BidveilContext";

export default function CreateTender() {
  const { createTender } = useBidveilWorkspace();
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Facilities");
  const [deadline, setDeadline] = useState("30 Nov 2026");
  const [bidRule, setBidRule] = useState("Lowest compliant bid");
  const [revealPolicy, setRevealPolicy] = useState("Winner and final price only");
  const [requirements, setRequirements] = useState(["Registered business", "Current insurance"]);
  const [newRequirement, setNewRequirement] = useState("");
  const [step, setStep] = useState(1);

  const publish = () => {
    if (!name.trim()) return;
    const tender = createTender({ name, description: description || "A new private procurement tender.", category, deadline, bidRule, revealPolicy, requirements });
    setLocation(`/dashboard/tenders/${encodeURIComponent(tender.id)}`);
  };

  const addRequirement = () => {
    if (newRequirement.trim()) { setRequirements((current) => [...current, newRequirement.trim()]); setNewRequirement(""); }
  };

  return <DashboardLayout active="Tenders"><div className="dashboard-inner workflow-inner">
    <a className="back-link" href="/dashboard"><ArrowLeft size={15} /> Back to overview</a>
    <div className="workflow-heading"><div><span className="mono-label">NEW TENDER / STEP {step} OF 3</span><h1>Set the rules before<br /><em>the bids arrive.</em></h1><p>Build a clear brief, define what suppliers must prove, and choose how much becomes visible after the deadline.</p></div><div className="workflow-progress"><span className={step >= 1 ? "active" : ""} /> <span className={step >= 2 ? "active" : ""} /> <span className={step >= 3 ? "active" : ""} /></div></div>
    <div className="workflow-layout"><section className="workflow-form">
      {step === 1 && <><div className="workflow-form__section"><span className="mono-label">01 / TENDER BRIEF</span><h2>What are you sourcing?</h2><label>Tender name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Office fit-out" /></label><label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Give suppliers the context they need to respond well." rows={4} /></label><label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Facilities</option><option>Technology</option><option>Operations</option><option>Professional services</option></select></label></div><div className="workflow-actions"><button className="button button--primary" onClick={() => setStep(2)} disabled={!name.trim()}>Continue to requirements <ChevronRight size={16} /></button></div></>}
      {step === 2 && <><div className="workflow-form__section"><span className="mono-label">02 / REQUIREMENTS</span><h2>What must suppliers prove?</h2><p className="form-intro">These checks are private. Suppliers will see the requirement, not the underlying evidence submitted to verify it.</p><div className="requirement-list">{requirements.map((item, index) => <div className="requirement-row" key={item}><span className="requirement-row__number">0{index + 1}</span><span>{item}</span><button type="button" onClick={() => setRequirements((current) => current.filter((_, i) => i !== index))} aria-label={`Remove ${item}`}><Trash2 size={15} /></button></div>)}</div><div className="requirement-add"><input value={newRequirement} onChange={(e) => setNewRequirement(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addRequirement()} placeholder="Add a requirement" /><button type="button" onClick={addRequirement} aria-label="Add requirement"><Plus size={16} /></button></div></div><div className="workflow-actions"><button className="button button--secondary" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button><button className="button button--primary" onClick={() => setStep(3)}>Configure privacy <ChevronRight size={16} /></button></div></>}
      {step === 3 && <><div className="workflow-form__section"><span className="mono-label">03 / BID CONFIGURATION</span><h2>Make the reveal policy explicit.</h2><label>Bid rule<select value={bidRule} onChange={(e) => setBidRule(e.target.value)}><option>Lowest compliant bid</option><option>Highest value</option><option>Weighted quality and price</option></select></label><label>Submission deadline<input value={deadline} onChange={(e) => setDeadline(e.target.value)} /></label><label>Reveal policy<select value={revealPolicy} onChange={(e) => setRevealPolicy(e.target.value)}><option>Winner and final price only</option><option>Top three bids for committee review</option><option>Manual field-by-field reveal</option></select></label></div><div className="workflow-actions"><button className="button button--secondary" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</button><button className="button button--primary" onClick={publish}>Publish tender <ArrowUpRight size={16} /></button></div></>}
    </section><aside className="workflow-aside"><div className="privacy-note"><LockKeyhole size={19} /><span className="mono-label">PRIVACY PROMISE</span><h3>Nothing reveals itself by accident.</h3><p>Bidveil keeps the fields you mark private until the policy you set allows a controlled reveal.</p></div><div className="workflow-summary"><span className="mono-label">TENDER SUMMARY</span><strong>{name || "Untitled tender"}</strong><div><FileText size={14} /> {category}</div><div><ShieldCheck size={14} /> {requirements.length} requirements</div><div><LockKeyhole size={14} /> Sealed bids</div><div className="workflow-summary__rule" /><small>Draft changes stay in this workspace until you publish.</small></div></aside></div>
  </div></DashboardLayout>;
}
