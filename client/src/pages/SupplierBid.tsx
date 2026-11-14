import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, LockKeyhole, ShieldCheck } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useBidveilWorkspace } from "@/contexts/BidveilContext";

type SupplierBidProps = { params: { id: string } };

export default function SupplierBid({ params }: SupplierBidProps) {
  const { tenders, submitBid, setRole } = useBidveilWorkspace();
  const tender = tenders.find((item) => item.id === decodeURIComponent(params.id)) ?? tenders[0];
  const [amount, setAmount] = useState("");
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!amount || !summary.trim()) return;
    submitBid(tender.id, Number(amount), summary);
    setSubmitted(true);
  };

  return <DashboardLayout active="Suppliers"><div className="dashboard-inner workflow-inner">
    <a className="back-link" href="/dashboard" onClick={() => setRole("supplier")}><ArrowLeft size={15} /> Back to supplier workspace</a>
    {!submitted ? <><div className="workflow-heading workflow-heading--compact"><div><span className="mono-label">SUPPLIER INVITATION / {tender.id}</span><h1>Submit a bid that stays <em>sealed.</em></h1><p>{tender.description} Review the rules, complete your response, and keep your commercial position private until the review window opens.</p></div><span className="status-pill status-pill--violet"><span /> INVITED</span></div><div className="supplier-flow-layout"><section className="workflow-form"><div className="supplier-brief"><span className="mono-label">THE BRIEF</span><h2>{tender.name}</h2><div className="supplier-brief__meta"><span>Closes {tender.deadline}</span><span>{tender.bidRule}</span><span>{tender.revealPolicy}</span></div><p>{tender.description}</p></div><div className="workflow-form__section"><span className="mono-label">YOUR RESPONSE</span><h2>What would you propose?</h2><label>Bid value<input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 82000" /></label><label>Proposal summary<textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Describe your approach, delivery plan, and what makes it a strong fit." rows={5} /></label></div><div className="workflow-actions"><button className="button button--primary" onClick={submit} disabled={!amount || !summary.trim()}>Seal and submit bid <LockKeyhole size={16} /></button></div></section><aside className="workflow-aside"><div className="privacy-note privacy-note--violet"><LockKeyhole size={19} /><span className="mono-label">YOUR PRIVACY STATE</span><h3>Your bid is sealed until review.</h3><ul><li><Check size={14} /> Bid value stays hidden</li><li><Check size={14} /> Eligibility is verified privately</li><li><Check size={14} /> You receive a submission receipt</li></ul></div><div className="workflow-summary"><span className="mono-label">REQUIREMENTS</span>{tender.requirements.map((requirement) => <div key={requirement}><ShieldCheck size={14} /> {requirement}</div>)}</div></aside></div></> : <div className="success-state"><div className="success-state__icon"><Check size={28} /></div><span className="mono-label">SUBMISSION CONFIRMED / {tender.id}</span><h1>Your bid is sealed.</h1><p>Bidveil has recorded your response without exposing your commercial position to competing suppliers.</p><div className="receipt-box"><span className="mono-label">SUBMISSION RECEIPT</span><strong>BV—2041—7F93</strong><div><span>Submitted</span><span>14 Nov 2026 / 10:21</span></div><div><span>Eligibility</span><span className="receipt-verified"><ShieldCheck size={14} /> Verified</span></div><div><span>Reveal state</span><span className="receipt-sealed"><LockKeyhole size={14} /> Sealed</span></div></div><a href="/dashboard" className="button button--primary">Return to supplier workspace <ArrowUpRight size={16} /></a></div>}
  </div></DashboardLayout>;
}
