import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * Header Component
 * 
 * Navigation header with logo and CTA buttons
 */

export default function Header() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="text-xl font-bold text-foreground">Pulse</span>
        </div>

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
              className="border-purple-500/50 text-foreground"
              onClick={() => navigate("/app")}
            >
              Enter App
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            >
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
        <div className="md:hidden border-t border-purple-500/20 bg-background p-4 space-y-4">
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
              className="w-full border-purple-500/50 text-foreground"
              onClick={() => {
                navigate("/app");
                setMobileMenuOpen(false);
              }}
            >
              Enter App
            </Button>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              Docs
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
