import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { brand } from "@/config/brand";

/**
 * Header Component
 *
 * Navigation header with logo and CTA buttons
 */

export default function Header() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - Brand Design System */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
          aria-label="Pulse Protocol - Go to home page"
        >
          {/* Official Logo Image */}
          <img
            src={brand.logo}
            alt={brand.name}
            width={40}
            height={40}
            className="w-10 h-10"
            style={{ aspectRatio: "1 / 1" }}
          />
          {/* Brand Name - Desktop Only */}
          <span className="hidden sm:inline text-lg font-semibold text-foreground">
            {brand.name}
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8">
            <a
              href="#overview"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Protocol
            </a>
            <a
              href="#features"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#developers"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Developers
            </a>
          </nav>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/app")}
            >
              Enter App
            </Button>
            <Button className="bg-gradient-to-r from-primary-light to-primary-dark hover:opacity-90 text-white">
              Docs
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-4">
          <a
            href="#overview"
            className="block text-foreground/70 hover:text-foreground transition-colors"
          >
            Protocol
          </a>
          <a
            href="#features"
            className="block text-foreground/70 hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#developers"
            className="block text-foreground/70 hover:text-foreground transition-colors"
          >
            Developers
          </a>
          <div className="flex flex-col gap-3 pt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate("/app");
                setMobileMenuOpen(false);
              }}
            >
              Enter App
            </Button>
            <Button className="w-full bg-gradient-to-r from-primary-light to-primary-dark hover:opacity-90 text-white">
              Docs
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
