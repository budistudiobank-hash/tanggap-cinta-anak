import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import Index from "./pages/Index";
import PregnancyDetection from "./pages/PregnancyDetection";
import ChildDetection from "./pages/ChildDetection";
import IdealWeight from "./pages/IdealWeight";
import NutritionDoctor from "./pages/NutritionDoctor";
import GrowthHistory from "./pages/GrowthHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pregnancy" element={<PregnancyDetection />} />
            <Route path="/child" element={<ChildDetection />} />
            <Route path="/history" element={<GrowthHistory />} />
            <Route path="/weight" element={<IdealWeight />} />
            <Route path="/nutrition" element={<NutritionDoctor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
