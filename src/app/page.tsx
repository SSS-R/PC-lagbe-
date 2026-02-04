"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TakaHero } from "@/components/hero";

// Animation variants for scroll-triggered reveals
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function Home() {
  return (
    <main className="bg-black">
      <TakaHero />

      {/* Features Section */}
      <section className="min-h-screen bg-black relative overflow-hidden py-24">
        {/* Top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(79, 158, 151, 0.1) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Smart PC Building
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Tell us your budget, we&apos;ll find the perfect parts.
              AI-powered recommendations with real-time price comparison.
            </p>
          </motion.div>

          {/* Feature Cards - Bento Grid with animations */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Card 1 - Large */}
            <motion.div
              className="glass-card-glow p-8 md:col-span-2 lg:col-span-2 group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f9e97] to-[#6ee1c9] flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-[rgba(79,158,151,0.3)] transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Build Generator</h3>
              <p className="text-neutral-400 leading-relaxed">
                Enter your budget and intended use case. Our algorithm analyzes compatibility,
                performance scores, and current prices to recommend the optimal build.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="glass-card p-8 group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-[#4f9e97]/50 transition-colors">
                <svg className="w-6 h-6 text-[#4f9e97]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Price Comparison</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Compare prices across StarTech, Ryans, TechLand and more in real-time.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="glass-card p-8 group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-[#4f9e97]/50 transition-colors">
                <svg className="w-6 h-6 text-[#4f9e97]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Compatibility Check</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Automatic validation of socket types, RAM compatibility, and power requirements.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              className="glass-card p-8 md:col-span-2 lg:col-span-2 group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-[#4f9e97]/50 transition-colors">
                <svg className="w-6 h-6 text-[#4f9e97]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Smart Swap</h3>
              <p className="text-neutral-400 leading-relaxed">
                Don&apos;t like a recommended part? Click &quot;Change&quot; to see compatible alternatives
                filtered by your existing selections. No more guessing.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(79, 158, 151, 0.08) 0%, transparent 60%)',
          }}
        />

        <motion.div
          className="max-w-4xl mx-auto text-center px-6 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build?
          </h2>
          <p className="text-xl text-neutral-400 mb-10">
            Start with your budget range and let our AI do the heavy lifting.
          </p>

          {/* Budget Slider Preview */}
          <motion.div
            className="glass-card-glow p-8 max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <label className="text-neutral-400 text-sm mb-4 block">Budget Range (BDT)</label>
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold">৳30,000</span>
              <div className="flex-1 h-2 bg-neutral-800 rounded-full relative">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "50%" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer"
                  initial={{ left: "0%" }}
                  whileInView={{ left: "calc(50% - 8px)" }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
              <span className="text-white font-semibold">৳500,000</span>
            </div>
          </motion.div>

          <Link href="/build">
            <motion.button
              className="btn-primary text-lg px-10 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Generate My Build
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-neutral-500 text-sm">
            © 2026 PC Lagbe?. Built for Bangladesh PC enthusiasts.
          </p>
        </div>
      </footer>
    </main>
  );
}
