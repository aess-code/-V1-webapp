/**
 * Pulse Protocol V1 — App Root
 *
 * Providers:
 * - WagmiProvider (wagmi v3 + Sepolia)
 * - QueryClientProvider (@tanstack/react-query)
 * - RainbowKitProvider (wallet connect UI)
 * - ThemeProvider
 *
 * Routes:
 * - / → Landing/Home (preserved)
 * - /app → DApp (Discover, ViewDetail, CreateView)
 */

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiConfig } from "@/config/wagmi";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DiscoverPage from "./pages/Discover";
import ViewDetailPage from "./pages/ViewDetail";
import CreateViewPage from "./pages/CreateView";
import DAppHomePage from "./pages/DAppHome";

// Lazy placeholder pages (not yet implemented)
const Portfolio = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <p className="text-muted-foreground">Portfolio — Coming Soon</p>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 10_000,
    },
  },
});

function Router() {
  return (
    <Switch>
      {/* Protocol Landing */}
      <Route path="/" component={Home} />

      {/* DApp Routes */}
      <Route path="/app" component={DAppHomePage} />
      <Route path="/app/explore" component={DiscoverPage} />
      <Route path="/app/view/:id" component={ViewDetailPage} />
      <Route path="/app/create" component={CreateViewPage} />
      <Route path="/app/portfolio" component={Portfolio} />

      {/* Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "oklch(0.57 0.16 255)",
              accentColorForeground: "white",
              borderRadius: "medium",
            })}
          >
            <ThemeProvider defaultTheme="dark">
              <TooltipProvider>
                <Toaster />
                <Router />
              </TooltipProvider>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
}

export default App;
