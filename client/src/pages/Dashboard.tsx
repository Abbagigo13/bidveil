import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  FileText,
  Home,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Plus,
  ScanLine,
  Settings2,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";

const tenders = [
  { name: "Office fit-out", id: "BV—2041", status: "Collecting bids", statusClass: "violet", bids: "03 / 05", deadline: "2d 14h" },
  { name: "Security review", id: "BV—2037", status: "Ready to reveal", statusClass: "green", bids: "05 / 05", deadline: "Today" },
  { name: "Fleet renewal", id: "BV—2032", status: "Draft", statusClass: "muted", bids: "—", deadline: "28 Nov" },
];

export default function Dashboard() {
  const [role, setRole] = useState<"buyer" | "supplier">("buyer");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="dashboard-shell">
      <aside className={`dashboard-rail ${mobileOpen ? "dashboard-rail--open" : ""}`}>
        <div className="dashboard-rail__top"><BrandMark compact light /><button type="button" className="dashboard-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button></div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a className="dashboard-nav__item dashboard-nav__item--active" href="/dashboard"><Home size={17} /> Overview</a>
          <a className="dashboard-nav__item" href="/dashboard"><FileText size={17} /> Tenders <span>04</span></a>
          <a className="dashboard-nav__item" href="/dashboard"><Users size={17} /> Suppliers</a>
          <a className="dashboard-nav__item" href="/dashboard"><ShieldCheck size={17} /> Proofs</a>
          <a className="dashboard-nav__item" href="/dashboard"><ScanLine size={17} /> Activity</a>
        </nav>
        <div className="dashboard-rail__bottom"><a className="dashboard-nav__item" href="/dashboard"><Settings2 size={17} /> Settings</a><div className="dashboard-rail__account"><span className="account-avatar">AV</span><span><strong>Avery Vale</strong><small>Northstar Studio</small></span><MoreHorizontal size={16} /></div></div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header"><button className="dashboard-menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open dashboard menu"><Menu size={21} /></button><div className="dashboard-header__context"><span className="mono-label">WORKSPACE / NORTHSTAR</span><span className="dashboard-network"><span /> Midnight preview</span></div><div className="dashboard-header__actions"><button type="button" aria-label="Help"><CircleHelp size={18} /></button><button type="button" aria-label="Notifications"><Bell size={18} /><i /></button><span className="header-avatar">AV</span></div></header>

        <div className="dashboard-inner">
          <div className="dashboard-banner"><div><span className="mono-label">PRODUCT PREVIEW</span><p>This is a preview of the Bidveil workspace. Tender actions will become available as the private procurement layer is connected.</p></div><a href="/" className="text-link text-link--light">Back to Bidveil <ArrowUpRight size={15} /></a></div>
          <div className="dashboard-heading"><div><span className="mono-label">FRIDAY, 14 NOVEMBER 2026</span><h1>Good morning, Avery.</h1><p>Here is the state of your procurement workspace.</p></div><button className="button button--primary"><Plus size={16} /> Create a tender</button></div>

          <div className="role-switcher" role="tablist" aria-label="Workspace role preview"><span>VIEW AS</span><button className={role === "buyer" ? "role-switcher__active" : ""} onClick={() => setRole("buyer")} role="tab" aria-selected={role === "buyer"}>Buyer</button><button className={role === "supplier" ? "role-switcher__active" : ""} onClick={() => setRole("supplier")} role="tab" aria-selected={role === "supplier"}>Supplier</button></div>

          {role === "buyer" ? <>
            <div className="metric-strip"><div><span>ACTIVE TENDERS</span><strong>04</strong><small><span className="status-dot status-dot--green" /> +1 this week</small></div><div><span>SEALED BIDS</span><strong>12</strong><small>Across 3 tenders</small></div><div><span>VERIFIED SUPPLIERS</span><strong>18</strong><small><span className="status-dot status-dot--violet" /> Proofs current</small></div><div><span>REVEALS THIS WEEK</span><strong>02</strong><small><span className="status-dot status-dot--amber" /> 1 awaiting review</small></div></div>
            <div className="dashboard-grid"><section className="workspace-panel workspace-panel--wide"><div className="workspace-panel__heading"><div><span className="mono-label">PROCUREMENT PIPELINE</span><h2>Active tenders</h2></div><button className="panel-link">View all <ArrowUpRight size={14} /></button></div><div className="tender-table"><div className="tender-table__head"><span>TENDER</span><span>STATUS</span><span>BIDS</span><span>DEADLINE</span><span /></div>{tenders.map((tender) => <div className="tender-table__row" key={tender.id}><span><strong>{tender.name}</strong><small>{tender.id}</small></span><span className="tender-status"><i className={`status-dot status-dot--${tender.statusClass}`} /> {tender.status}</span><span>{tender.bids}</span><span>{tender.deadline}</span><button aria-label={`Open ${tender.name}`}><ArrowUpRight size={15} /></button></div>)}</div></section><section className="workspace-panel"><div className="workspace-panel__heading"><div><span className="mono-label">INTEGRITY LOG</span><h2>Recent activity</h2></div><button className="panel-icon" aria-label="Activity options"><MoreHorizontal size={17} /></button></div><div className="activity-list"><div><span className="activity-icon activity-icon--violet"><ShieldCheck size={15} /></span><p><strong>Eligibility proof verified</strong><small>Office fit-out / BV—2041 <em>18 min ago</em></small></p></div><div><span className="activity-icon activity-icon--blue"><LockKeyhole size={15} /></span><p><strong>Sealed bid received</strong><small>Security review / BV—2037 <em>1 hr ago</em></small></p></div><div><span className="activity-icon activity-icon--amber"><ScanLine size={15} /></span><p><strong>Reveal window opened</strong><small>Network procurement <em>3 hrs ago</em></small></p></div></div></section></div>
          </> : <div className="supplier-preview"><div className="supplier-preview__intro"><span className="mono-label">SUPPLIER WORKSPACE</span><h2>Your invitations, kept in one private place.</h2><p>Review the brief, prove eligibility, and submit a sealed bid without exposing your commercial position to other suppliers.</p><button className="button button--primary">View invitations <ArrowUpRight size={16} /></button></div><div className="supplier-preview__list"><div><span className="status-pill status-pill--violet"><span /> INVITED</span><strong>Office fit-out</strong><small>Closes in 2d 14h</small></div><div><span className="status-pill status-pill--sealed"><span /> SEALED</span><strong>Security review</strong><small>Submitted today at 09:42</small></div><div><span className="status-pill status-pill--verified"><span /> VERIFIED</span><strong>Supplier profile</strong><small>All current credentials</small></div></div></div>}
        </div>
      </section>
    </main>
  );
}
