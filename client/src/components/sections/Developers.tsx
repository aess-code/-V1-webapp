import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code2, Zap, Globe } from "lucide-react";

/**
 * Developers Section
 * 
 * Highlights SDK, API, and open ecosystem for builders
 */

const devFeatures = [
  {
    icon: Code2,
    title: "SDK",
    description: "Comprehensive TypeScript SDK for seamless integration",
  },
  {
    icon: Zap,
    title: "API",
    description: "RESTful and GraphQL APIs for all protocol operations",
  },
  {
    icon: Globe,
    title: "Open Ecosystem",
    description: "Build on Pulse. Anyone can create, anyone can build.",
  },
];

export default function Developers() {
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
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />

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
              For Developers
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Everything you need to build on Pulse
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {devFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-white" />
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

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              Builder Friendly
            </h3>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Pulse is designed for developers. With comprehensive documentation,
              example code, and an active community, building on Pulse is fast and fun.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
