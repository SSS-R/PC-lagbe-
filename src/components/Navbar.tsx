"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import Image from "next/image";

export function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6 transition-all duration-300 ${isHome ? 'bg-transparent' : 'bg-black/80 backdrop-blur-md border-b border-white/5'}`}>
            <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="PC Lagbe Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">PC Lagbe?</span>
            </Link>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-6">
                    <NavLink href="/build" label="PC Builder" active={pathname === "/build"} />
                    <NavLink href="/components" label="Components" active={pathname === "/components"} />
                </div>

                <Link
                    href="/build"
                    className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-[#4f9e97]/50 transition-all duration-300"
                >
                    Get Started
                </Link>
            </div>
        </nav>
    );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors relative group ${active ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
        >
            {label}
            {active && (
                <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4f9e97]"
                />
            )}
            {!active && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4f9e97] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
        </Link>
    );
}
