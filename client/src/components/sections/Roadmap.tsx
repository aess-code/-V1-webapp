import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

/**
 * Roadmap Section
 * 
 * Shows protocol versions: V1, V2, V3 and beyond
 */

const roadmapItems = [
  {
    version: "V1",
    title: "Foundation",
    status: "Current",
    features: [
      "Core protocol launch",
      "Basic market creation",
      "AMM trading",
      "Viewstake DApp",
    ],
    color: "from-purple-500 to-blue-500",
  },
  {
    version: "V2",
    title: "Enhancement",
    status: "Planned",
    features: [
      "Advanced market types",
      "Cross-chain support",
      "Enhanced UX",
      "Developer tools",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    version: "V3",
    title: "Ecosystem",
    status: "Future",
    features: [
      "Composable markets",
      "Third-party integrations",
      "Advanced analytics",
      "DAO governance",
    ],
    color: "from-cyan-500 to-teal-500",
  },
];

export default function Roadmap() {
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
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />

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
              Roadmap
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              The future of Pulse Protocol
            </p>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="grid md:grid-cols-3 gap-8">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  {/* Version Badge */}
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold mb-4`}>
                    {item.version}
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/60">{item.status}</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {item.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                        <p className="text-foreground/70">{feature}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
