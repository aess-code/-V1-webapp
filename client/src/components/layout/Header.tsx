import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu, X, ChevronDown, BookOpen, Code2, FileText, Github, Send, Twitter, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { brand } from "@/config/brand";

/**
 * Header Component — Landing Page
 * Docs dropdown with documentation links, GitHub, Roadmap, X, Telegram.
 */

const docsItems = [
  { label: "Documentation", description: "Full protocol docs index", icon: BookOpen, href: brand.links.docsIndex },
  { label: "Developer API", description: "Contract interfaces & integration guide", icon: Code2, href: brand.links.docsApi },
  { label: "Protocol Constitution", description: "Core rules & security principles", icon: FileText, href: brand.links.docsConstitution },
  { label: "GitHub", description: "Protocol source code (Solidity)", icon: Github, href: brand.links.github },
];

const communityItems = [
  { label: "X (Twitter)", icon: Twitter, href: brand.links.x },
  { label: "Telegram", icon: Send, href: brand.links.telegram },
  { label: "Discord", icon: MessageSquare, href: brand.links.discord },
];

function DocsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors text-sm"
      >
        Docs
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-3 py-1.5 font-medium uppercase tracking-wider">Documentation</p>
            {docsItems.map(item => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="border-t border-border mx-2" />
          <div className="p-2">
            <button onClick={() => { navigate("/roadmap"); setOpen(false); }}
              className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors w-full text-left">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Roadmap</p>
                <p className="text-xs text-muted-foreground">Protocol development timeline</p>
              </div>
            </button>
          </div>
          <div className="border-t border-border mx-2" />
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-3 py-1.5 font-medium uppercase tracking-wider">Community</p>
            <div className="flex gap-2 px-3 pb-2">
              {communityItems.map(item => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-xs text-foreground/70 hover:text-foreground">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
          aria-label="Pulse Protocol - Go to home page">
          <img src={brand.logo} alt={brand.name} width={40} height={40} className="w-10 h-10" style={{ aspectRatio: "1 / 1" }} />
          <span className="hidden sm:inline text-lg font-semibold text-foreground">{brand.name}</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <a href="#overview" className="text-foreground/70 hover:text-foreground transition-colors text-sm">Protocol</a>
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors text-sm">Features</a>
            <a href="#developers" className="text-foreground/70 hover:text-foreground transition-colors text-sm">Developers</a>
            <DocsDropdown />
          </nav>
          <Button className="bg-gradient-to-r from-primary-light to-primary-dark hover:opacity-90 text-white" onClick={() => navigate("/app")}>
            Enter App
          </Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3">
          <a href="#overview" className="block text-foreground/70 hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Protocol</a>
          <a href="#features" className="block text-foreground/70 hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#developers" className="block text-foreground/70 hover:text-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>Developers</a>
          <div className="border-t border-border pt-3 space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Documentation</p>
            {docsItems.map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="block text-sm text-foreground/70 hover:text-foreground transition-colors py-1.5" onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <button className="block text-sm text-foreground/70 hover:text-foreground transition-colors py-1.5 w-full text-left"
              onClick={() => { navigate("/roadmap"); setMobileMenuOpen(false); }}>
              Roadmap
            </button>
          </div>
          <div className="border-t border-border pt-3 space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Community</p>
            {communityItems.map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="block text-sm text-foreground/70 hover:text-foreground transition-colors py-1.5" onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <Button className="w-full bg-gradient-to-r from-primary-light to-primary-dark hover:opacity-90 text-white"
              onClick={() => { navigate("/app"); setMobileMenuOpen(false); }}>
              Enter App
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
