"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

// ============== Energy Beam (Central Portal) ==============
// ============== Energy Beam (Central Portal) ==============
export function EnergyBeam() {
    const beamRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const outerGlowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // High-frequency, small-amplitude flicker for laser-like intensity
        const jitter = Math.sin(time * 50) * 0.05 + Math.cos(time * 120) * 0.05;

        if (coreRef.current) {
            coreRef.current.scale.x = 1 + jitter * 0.5;
        }

        if (glowRef.current) {
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + jitter;
        }

        if (outerGlowRef.current) {
            (outerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(time * 10) * 0.05;
        }
    });

    return (
        <group ref={beamRef} position={[0, 0, 0]}>
            {/* 1. The Core - Ultra sharp white/orange line */}
            <mesh ref={coreRef}>
                <planeGeometry args={[0.015, 20]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={1}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* 2. Primary Energy Sheath - Hot Teal */}
            <mesh ref={glowRef}>
                <planeGeometry args={[0.08, 20]} />
                <meshBasicMaterial
                    color="#4f9e97"
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* 3. Secondary Diffraction Glow - Diffuse Teal */}
            <mesh ref={outerGlowRef}>
                <planeGeometry args={[0.4, 20]} />
                <meshBasicMaterial
                    color="#6ee1c9"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* 4. Ambient Haze - Very wide, very faint */}
            <mesh>
                <planeGeometry args={[3, 20]} />
                <meshBasicMaterial
                    color="#4f9e97"
                    transparent
                    opacity={0.03}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* High speed particles for the "flow" effect */}
            <Sparkles
                count={100}
                scale={[0.1, 15, 0.1]}
                size={3}
                speed={8}
                opacity={0.8}
                color="#ccfffc"
                noise={0.1}
            />
        </group>
    );
}

// ============== Ember Particles ==============
export function EmberParticles({ count = 50 }: { count?: number }) {
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities: number[] = [];

        for (let i = 0; i < count; i++) {
            // Start near the beam center
            positions[i * 3] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

            // Random velocities
            velocities.push(
                (Math.random() - 0.5) * 0.02,
                Math.random() * 0.03 + 0.01,
                (Math.random() - 0.5) * 0.02
            );
        }

        return { positions, velocities };
    }, [count]);

    useFrame(() => {
        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < count; i++) {
                // Update positions
                positions[i * 3] += particles.velocities[i * 3];
                positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
                positions[i * 3 + 2] += particles.velocities[i * 3 + 2];

                // Reset if too far
                if (positions[i * 3 + 1] > 3 || Math.abs(positions[i * 3]) > 2) {
                    positions[i * 3] = (Math.random() - 0.5) * 0.3;
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
                }
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                    args={[particles.positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#6ee1c9"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

// ============== Taka Symbol (Currency) ==============
export function TakaSymbol({
    position,
    rotation = [0, 0, 0],
    scale = 1,
    opacity = 1
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    opacity?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow self-rotation - handled by parent usually, but adds nice detail
            // groupRef.current.rotation.y += 0.005; 
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* Coin body - metallic silver (fiat style) */}
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 0.1, 64]} />
                <meshStandardMaterial
                    color="#A0A0A0"
                    metalness={0.95}
                    roughness={0.1}
                    transparent
                    opacity={opacity}
                />
            </mesh>

            {/* Coin rim */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.8, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#808080"
                    metalness={0.9}
                    roughness={0.15}
                    transparent
                    opacity={opacity}
                />
            </mesh>

            {/* Taka Symbol embossed - T shape */}
            <mesh position={[0, 0.06, 0]}>
                <boxGeometry args={[0.5, 0.02, 0.08]} />
                <meshStandardMaterial color="#606060" metalness={0.8} roughness={0.2} transparent opacity={opacity} />
            </mesh>
            <mesh position={[0, 0.06, -0.15]}>
                <boxGeometry args={[0.08, 0.02, 0.35]} />
                <meshStandardMaterial color="#606060" metalness={0.8} roughness={0.2} transparent opacity={opacity} />
            </mesh>
        </group>
    );
}
