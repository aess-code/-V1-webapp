import { Twitter, Send, MessageSquare } from "lucide-react";
import { brand } from "@/config/brand";
import { useLocation } from "wouter";

/**
 * Footer Component
 * Links: X (Twitter), Telegram, Roadmap, Privacy, Terms
 */
export default function Footer() {
  const [, navigate] = useLocation();

  return (
    <footer className="bg-background border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src={brand.logo} alt={brand.name} className="w-8 h-8" />
              <h3 className="text-lg font-bold text-foreground">{brand.shortName}</h3>
            </div>
            <p className="text-foreground/60 text-sm max-w-xs">
              Decentralized opinion market protocol. Express your view on any outcome.
            </p>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Protocol</h4>
            <div className="space-y-2">
              <a href={brand.links.docsIndex} target="_blank" rel="noopener noreferrer"
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href={brand.links.docsApi} target="_blank" rel="noopener noreferrer"
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                Developer API
              </a>
              <a href={brand.links.github} target="_blank" rel="noopener noreferrer"
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                GitHub
              </a>
              <button onClick={() => navigate("/roadmap")}
                className="block text-sm text-foreground/60 hover:text-foreground transition-colors text-left">
                Roadmap
              </button>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Community</h4>
            <div className="space-y-2">
              <a href={brand.links.x} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                <Twitter className="w-4 h-4" />
                X (Twitter)
              </a>
              <a href={brand.links.telegram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                <Send className="w-4 h-4" />
                Telegram
              </a>
              <a href={brand.links.discord} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                <MessageSquare className="w-4 h-4" />
                Discord
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} Pulse Protocol. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
