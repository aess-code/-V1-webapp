import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// DApp pages
const DAppHome = () => <div>DApp Home - Coming Soon</div>;
const Explore = () => <div>Explore - Coming Soon</div>;
const ViewDetail = () => <div>View Detail - Coming Soon</div>;
const CreateView = () => <div>Create View - Coming Soon</div>;
const Portfolio = () => <div>Portfolio - Coming Soon</div>;
const Profile = () => <div>Profile - Coming Soon</div>;
const Leaderboard = () => <div>Leaderboard - Coming Soon</div>;
const Settings = () => <div>Settings - Coming Soon</div>;

function Router() {
  return (
    <Switch>
      {/* Protocol Website */}
      <Route path={"/"} component={Home} />

      {/* DApp Routes */}
      <Route path={"/app"} component={DAppHome} />
      <Route path={"/app/explore"} component={Explore} />
      <Route path={"/app/view/:id"} component={ViewDetail} />
      <Route path={"/app/create"} component={CreateView} />
      <Route path={"/app/portfolio"} component={Portfolio} />
      <Route path={"/app/profile"} component={Profile} />
      <Route path={"/app/leaderboard"} component={Leaderboard} />
      <Route path={"/app/settings"} component={Settings} />

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
