import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

/**
 * Hero Section - Minimalist Protocol Aesthetic
 *
 * Design Philosophy:
 * - Large whitespace with centered content
 * - Dynamic purple-blue gradient background
 * - Subtle particle animations
 * - Glassmorphism elements
 * - Professional, future-forward Web3 aesthetic
 */

export default function Hero() {
  const [, navigate] = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-background to-blue-900/20" />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <img
              src="/manus-storage/pulse-logo_f0ddc160.png"
              alt="Pulse Logo"
              className="w-20 h-20"
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
        >
          Pulse
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-light text-foreground/80 mb-12 tracking-widest"
        >
          VIEW. ANALYZE. STAKE. BELIEVE.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          A decentralized protocol for permissionless market creation and
          prediction. Build, trade, and stake on any outcome.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/70"
            onClick={() => navigate("/app")}
          >
            Enter App
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-purple-500/50 text-foreground hover:bg-purple-500/10 px-8 py-6 text-lg font-semibold rounded-lg"
          >
            Documentation
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="text-foreground/70 hover:text-foreground px-8 py-6 text-lg font-semibold"
          >
            GitHub
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-foreground/30 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
