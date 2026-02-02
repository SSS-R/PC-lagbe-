"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MOCK_COMPONENTS = [
    { id: 1, name: "AMD Ryzen 5 7600X", category: "CPU", price: 24500, image: "cpu", brand: "AMD", rating: 4.8 },
    { id: 2, name: "Intel Core i5-13600K", category: "CPU", price: 32000, image: "cpu-intel", brand: "Intel", rating: 4.9 },
    { id: 3, name: "NVIDIA RTX 4060 Ti", category: "GPU", price: 45000, image: "gpu", brand: "NVIDIA", rating: 4.7 },
    { id: 4, name: "G.Skill Trident Z5 32GB", category: "RAM", price: 14500, image: "ram", brand: "G.Skill", rating: 4.9 },
    { id: 5, name: "Samsung 990 Pro 1TB", category: "Storage", price: 11500, image: "ssd", brand: "Samsung", rating: 5.0 },
    { id: 6, name: "NZXT Kraken Elite 360", category: "Cooler", price: 28000, image: "cooler", brand: "NZXT", rating: 4.6 },
    { id: 7, name: "Lian Li O11 Vision", category: "Case", price: 16500, image: "case", brand: "Lian Li", rating: 4.8 },
    { id: 8, name: "Corsair RM850e", category: "PSU", price: 13500, image: "psu", brand: "Corsair", rating: 4.7 },
];

const CATEGORIES = ["All", "CPU", "GPU", "Motherboard", "RAM", "Storage", "PSU", "Case", "Cooler"];

export default function ComponentsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredComponents = MOCK_COMPONENTS.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Filters Sidebar (Mobile: Top Bar, Desktop: Sidebar) */}
                <aside className="w-full lg:w-64 shrink-0 space-y-8">
                    <div className="glass-card p-6 sticky top-28">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            Filters
                        </h2>

                        {/* Search */}
                        <div className="mb-8">
                            <input
                                type="text"
                                placeholder="Search parts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:border-[#FF6B00] focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-wider">Components</h3>
                            <div className="space-y-1">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${selectedCategory === category
                                                ? 'bg-[#FF6B00]/10 text-[#FF6B00] font-medium'
                                                : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Mock */}
                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-wider">Price Range</h3>
                            <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                                <div className="h-full w-1/2 bg-[#FF6B00] ml-1/4" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-end mb-6">
                        <h1 className="text-3xl font-bold">
                            {selectedCategory === "All" ? "All Components" : selectedCategory}
                        </h1>
                        <span className="text-neutral-500 text-sm">
                            Showing {filteredComponents.length} results
                        </span>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {filteredComponents.map(item => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={item.id}
                                className="glass-card group hover:border-[#FF6B00]/50 transition-all duration-300 hover:-translate-y-1 p-0 overflow-hidden"
                            >
                                {/* Image Placeholder */}
                                <div className="h-48 bg-neutral-900/50 flex items-center justify-center relative group-hover:bg-neutral-900/30 transition-colors">
                                    <span className="text-neutral-600 text-4xl font-bold opacity-20 group-hover:opacity-40 transition-opacity">
                                        {item.category}
                                    </span>

                                    {/* Vendor Badges */}
                                    <div className="absolute top-4 right-4 flex gap-1">
                                        <span className="bg-neutral-800/80 backdrop-blur-sm text-[10px] px-2 py-1 rounded border border-neutral-700 text-neutral-300">
                                            StarTech
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{item.brand}</span>
                                        <div className="flex items-center gap-1 text-xs text-[#FFC107]">
                                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {item.rating}
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-lg mb-4 line-clamp-2 leading-tight group-hover:text-[#FF6B00] transition-colors">
                                        {item.name}
                                    </h3>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div>
                                            <span className="text-xs text-neutral-500 block">Best Price</span>
                                            <span className="text-xl font-bold text-white">৳{item.price.toLocaleString()}</span>
                                        </div>
                                        <button className="p-2 rounded-full bg-white text-black hover:bg-[#FF6B00] hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
