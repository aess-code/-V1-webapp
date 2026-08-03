/**
 * DApp Header
 *
 * Navigation header for the DApp section (/app/*).
 * Includes wallet connection via RainbowKit ConnectButton.
 */

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocation } from "wouter";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { Home, Compass, Plus, User } from "lucide-react";

export default function DAppHeader() {
  const [location, navigate] = useLocation();

  const navItems = [
    { path: "/app", label: "Home", icon: Home },
    { path: "/app/explore", label: "Discover", icon: Compass },
    { path: "/app/create", label: "Create", icon: Plus },
    { path: "/app/portfolio", label: "Portfolio", icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Pulse Protocol"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="hidden sm:inline text-base font-semibold text-foreground">
            {brand.name}
          </span>
        </button>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Wallet Connect */}
        <div className="flex items-center gap-3">
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus="avatar"
          />
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-border bg-background/95 px-4 py-2 flex justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 p-2 rounded-md text-xs transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
