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
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">先锋策展人计划</h2>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                去中心化观点社区：荣誉与话语权的赋能
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Vision */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  计划愿景
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  本计划旨在招募和赋能一批先锋策展人 (Pioneer Curators)，他们是社区的深度见解贡献者和协议的共建者。在去中心化的世界里，声誉、影响力以及对协议发展的话语权是核心驱动力。
                </p>
              </section>

              {/* Roles */}
              <section className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    核心职责
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• 发起前瞻性、深度的优质议题</li>
                    <li>• 策展并引导建设性的社区讨论</li>
                    <li>• 为协议迭代提供建设性意见</li>
                    <li>• 扩大社区在 Web3 生态的影响力</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    核心激励
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li>• 专属前端徽章 (Pioneer Badge)</li>
                    <li>• 议题首页优先曝光权</li>
                    <li>• 平台算法加权支持</li>
                    <li>• 深度参与协议治理决策</li>
                  </ul>
                </div>
              </section>

              {/* Process */}
              <section className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">招募流程</h3>
                <div className="flex justify-between items-start gap-2">
                  {[
                    { step: "1", label: "提交申请" },
                    { step: "2", label: "简要评审" },
                    { step: "3", label: "贡献考核" },
                    { step: "4", label: "正式授予" }
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
                <p className="text-sm font-medium text-foreground">准备好共建去中心化共识了吗？</p>
                <p className="text-xs text-muted-foreground">申请成为先锋策展人，开启荣誉之旅</p>
              </div>
              <Button 
                onClick={() => window.open(applicationUrl, "_blank")}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl font-bold flex items-center gap-2 group"
              >
                立即申请
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
