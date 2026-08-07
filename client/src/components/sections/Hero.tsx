import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { brand } from "@/config/brand";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import CuratorModal from "@/components/modals/CuratorModal";

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
  const [isCuratorModalOpen, setIsCuratorModalOpen] = useState(false);

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
      <div className="absolute inset-0" style={{ background: brand.gradients.subtle }} />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: `${brand.colors.primaryLight}33` }}
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
          <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg" style={{ background: brand.gradients.primary, boxShadow: `0 0 30px ${brand.colors.primaryLight}80` }}>
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-20 h-20"
              style={{ aspectRatio: "1 / 1" }}
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent"
          style={{ backgroundImage: brand.gradients.primary }}
        >
          {brand.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-light text-foreground/80 mb-12 tracking-widest"
        >
          {brand.slogan}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          A decentralized protocol for permissionless opinion market creation.
          Express your view, take a position, and participate in collective intelligence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary-light to-primary-dark hover:opacity-90 text-white px-10 py-7 text-xl font-bold rounded-xl shadow-lg transition-all hover:shadow-2xl animate-shimmer glow-primary relative"
            onClick={() => navigate("/app")}
          >
            Enter App
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-primary/40 hover:border-primary text-foreground px-8 py-7 text-lg font-medium rounded-xl transition-all hover:bg-primary/5 flex items-center gap-2 group"
            onClick={() => setIsCuratorModalOpen(true)}
          >
            <Sparkles className="w-5 h-5 text-primary group-hover:animate-pulse" />
            先锋策展人计划
          </Button>
        </motion.div>
      </motion.div>

      <CuratorModal 
        isOpen={isCuratorModalOpen} 
        onClose={() => setIsCuratorModalOpen(false)} 
      />
    </section>
  );
}
