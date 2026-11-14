import { useState, type ReactNode } from "react";
import { Bell, CircleHelp, FileText, Home, Menu, MoreHorizontal, ScanLine, Settings2, ShieldCheck, Users, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";

type DashboardLayoutProps = { children: ReactNode; active?: string };

export default function DashboardLayout({ children, active = "Overview" }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = [
    { label: "Overview", href: "/dashboard", icon: Home },
    { label: "Tenders", href: "/dashboard/tenders/new", icon: FileText },
    { label: "Suppliers", href: "/dashboard", icon: Users },
    { label: "Proofs", href: "/dashboard", icon: ShieldCheck },
    { label: "Activity", href: "/dashboard", icon: ScanLine },
  ];

  return <main className="dashboard-shell">
    <aside className={`dashboard-rail ${mobileOpen ? "dashboard-rail--open" : ""}`}>
      <div className="dashboard-rail__top"><BrandMark compact light /><button type="button" className="dashboard-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button></div>
      <nav className="dashboard-nav" aria-label="Dashboard navigation">{nav.map(({ label, href, icon: Icon }) => <a key={label} className={`dashboard-nav__item ${active === label ? "dashboard-nav__item--active" : ""}`} href={href}><Icon size={17} /> {label}{label === "Tenders" && <span>04</span>}</a>)}</nav>
      <div className="dashboard-rail__bottom"><a className="dashboard-nav__item" href="/dashboard"><Settings2 size={17} /> Settings</a><div className="dashboard-rail__account"><span className="account-avatar">AV</span><span><strong>Avery Vale</strong><small>Northstar Studio</small></span><MoreHorizontal size={16} /></div></div>
    </aside>
    <section className="dashboard-content">
      <header className="dashboard-header"><button className="dashboard-menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open dashboard menu"><Menu size={21} /></button><div className="dashboard-header__context"><span className="mono-label">WORKSPACE / NORTHSTAR</span><span className="dashboard-network"><span /> Midnight preview</span></div><div className="dashboard-header__actions"><button type="button" aria-label="Help"><CircleHelp size={18} /></button><button type="button" aria-label="Notifications"><Bell size={18} /><i /></button><span className="header-avatar">AV</span></div></header>
      {children}
    </section>
  </main>;
}
