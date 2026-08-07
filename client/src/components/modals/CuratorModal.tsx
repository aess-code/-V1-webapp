import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CuratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CuratorModal({ isOpen, onClose }: CuratorModalProps) {
  const applicationUrl = "https://tally.so/r/J9rgX7";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="relative p-6 sm:p-8 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Pioneer Curator Program</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                Decentralized Opinion Community: Empowerment of Honor and Governance
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Vision */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Program Vision
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This program aims to recruit and empower Pioneer Curators as deep insight contributors and protocol co-builders. In a decentralized world, reputation, influence, and governance voice are the core drivers of consensus.
                </p>
              </section>

              {/* Roles */}
              <section className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Core Responsibilities
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• Initiate forward-looking, high-quality topics</li>
                    <li>• Curate and guide constructive community discussions</li>
                    <li>• Provide suggestions for protocol iteration</li>
                    <li>• Expand community influence in the Web3 ecosystem</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Core Incentives
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• Exclusive Frontend Badge (Pioneer Badge)</li>
                    <li>• Priority exposure for curated topics on homepage</li>
                    <li>• Algorithmic weighting support</li>
                    <li>• Deep involvement in protocol governance</li>
                  </ul>
                </div>
              </section>

              {/* Process */}
              <section className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Recruitment Process</h3>
                <div className="flex justify-between items-start gap-2">
                  {[
                    { step: "1", label: "Apply" },
                    { step: "2", label: "Review" },
                    { step: "3", label: "Contribute" },
                    { step: "4", label: "Appoint" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-2 flex-1">
                      <div className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 sm:p-8 border-t border-border bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-foreground">Ready to build decentralized consensus?</p>
                <p className="text-xs text-muted-foreground">Apply to become a Pioneer Curator and start your journey</p>
              </div>
              <Button 
                onClick={() => window.open(applicationUrl, "_blank")}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl font-bold flex items-center gap-2 group"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
