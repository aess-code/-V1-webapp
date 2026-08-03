import { motion } from "framer-motion";

/**
 * Protocol Overview Section
 * Introduces what Pulse Protocol is and why it exists.
 * Visual placeholder removed — content centered.
 */
export default function ProtocolOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="overview" className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              What is Pulse Protocol?
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A decentralized infrastructure for creating and participating in opinion markets on any outcome
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">The Problem</h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                Opinion markets are fragmented and centralized. Creators have limited control, participants face high fees, and the ecosystem lacks composability.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">The Solution</h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                Pulse is a permissionless protocol where anyone can create a View on any outcome. Fully on-chain, transparent, and composable with the entire DeFi ecosystem.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Why Views Matter</h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                Decentralized opinion markets enable collective intelligence. They aggregate information from participants, creating accurate price discovery for any outcome.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
