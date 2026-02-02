"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ============== Energy Beam (Central Portal) ==============
export function EnergyBeam() {
    const beamRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (glowRef.current) {
            // Pulsing glow effect
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.2 + 1;
            glowRef.current.scale.x = pulse;
        }
    });

    return (
        <group ref={beamRef} position={[0, 0, 0]}>
            {/* Core beam - bright white/orange center */}
            <mesh>
                <planeGeometry args={[0.08, 6]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Inner glow - orange */}
            <mesh ref={glowRef}>
                <planeGeometry args={[0.3, 6]} />
                <meshBasicMaterial
                    color="#FF6B00"
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Outer glow - soft orange */}
            <mesh>
                <planeGeometry args={[0.8, 6]} />
                <meshBasicMaterial
                    color="#FF6B00"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Wide ambient glow */}
            <mesh>
                <planeGeometry args={[2, 6]} />
                <meshBasicMaterial
                    color="#FF6B00"
                    transparent
                    opacity={0.05}
                    side={THREE.DoubleSide}
                />
            </mesh>
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
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#FF8533"
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
            // Slow self-rotation
            groupRef.current.rotation.y += 0.005;
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

// ============== PC Component (GPU) - Glowing Orange ==============
export function GlowingGPU({
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
            groupRef.current.rotation.y += 0.003;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* GPU Body - dark with orange accent */}
            <mesh>
                <boxGeometry args={[1.6, 0.35, 1]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={opacity}
                />
            </mesh>

            {/* Fans */}
            <mesh position={[-0.4, 0.2, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
                <meshStandardMaterial color="#0f0f0f" metalness={0.6} roughness={0.4} transparent opacity={opacity} />
            </mesh>
            <mesh position={[0.4, 0.2, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
                <meshStandardMaterial color="#0f0f0f" metalness={0.6} roughness={0.4} transparent opacity={opacity} />
            </mesh>

            {/* RGB Strip - Glowing Orange */}
            <mesh position={[0, 0.18, 0.45]}>
                <boxGeometry args={[1.4, 0.04, 0.08]} />
                <meshStandardMaterial
                    color="#FF6B00"
                    emissive="#FF6B00"
                    emissiveIntensity={2}
                    transparent
                    opacity={opacity}
                />
            </mesh>

            {/* Edge glow */}
            <mesh position={[0.75, 0, 0]}>
                <boxGeometry args={[0.05, 0.3, 0.9]} />
                <meshStandardMaterial
                    color="#FF6B00"
                    emissive="#FF6B00"
                    emissiveIntensity={1}
                    transparent
                    opacity={opacity * 0.5}
                />
            </mesh>
        </group>
    );
}

// ============== RAM Module - Glowing Orange ==============
export function GlowingRAM({
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
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + 1) * 0.08;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* RAM PCB */}
            <mesh>
                <boxGeometry args={[0.12, 1, 0.25]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} transparent opacity={opacity} />
            </mesh>

            {/* Heatspreader */}
            <mesh position={[0.02, 0.1, 0]}>
                <boxGeometry args={[0.1, 0.8, 0.27]} />
                <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.15} transparent opacity={opacity} />
            </mesh>

            {/* RGB Top - Glowing Orange */}
            <mesh position={[0, 0.55, 0]}>
                <boxGeometry args={[0.13, 0.1, 0.27]} />
                <meshStandardMaterial
                    color="#FF6B00"
                    emissive="#FF6B00"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={opacity}
                />
            </mesh>
        </group>
    );
}

// ============== Motherboard - Glowing Orange ==============
export function GlowingMotherboard({
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
            groupRef.current.rotation.x = -0.3 + Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.06;
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
            {/* Main PCB */}
            <mesh>
                <boxGeometry args={[2, 0.08, 1.6]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} transparent opacity={opacity} />
            </mesh>

            {/* Chipset heatsink with glow */}
            <mesh position={[0.3, 0.12, -0.3]}>
                <boxGeometry args={[0.4, 0.15, 0.4]} />
                <meshStandardMaterial
                    color="#2d2d2d"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={opacity}
                />
            </mesh>

            {/* RGB accent lines */}
            <mesh position={[-0.8, 0.05, 0]}>
                <boxGeometry args={[0.02, 0.02, 1.4]} />
                <meshStandardMaterial
                    color="#FF6B00"
                    emissive="#FF6B00"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={opacity}
                />
            </mesh>
            <mesh position={[0, 0.05, 0.7]}>
                <boxGeometry args={[1.8, 0.02, 0.02]} />
                <meshStandardMaterial
                    color="#FF6B00"
                    emissive="#FF6B00"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={opacity}
                />
            </mesh>
        </group>
    );
}
