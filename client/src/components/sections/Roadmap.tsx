import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle, Clock, Circle } from "lucide-react";

/**
 * Roadmap Section — Compact timeline on Landing Page.
 * Full roadmap available at /roadmap.
 */
const milestones = [
  {
    quarter: "2026 Q4",
    title: "Public Launch & Ecosystem Foundation",
    summary: "Mainnet launch, SDK release, developer ecosystem, Pulse Pioneer Program.",
    status: "current",
  },
  {
    quarter: "2027 Q1",
    title: "Base Ecosystem Expansion",
    summary: "Deploy on Base, expanded API, DAO collaborations, third-party frontends.",
    status: "planned",
  },
  {
    quarter: "2027 Q2",
    title: "Sustainable Protocol Economy",
    summary: "Governance framework, builder grants, institutional partnerships.",
    status: "planned",
  },
  {
    quarter: "2027 Q3+",
    title: "Multi-chain Expansion",
    summary: "Arbitrum, Ethereum mainnet, unified identity, cross-chain analytics.",
    status: "future",
  },
];

const statusConfig = {
  current: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-400", label: "Current" },
  planned: { icon: Clock, color: "text-blue-400", bg: "bg-blue-400", label: "Planned" },
  future:  { icon: Circle, color: "text-muted-foreground", bg: "bg-muted-foreground", label: "Future" },
};

export default function Roadmap() {
  const [, navigate] = useLocation();

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Roadmap
            </h2>
            <p className="text-lg text-foreground/60">Building the infrastructure for decentralized opinion markets</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

            <div className="space-y-6">
              {milestones.map((item, index) => {
                const cfg = statusConfig[item.status as keyof typeof statusConfig];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 bg-background ${item.status === 'current' ? 'border-green-400' : item.status === 'planned' ? 'border-blue-400' : 'border-border'}`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                    {/* Content */}
                    <div className={`flex-1 rounded-xl p-5 border transition-all ${item.status === 'current' ? 'bg-green-500/5 border-green-500/20' : item.status === 'planned' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-card border-border'}`}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{item.quarter}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'current' ? 'bg-green-500/20 text-green-400' : item.status === 'planned' ? 'bg-blue-500/20 text-blue-400' : 'bg-muted text-muted-foreground'}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-foreground/60">{item.summary}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/roadmap")}
            >
              View Full Roadmap
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
