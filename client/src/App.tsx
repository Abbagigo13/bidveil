import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BidveilProvider } from "./contexts/BidveilContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateTender from "./pages/CreateTender";
import TenderDetails from "./pages/TenderDetails";
import SupplierBid from "./pages/SupplierBid";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/dashboard/tenders/new" component={CreateTender} />
    <Route path="/dashboard/tenders/:id" component={TenderDetails} />
    <Route path="/dashboard/invitations/:id" component={SupplierBid} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><BidveilProvider><Router /></BidveilProvider></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
