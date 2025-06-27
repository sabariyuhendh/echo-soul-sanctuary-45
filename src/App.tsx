
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vault from "./pages/Vault";
import Letters from "./pages/Letters";
import LetItGo from "./pages/LetItGo";
import Mood from "./pages/Mood";
import Whisper from "./pages/Whisper";
import Soulmate from "./pages/Soulmate";
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/letters" element={<Letters />} />
          <Route path="/letitgo" element={<LetItGo />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/whisper" element={<Whisper />} />
          <Route path="/soulmate" element={<Soulmate />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
