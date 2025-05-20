
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import Index from "./pages/Index";
import AnimeList from "./pages/AnimeList";
import AnimeDetail from "./pages/AnimeDetail";
import CategoryPage from "./pages/CategoryPage";
import ClubsPage from "./pages/ClubsPage";
import CalendarPage from "./pages/CalendarPage";
import ResourcesPage from "./pages/ResourcesPage";
import WatchlistPage from "./pages/WatchlistPage";
import GenrePage from "./pages/GenrePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WatchlistProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/anime-list" element={<AnimeList />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/genre/:genre" element={<GenrePage />} />
            <Route path="/genres" element={<AnimeList />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WatchlistProvider>
  </QueryClientProvider>
);

export default App;
