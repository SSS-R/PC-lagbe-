"use client";

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import TakaScene from "./TakaScene";

export default function TakaHero() {
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden glow-border">
            {/* Top gradient glow - orange radial */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.12) 0%, transparent 60%)',
                }}
            />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>


            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                className="touch-none"
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    {/* Lighting - dramatic with orange accent */}
                    <ambientLight intensity={0.2} />
                    <spotLight
                        position={[5, 10, 5]}
                        angle={0.2}
                        penumbra={1}
                        intensity={1}
                        castShadow
                        color="#ffffff"
                    />
                    {/* Orange rim light from center */}
                    <pointLight position={[0, 0, 3]} intensity={2} color="#FF6B00" distance={10} />
                    {/* Blue accent from edges */}
                    <pointLight position={[-8, 0, 0]} intensity={0.4} color="#0066FF" />
                    <pointLight position={[8, 0, 0]} intensity={0.4} color="#0066FF" />

                    <Environment preset="night" />

                    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
                        <TakaScene />
                    </Float>
                </Suspense>
            </Canvas>

            {/* Hero Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ paddingTop: '60px' }}>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight text-center leading-tight">
                    Step into the Future
                    <br />
                    <span className="text-gradient-orange">of PC Building</span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 max-w-xl text-center px-4 mb-10">
                    Transform your budget into the perfect build with AI-powered recommendations and real-time price comparison.
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4 pointer-events-auto">
                    <Link href="/build" className="btn-primary">
                        Build Your PC
                    </Link>
                    <button className="btn-secondary">
                        Live Demo
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
                <svg
                    className="w-6 h-6 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
