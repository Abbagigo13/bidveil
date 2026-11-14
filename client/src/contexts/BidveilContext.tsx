import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type TenderStatus = "draft" | "collecting" | "review" | "awarded";
export type BidStatus = "sealed" | "revealed" | "winner" | "not-selected";

export type Bid = {
  id: string;
  supplier: string;
  amount: number;
  summary: string;
  submittedAt: string;
  status: BidStatus;
  proofStatus: "verified" | "pending";
};

export type Tender = {
  id: string;
  name: string;
  description: string;
  category: string;
  deadline: string;
  bidRule: string;
  revealPolicy: string;
  requirements: string[];
  status: TenderStatus;
  bids: Bid[];
  createdAt: string;
  winnerId?: string;
};

type Activity = { id: string; title: string; detail: string; tone: "violet" | "blue" | "amber" | "green"; time: string };

type WorkspaceContextValue = {
  role: "buyer" | "supplier";
  setRole: (role: "buyer" | "supplier") => void;
  tenders: Tender[];
  activities: Activity[];
  createTender: (input: Omit<Tender, "id" | "status" | "bids" | "createdAt">) => Tender;
  submitBid: (tenderId: string, amount: number, summary: string) => void;
  openReveal: (tenderId: string) => void;
  revealBid: (tenderId: string, bidId: string) => void;
  awardTender: (tenderId: string, bidId: string) => void;
};

const initialTenders: Tender[] = [
  {
    id: "BV—2041",
    name: "Office fit-out",
    description: "A considered fit-out partner for Northstar Studio's new workspace.",
    category: "Facilities",
    deadline: "2d 14h",
    bidRule: "Lowest compliant bid",
    revealPolicy: "Winner and final price only",
    requirements: ["Registered business", "Three comparable projects", "Current public liability insurance"],
    status: "collecting",
    createdAt: "14 Nov 2026",
    bids: [
      { id: "BID—01", supplier: "Cedar & Co.", amount: 82000, summary: "Turnkey fit-out with a 10-week delivery plan.", submittedAt: "09:42", status: "sealed", proofStatus: "verified" },
      { id: "BID—02", supplier: "Arc Workshop", amount: 87500, summary: "Low-disruption delivery with phased occupation.", submittedAt: "10:18", status: "sealed", proofStatus: "verified" },
    ],
  },
  {
    id: "BV—2037",
    name: "Security review",
    description: "Independent review of the customer data environment.",
    category: "Technology",
    deadline: "Today",
    bidRule: "Weighted quality and price",
    revealPolicy: "Top three bids for committee review",
    requirements: ["SOC 2 experience", "Independent reviewer", "No conflict of interest"],
    status: "review",
    createdAt: "11 Nov 2026",
    bids: [
      { id: "BID—11", supplier: "Quiet Signal", amount: 24000, summary: "Four-week review with executive readout.", submittedAt: "08:12", status: "revealed", proofStatus: "verified" },
      { id: "BID—12", supplier: "Northline Audit", amount: 21800, summary: "Threat-led review with remediation workshop.", submittedAt: "08:35", status: "revealed", proofStatus: "verified" },
      { id: "BID—13", supplier: "Vera Systems", amount: 26500, summary: "Deep application and infrastructure assessment.", submittedAt: "09:03", status: "revealed", proofStatus: "verified" },
    ],
  },
  {
    id: "BV—2032",
    name: "Fleet renewal",
    description: "A sustainable vehicle partner for a growing field team.",
    category: "Operations",
    deadline: "28 Nov",
    bidRule: "Best value",
    revealPolicy: "Winner only",
    requirements: ["Local service coverage", "EV maintenance capability"],
    status: "draft",
    createdAt: "12 Nov 2026",
    bids: [],
  },
];

const initialActivities: Activity[] = [
  { id: "a1", title: "Eligibility proof verified", detail: "Office fit-out / BV—2041", tone: "violet", time: "18 min ago" },
  { id: "a2", title: "Sealed bid received", detail: "Security review / BV—2037", tone: "blue", time: "1 hr ago" },
  { id: "a3", title: "Reveal window opened", detail: "Security review / BV—2037", tone: "amber", time: "3 hrs ago" },
];

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function BidveilProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<"buyer" | "supplier">("buyer");
  const [tenders, setTenders] = useState<Tender[]>(initialTenders);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addActivity = (title: string, detail: string, tone: Activity["tone"]) => {
    setActivities((current) => [{ id: `${Date.now()}`, title, detail, tone, time: "Just now" }, ...current]);
  };

  const value = useMemo<WorkspaceContextValue>(() => ({
    role,
    setRole,
    tenders,
    activities,
    createTender: (input) => {
      const tender: Tender = { ...input, id: `BV—${2044 + tenders.length}`, status: "collecting", bids: [], createdAt: "14 Nov 2026" };
      setTenders((current) => [tender, ...current]);
      addActivity("Tender published", `${tender.name} / ${tender.id}`, "blue");
      return tender;
    },
    submitBid: (tenderId, amount, summary) => {
      setTenders((current) => current.map((tender) => tender.id !== tenderId ? tender : {
        ...tender,
        bids: [...tender.bids, { id: `BID—${String(tender.bids.length + 1).padStart(2, "0")}`, supplier: "Your company", amount, summary, submittedAt: "10:21", status: "sealed", proofStatus: "verified" }],
      }));
      addActivity("Sealed bid submitted", `${tenderId} / Your company`, "blue");
    },
    openReveal: (tenderId) => {
      setTenders((current) => current.map((tender) => tender.id === tenderId ? { ...tender, status: "review" } : tender));
      addActivity("Reveal window opened", tenderId, "amber");
    },
    revealBid: (tenderId, bidId) => {
      setTenders((current) => current.map((tender) => tender.id !== tenderId ? tender : { ...tender, bids: tender.bids.map((bid) => bid.id === bidId ? { ...bid, status: "revealed" } : bid) }));
      addActivity("Bid selectively revealed", `${tenderId} / ${bidId}`, "amber");
    },
    awardTender: (tenderId, bidId) => {
      setTenders((current) => current.map((tender) => tender.id !== tenderId ? tender : { ...tender, status: "awarded", winnerId: bidId, bids: tender.bids.map((bid) => ({ ...bid, status: bid.id === bidId ? "winner" : "not-selected" })) }));
      addActivity("Tender awarded", `${tenderId} / ${bidId}`, "green");
    },
  }), [activities, role, tenders]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useBidveilWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("useBidveilWorkspace must be used inside BidveilProvider");
  return value;
}
