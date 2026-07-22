import { motion } from "framer-motion";

/**
 * Protocol Overview Section
 * 
 * Introduces what Pulse Protocol is and why it exists
 */

export default function ProtocolOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              What is Pulse Protocol?
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A decentralized infrastructure for creating and trading on any outcome
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  The Problem
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Prediction markets are fragmented and centralized. Creators have limited
                  control, traders face high fees, and the ecosystem lacks composability.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  The Solution
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Pulse is a permissionless protocol where anyone can create markets on any
                  outcome. Fully on-chain, transparent, and composable with the entire DeFi
                  ecosystem.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Why Decentralized Views Matter
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Decentralized prediction markets enable collective intelligence. They
                  aggregate information from thousands of participants, creating the most
                  accurate price discovery mechanism.
                </p>
              </div>
            </motion.div>

            {/* Right: Visual Diagram */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20 p-8 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-foreground/60">
                  Visual diagram coming soon
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
