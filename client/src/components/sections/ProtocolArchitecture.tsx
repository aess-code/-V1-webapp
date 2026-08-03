import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * Protocol Architecture Section
 *
 * Shows the protocol flow: Factory → Trading Engine → Price Engine → Vault → Settlement
 */

const architectureSteps = [
  {
    title: "Pulse Factory",
    description: "Create new markets with custom parameters",
  },
  {
    title: "Trading Engine",
    description: "Express opinions with automated market making",
  },
  {
    title: "Price Engine",
    description: "Determine prices based on market dynamics",
  },
  {
    title: "Vault",
    description: "Secure collateral and liquidity management",
  },
  {
    title: "Settlement",
    description: "Finalize outcomes and distribute rewards",
  },
];

export default function ProtocolArchitecture() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Protocol Architecture
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              How Pulse Protocol works under the hood
            </p>
          </motion.div>

          {/* Architecture Flow */}
          <div className="space-y-6">
            {architectureSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                {/* Step Card */}
                <div className="flex-1 p-6 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60">{step.description}</p>
                </div>

                {/* Arrow */}
                {index < architectureSteps.length - 1 && (
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hidden md:flex flex-col items-center"
                  >
                    <ArrowDown className="w-6 h-6 text-purple-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
