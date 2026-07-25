import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Lock, Zap, Users } from "lucide-react";

/**
 * Why Pulse Section
 *
 * Highlights three core features with hover animations
 */

const features = [
  {
    icon: Lock,
    title: "Permissionless",
    description:
      "Anyone can create a market on any outcome without approval or intermediaries.",
  },
  {
    icon: Zap,
    title: "Fully On-chain",
    description:
      "100% transparent and verifiable. All logic lives on the blockchain.",
  },
  {
    icon: Users,
    title: "Anyone Can Create",
    description:
      "Creators earn fees from their markets. No gatekeeping, pure meritocracy.",
  },
];

export default function WhyPulse() {
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
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />

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
              Why Pulse
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Three core principles that define the protocol
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-foreground/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
