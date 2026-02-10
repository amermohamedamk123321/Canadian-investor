import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Providers
import { AdminAuthProvider } from "./context/AdminAuthContext";

// Pages - Public
import Index from "./pages/Index";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Opportunities from "./pages/Opportunities";
import OpportunityDetail from "./pages/OpportunityDetail";
import InternationalInvestors from "./pages/InternationalInvestors";
import InvestorsCanadian from "./pages/InvestorsCanadian";
import Services from "./pages/Services";
import Network from "./pages/Network";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Pages - Admin
import { AdminLoginPage } from "./pages/admin/Login";
import { AdminDashboardPage } from "./pages/admin/Dashboard";
import { AdminOpportunitiesPage } from "./pages/admin/Opportunities";
import { AdminSubmissionsPage } from "./pages/admin/Submissions";
import { AdminSEOPage } from "./pages/admin/SEO";
import { AdminUsersPage } from "./pages/admin/Users";
import { AdminActivityLogPage } from "./pages/admin/ActivityLog";
import { AdminCanadianInvestorsPage } from "./pages/admin/CanadianInvestors";
import { AdminInternationalInvestorsPage } from "./pages/admin/InternationalInvestors";
import { AdminServicesPage } from "./pages/admin/Services";
import { AdminPagesPage } from "./pages/admin/Pages";
import { AdminSecurityPDFPage } from "./pages/admin/SecurityPDF";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/opportunities/:slug" element={<OpportunityDetail />} />
              <Route path="/canadian-investors" element={<InvestorsCanadian />} />
              <Route path="/international-investors" element={<InternationalInvestors />} />
              <Route path="/services" element={<Services />} />
              <Route path="/network" element={<Network />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Privacy />} />
              <Route path="/accessibility" element={<Privacy />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/pages"
                element={
                  <ProtectedRoute>
                    <AdminPagesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/opportunities"
                element={
                  <ProtectedRoute>
                    <AdminOpportunitiesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/submissions"
                element={
                  <ProtectedRoute>
                    <AdminSubmissionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/seo"
                element={
                  <ProtectedRoute>
                    <AdminSEOPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <AdminUsersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/activity"
                element={
                  <ProtectedRoute>
                    <AdminActivityLogPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/canadian-investors"
                element={
                  <ProtectedRoute>
                    <AdminCanadianInvestorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/international-investors"
                element={
                  <ProtectedRoute>
                    <AdminInternationalInvestorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute>
                    <AdminServicesPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
