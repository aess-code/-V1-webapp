import { Github, Twitter, MessageCircle, FileText } from "lucide-react";

/**
 * Footer Component
 *
 * Links to GitHub, Documentation, X (Twitter), Discord, Privacy, Terms
 */

export default function Footer() {
  const links = [
    { label: "GitHub", icon: Github, href: "#" },
    { label: "Documentation", icon: FileText, href: "#" },
    { label: "X (Twitter)", icon: Twitter, href: "#" },
    { label: "Discord", icon: MessageCircle, href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Pulse</h3>
            <p className="text-foreground/60 text-sm">
              Decentralized prediction protocol
            </p>
          </div>

          {/* Links */}
          {links.map(link => {
            const Icon = link.icon;
            return (
              <div key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm">
            © 2024 Pulse Protocol. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
