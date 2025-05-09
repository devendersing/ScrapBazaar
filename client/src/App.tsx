import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import HomePage from "@/pages/HomePage";
import RatesPage from "@/pages/RatesPage";
import SchedulePickupPage from "@/pages/SchedulePickupPage";
import AboutPage from "@/pages/AboutPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";

function Router() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/rates" component={RatesPage} />
        <Route path="/schedule-pickup" component={SchedulePickupPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/admin" component={AdminLoginPage} />
        <Route path="/admin/dashboard" component={AdminDashboardPage} />
        <Route component={NotFound} />
      </Switch>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
