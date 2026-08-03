/**
 * Full Roadmap Page — /roadmap
 * Content sourced from official Pulse Protocol Roadmap document.
 */
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle, Clock, Circle, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const phases = [
  {
    quarter: "2026 Q4",
    title: "Public Launch & Ecosystem Foundation",
    status: "current",
    description: "Following the successful launch of Pulse Protocol V1, our focus shifts from protocol development to ecosystem growth—bringing together users, developers, creators, and strategic partners.",
    sections: [
      {
        title: "Product",
        items: [
          "Public Mainnet Launch",
          "Open access for global users",
          "Continuous product and UX optimization",
          "Rapid iteration driven by community feedback",
          "Enhanced market creation and trading experience",
        ],
      },
      {
        title: "Developer Ecosystem",
        items: [
          "Release Pulse SDK",
          "Public API",
          "Developer Documentation",
          "Market Embedding SDK",
          "Support for third-party integrations",
        ],
      },
      {
        title: "Ecosystem",
        items: [
          "Establish strategic ecosystem partnerships",
          "Wallet integrations",
          "Analytics platform integrations",
          "Web3 infrastructure integrations",
          "Expand protocol collaborations",
        ],
      },
      {
        title: "Community",
        items: [
          "Pulse Pioneer Program",
          "Ambassador Program",
          "Global community expansion",
          "Creator support initiatives",
          "Early contributor recognition",
        ],
      },
    ],
  },
  {
    quarter: "2027 Q1",
    title: "Base Ecosystem Expansion",
    status: "planned",
    description: "Pulse evolves from a single application into an open protocol, beginning its multi-chain journey with Base.",
    sections: [
      {
        title: "Network Expansion",
        items: [
          "Deploy on Base",
          "Native Base ecosystem integrations",
          "Optimized low-cost user experience",
          "Support for Base-native wallets",
        ],
      },
      {
        title: "Developer Platform",
        items: [
          "Expanded API capabilities",
          "Continuous SDK improvements",
          "Developer tools",
          "Market Embedding",
          "Support for third-party frontends",
        ],
      },
      {
        title: "Strategic Partnerships",
        items: [
          "DAO collaborations",
          "Research platform partnerships",
          "Web3 community collaborations",
          "Creator partnerships",
          "Infrastructure partnerships",
        ],
      },
      {
        title: "Product Evolution",
        items: [
          "More market categories",
          "Advanced analytics",
          "Enhanced portfolio management",
          "Improved application performance",
        ],
      },
    ],
  },
  {
    quarter: "2027 Q2",
    title: "Sustainable Protocol Economy",
    status: "planned",
    description: "Building a sustainable protocol economy that aligns long-term protocol growth with community participation.",
    note: "Any future token model will only be explored if it strengthens protocol ownership, ecosystem participation, and long-term sustainability—not for short-term speculation.",
    sections: [
      {
        title: "Protocol Economy",
        items: [
          "Explore sustainable incentive mechanisms",
          "Governance framework research",
          "Treasury strategy optimization",
          "Ecosystem funding initiatives",
          "Community incentive programs",
        ],
      },
      {
        title: "Developer Ecosystem",
        items: [
          "Builder Grants",
          "Developer Incentive Program",
          "Community Builder initiatives",
          "Research Grants",
        ],
      },
      {
        title: "Strategic Growth",
        items: [
          "Institutional partnerships",
          "Data ecosystem expansion",
          "Infrastructure collaborations",
          "Global ecosystem partners",
        ],
      },
    ],
  },
  {
    quarter: "2027 Q3",
    title: "Multi-chain Expansion",
    status: "future",
    description: "Pulse expands into a multi-chain infrastructure for decentralized opinion markets.",
    sections: [
      {
        title: "Network Expansion",
        items: [
          "Deploy on Arbitrum",
          "Deploy on Ethereum",
          "Support additional EVM-compatible networks",
          "Evaluate future blockchain ecosystems",
        ],
      },
      {
        title: "Multi-chain Infrastructure",
        items: [
          "Unified Identity",
          "Unified Portfolio",
          "Cross-chain Analytics",
          "Shared Liquidity Research",
          "Seamless multi-chain user experience",
        ],
      },
      {
        title: "Developer Platform",
        items: [
          "Multi-chain SDK",
          "Cross-chain API",
          "Multi-chain data services",
          "Open infrastructure",
        ],
      },
    ],
  },
  {
    quarter: "2027 Q4",
    title: "Open Protocol Network",
    status: "future",
    description: "Pulse evolves into an open protocol network where developers, communities, and organizations can build without permission.",
    sections: [
      {
        title: "Open Ecosystem",
        items: [
          "Third-party frontends",
          "AI-powered applications",
          "Analytics platforms",
          "Research platforms",
          "Wallet integrations",
          "Institutional tools",
        ],
      },
      {
        title: "Protocol Network",
        items: [
          "Public infrastructure",
          "Permissionless integrations",
          "Global ecosystem partnerships",
          "Community-driven innovation",
          "Open protocol standards",
        ],
      },
    ],
  },
  {
    quarter: "2028+",
    title: "Global Protocol Ecosystem",
    status: "future",
    description: "Pulse continues expanding as the foundational infrastructure for decentralized opinion markets.",
    sections: [
      {
        title: "Future Directions",
        items: [
          "Expand to additional blockchain ecosystems",
          "Deep integration with AI-powered applications",
          "Institutional-grade market infrastructure",
          "Global developer ecosystem",
          "Open governance evolution",
          "Sustainable protocol economy",
          "Worldwide ecosystem partnerships",
          "Become the global infrastructure standard for decentralized opinion markets",
        ],
      },
    ],
  },
];

const statusConfig = {
  current: { icon: CheckCircle, color: "text-green-400", border: "border-green-400", bg: "bg-green-500/5 border-green-500/20", badge: "bg-green-500/20 text-green-400", label: "Current" },
  planned: { icon: Clock, color: "text-blue-400", border: "border-blue-400", bg: "bg-blue-500/5 border-blue-500/20", badge: "bg-blue-500/20 text-blue-400", label: "Planned" },
  future:  { icon: Circle, color: "text-muted-foreground", border: "border-border", bg: "bg-card border-border", badge: "bg-muted text-muted-foreground", label: "Future" },
};

export default function RoadmapPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <div className="py-16 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Pulse Roadmap
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Building the Infrastructure for Decentralized Opinion Markets
            </p>
          </div>
        </div>

        {/* Phases */}
        <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
          {phases.map((phase, index) => {
            const cfg = statusConfig[phase.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            return (
              <div key={index} className={`rounded-2xl border p-6 md:p-8 ${cfg.bg}`}>
                {/* Phase Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full border-2 ${cfg.border} flex items-center justify-center flex-shrink-0 bg-background`}>
                    <Icon className={`w-5 h-5 ${cfg.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">{phase.quarter}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.badge}`}>{cfg.label}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">{phase.title}</h2>
                    <p className="text-foreground/60 text-sm mt-2">{phase.description}</p>
                    {phase.note && (
                      <div className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-xs text-yellow-400 italic">{phase.note}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sections Grid */}
                <div className="grid sm:grid-cols-2 gap-4 ml-16">
                  {phase.sections.map((section, si) => (
                    <div key={si} className="bg-background/50 rounded-xl p-4 border border-border/50">
                      <h3 className="text-sm font-semibold text-foreground mb-3">{section.title}</h3>
                      <ul className="space-y-1.5">
                        {section.items.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-2 text-xs text-foreground/60">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${phase.status === 'current' ? 'bg-green-400' : phase.status === 'planned' ? 'bg-blue-400' : 'bg-muted-foreground'}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Long-term Vision */}
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Long-term Vision</h2>
            <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-6">
              Pulse is building the infrastructure for decentralized opinion markets. Our mission is not to build a single application, but to create an open, composable, and permissionless protocol that enables anyone—including individuals, developers, DAOs, researchers, institutions, and AI agents—to create, analyze, participate in, and integrate market-driven intelligence.
            </p>
            <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-8">
              As the ecosystem grows, Pulse aims to become the foundational layer powering the next generation of decentralized information discovery across Web3.
            </p>
            <p className="text-xl font-bold text-foreground tracking-widest">
              VIEW. ANALYZE. STAKE. BELIEVE.
            </p>
          </div>

          <div className="text-center">
            <Button onClick={() => navigate("/app")} className="bg-gradient-to-r from-primary-light to-primary-dark hover:opacity-90 text-white px-8">
              Enter App
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
