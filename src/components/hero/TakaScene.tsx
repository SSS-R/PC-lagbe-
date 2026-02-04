"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles, Float } from "@react-three/drei";
import {
    EnergyBeam,
    EmberParticles,
    TakaSymbol
} from "./AnimatedComponents";
import { GLTF_GPU, GLTF_RAM, GLTF_CPU, GLTF_Motherboard } from "./ModelComponents";

const COMPONENT_TYPES = ["taka", "taka", "gpu", "ram", "cpu", "motherboard"] as const;
type ComponentType = typeof COMPONENT_TYPES[number];

interface FlyingItem {
    id: number;
    initialY: number;
    initialZ: number;
    speed: number;
    type: ComponentType;
    rotationSpeed: { x: number; y: number; z: number };
    scaleVar: number;
}

export default function TakaScene() {
    const [items, setItems] = useState<FlyingItem[]>([]);
    const nextId = useRef(0);
    const lastSpawnTime = useRef(0);

    useFrame((state) => {
        // Spawn more frequently for a dense "stream" like cryptolink
        if (state.clock.elapsedTime - lastSpawnTime.current > 1.2) {
            spawnItem();
            lastSpawnTime.current = state.clock.elapsedTime;
        }
    });

    const spawnItem = () => {
        setItems(prev => {
            // Keep active items
            const active = prev.filter(item => {
                // Since we don't track position in state, we can't cull by position easily here.
                // We'll simplisticly cull by array size to keep memory stable.
                return true;
            });

            if (active.length > 12) active.shift(); // Keep ~12 items on screen

            return [...active, {
                id: nextId.current++,
                initialY: (Math.random() - 0.5) * 4,
                initialZ: (Math.random() - 0.5) * 4,
                speed: 1.0 + Math.random() * 0.5,
                type: COMPONENT_TYPES[Math.floor(Math.random() * (COMPONENT_TYPES.length - 2)) + 2], // Always pick a component target
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                scaleVar: 0.8 + Math.random() * 0.4
            }];
        });
    };

    return (
        <group>
            {/* Central Energy Beam - The "Rift" */}
            <EnergyBeam />
            <EmberParticles count={150} />

            {/* Global Sparkles for depth */}
            <Sparkles count={50} scale={12} size={2} speed={0.4} opacity={0.5} noise={0.2} color="#4f9e97" />

            {/* Flying Items */}
            {items.map(item => (
                <FloatingItem key={item.id} data={item} />
            ))}
        </group>
    );
}

function FloatingItem({ data }: { data: FlyingItem }) {
    return <ItemAnimator data={data} />;
}

function ItemAnimator({ data }: { data: FlyingItem }) {
    const groupRef = useRef<THREE.Group>(null);
    const startTime = useRef<number | null>(null);
    const [transformed, setTransformed] = useState(false);

    useFrame((state) => {
        if (startTime.current === null) {
            startTime.current = state.clock.elapsedTime;
        }

        if (!groupRef.current) return;

        const timeAlive = state.clock.elapsedTime - startTime.current;

        // Move from Left (-10) to Right (+10)
        // Beam is at 0.
        // Taka should be visible from -10 to 0.
        // Components should be visible from 0 to +10.

        const x = -10 + (timeAlive * data.speed);

        groupRef.current.position.x = x;
        groupRef.current.position.y = data.initialY + Math.sin(timeAlive * 0.5 + data.id) * 0.3;
        groupRef.current.position.z = data.initialZ + Math.cos(timeAlive * 0.3 + data.id) * 0.3;

        groupRef.current.rotation.x += data.rotationSpeed.x;
        groupRef.current.rotation.y += data.rotationSpeed.y;
        groupRef.current.rotation.z += data.rotationSpeed.z;

        // Transformation Logic
        if (x > 0 && !transformed) {
            setTransformed(true);
            // Optional: Emit particle burst here if possible, or trigger beam flicker state
        }

        // Scale/Opacity Logic to hide/show
        const takaGroup = groupRef.current.children[0];
        const compGroup = groupRef.current.children[1];

        // Hard swap at 0 with slight overlap for smoothness?
        // Or fade out Taka, fade in Comp.

        if (x < -0.5) {
            // Far left: Taka visible
            takaGroup.visible = true;
            compGroup.visible = false;
            takaGroup.scale.setScalar(1);
        } else if (x > 0.5) {
            // Far right: Comp visible
            takaGroup.visible = false;
            compGroup.visible = true;
            // Scale up component smoothly from 0
            const scaleUp = Math.min(1, (x - 0.5) * 2);
            compGroup.scale.setScalar(scaleUp * data.scaleVar);
        } else {
            // Transformation Zone (-0.5 to 0.5)
            // Taka shrinks
            const t = (x + 0.5); // 0 to 1

            // Taka scale: 1 -> 0
            const takaScale = Math.max(0, 1 - t * 2);
            takaGroup.scale.setScalar(takaScale);
            takaGroup.visible = takaScale > 0.01;

            // Comp scale: 0 -> 1 starts after x=0
            if (x > 0) {
                const compScale = Math.min(1, x * 2);
                compGroup.scale.setScalar(compScale * data.scaleVar);
                compGroup.visible = true;
            } else {
                compGroup.visible = false;
            }
        }
    });

    return (
        <group ref={groupRef}>
            {/* Child 0: Value (Taka) */}
            <group>
                <TakaSymbol position={[0, 0, 0]} scale={0.8} />
            </group>

            {/* Child 1: Product (Component) */}
            <group visible={false}>
                {data.type === 'gpu' && <GLTF_GPU />}
                {data.type === 'ram' && <GLTF_RAM />}
                {data.type === 'cpu' && <GLTF_CPU />}
                {data.type === 'motherboard' && <GLTF_Motherboard />}
                {/* Fallback for safety */}
                {(data.type === 'taka') && <GLTF_GPU />}
            </group>
        </group>
    );
}
