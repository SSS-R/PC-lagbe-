"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";

export default function BuildPage() {
    const [budget, setBudget] = useState(80000); // Default BDT
    const [useCase, setUseCase] = useState("gaming");
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            setShowResults(true);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Navbar is global in layout, but we might need to handle spacing if it's fixed */}
            <div className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Build Your <span className="text-gradient-orange">Dream PC</span>
                    </h1>
                    <p className="text-neutral-400">
                        Define your budget and needs. AI will handle the rest.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Input Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card-glow p-8 space-y-8"
                    >
                        {/* Budget Slider */}
                        <div>
                            <div className="flex justify-between mb-4">
                                <label className="font-semibold text-lg">Budget</label>
                                <span className="text-[#FF6B00] font-bold text-xl">৳ {budget.toLocaleString()}</span>
                            </div>

                            <div className="relative h-2 bg-neutral-800 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-full"
                                    style={{ width: `${(budget / 500000) * 100}%` }}
                                />
                                <input
                                    type="range"
                                    min="30000"
                                    max="500000"
                                    step="1000"
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {/* Thumb (Visual only, aligned with internal logic would be complex manually, browser default usually fine if styled, but here we cover it) */}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-neutral-500">
                                <span>৳30k</span>
                                <span>৳500k+</span>
                            </div>
                        </div>

                        {/* Use Case Selection */}
                        <div>
                            <label className="font-semibold text-lg block mb-4">Primary Use</label>
                            <div className="grid grid-cols-2 gap-4">
                                {['gaming', 'workstation', 'editing', 'office'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setUseCase(type)}
                                        className={`p-4 rounded-xl border transition-all ${useCase === type
                                                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-white'
                                                : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600'
                                            }`}
                                    >
                                        <span className="capitalize font-medium">{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full btn-primary py-4 text-lg relative overflow-hidden group"
                        >
                            {isGenerating ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Analyzing Prices...</span>
                                </div>
                            ) : (
                                <span>Generate Build</span>
                            )}
                        </button>
                    </motion.div>

                    {/* Results Preview (or Placeholder) */}
                    <motion.div
                        className="relative min-h-[500px]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <AnimatePresence mode="wait">
                            {!showResults ? (
                                <motion.div
                                    key="placeholder"
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border border-neutral-800 border-dashed rounded-2xl bg-neutral-900/20"
                                >
                                    <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-neutral-600">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-300">Ready to Architect</h3>
                                    <p className="text-neutral-500 mt-2 max-w-sm">
                                        Configure your preferences on the left to generate a tailored PC build list instantly.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass-card p-6 h-full flex flex-col"
                                >
                                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-neutral-800">
                                        <div>
                                            <h2 className="text-xl font-bold">Recommended Build</h2>
                                            <p className="text-neutral-400 text-sm">Optimized for {useCase}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-[#FF6B00]">৳ {budget}</div>
                                            <div className="text-xs text-neutral-500">Total Estimate</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                        {/* Mock Parts */}
                                        <BuildPart type="CPU" name="AMD Ryzen 5 7600X" price={24500} />
                                        <BuildPart type="GPU" name="NVIDIA RTX 4060 Ti 8GB" price={45000} />
                                        <BuildPart type="Motherboard" name="MSI PRO B650M-A WiFi" price={18500} />
                                        <BuildPart type="RAM" name="Corsair Vengeance 32GB DDR5" price={12500} />
                                        <BuildPart type="Storage" name="Samsung 980 Pro 1TB NVMe" price={9500} />
                                        <BuildPart type="Power Supply" name="Corsair CX650M 650W" price={6500} />
                                        <BuildPart type="Case" name="Montech Air 100 ARGB" price={4500} />
                                    </div>

                                    <button className="w-full mt-6 btn-secondary py-3 text-sm">
                                        View Retailers & Buy
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

function BuildPart({ type, name, price }: { type: string, name: string, price: number }) {
    return (
        <div className="flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors group">
            <div className="w-10 h-10 rounded-md bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-500 mr-4 group-hover:bg-[#FF6B00]/20 group-hover:text-[#FF6B00] transition-colors">
                {type.substring(0, 2)}
            </div>
            <div className="flex-1">
                <div className="text-xs text-neutral-500 mb-0.5">{type}</div>
                <div className="font-medium text-sm text-neutral-200">{name}</div>
            </div>
            <div className="font-mono text-sm text-neutral-400">
                ৳{price.toLocaleString()}
            </div>
        </div>
    );
}
