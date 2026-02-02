"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
    EnergyBeam,
    EmberParticles,
    TakaSymbol,
    GlowingGPU,
    GlowingRAM,
    GlowingMotherboard
} from "./AnimatedComponents";

// Types of components to spawn
const COMPONENT_TYPES = ["gpu", "ram", "motherboard"] as const;
type ComponentType = typeof COMPONENT_TYPES[number];

// Data structure for a flying item
interface FlyingItem {
    id: number;
    initialY: number;
    initialZ: number;
    speed: number;
    targetComponent: ComponentType;
    rotationSpeed: { x: number; y: number; z: number };
}

export default function TakaScene() {
    // Determine flow direction: Left to Right (-X to +X)
    // Taka spawns at -X, moves to +X

    // State to hold active items
    const [items, setItems] = useState<FlyingItem[]>([]);
    const nextId = useRef(0);
    const lastSpawnTime = useRef(0);

    useFrame((state) => {
        // Spawn new item every 1.5 seconds
        if (state.clock.elapsedTime - lastSpawnTime.current > 1.8) {
            spawnItem();
            lastSpawnTime.current = state.clock.elapsedTime;
        }

        // Cleanup items that have flown off screen (x > 8)
        // We do this infrequently to avoid unnecessary re-renders during frame loop
        // Ideally we should manage positions in refs for performance, but 
        // for <20 items, React state updates might be okay if not too frequent.
        // ACTUALLY: Updating state in useFrame is bad. 
        // Better approach: Static list of "slots" or separate component per item that manages its own lifecycle?
        // Or just let them fly and cull them occasionally.

        // Let's use a specialized component "FlowManager" to handle the items locally 
        // to avoid re-rendering the whole scene tree too often.
    });

    // Helper to spawn
    const spawnItem = () => {
        setItems(prev => {
            // Remove old items
            const active = prev.filter(item => {
                // Approximate position check based on elapsed time? 
                // Hard to do without refs.
                // Let's just keep last 10 items?
                return true;
            });

            if (active.length > 8) active.shift(); // Keep count manageable

            return [...active, {
                id: nextId.current++,
                initialY: (Math.random() - 0.5) * 3, // Random height
                initialZ: (Math.random() - 0.5) * 3, // Random depth
                speed: 1.5 + Math.random() * 0.5, // Random speed
                targetComponent: COMPONENT_TYPES[Math.floor(Math.random() * COMPONENT_TYPES.length)],
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            }];
        });
    };

    return (
        <group>
            {/* Central Portal */}
            <EnergyBeam />
            <EmberParticles count={80} />

            {/* Render all flying items */}
            {items.map(item => (
                <FloatingItem key={item.id} data={item} />
            ))}
        </group>
    );
}

// Sub-component that handles its own animation loop
function FloatingItem({ data }: { data: FlyingItem }) {
    const groupRef = useRef<THREE.Group>(null);
    const [spawnTime] = useState(() => performance.now() / 1000); // Record creation time

    // Local state for visibility/culling?
    // No, just let it render. Can optimize by setting visible=false if out of bounds.

    useFrame((state) => {
        if (!groupRef.current) return;

        const now = state.clock.elapsedTime;
        // Calculate X based on time alive
        // Start at X = -7
        // offset = (now - spawnTime) * speed is wrong because spawnTime is absolute?
        // Let's use internal time offset.

        const timeAlive = now; // We need global time for sync? 
        // Easier: Just increment position blindly

        const dt = state.clock.getDelta(); // This might be unstable if multiple components call it?
        // Actually best to use `state.clock.elapsedTime` and a start reference.
    });

    // We need a stable reference time. 
    // `state.clock.elapsedTime` is global.
    // We can store the *global* start time in the data item, but we passed a fresh object.

    return <ItemAnimator data={data} />;
}

// Wrapper to capture the 'start' time of the component mount
function ItemAnimator({ data }: { data: FlyingItem }) {
    const groupRef = useRef<THREE.Group>(null);
    const startTime = useRef<number | null>(null);

    useFrame((state) => {
        if (startTime.current === null) {
            startTime.current = state.clock.elapsedTime;
        }

        if (!groupRef.current) return;

        const timeAlive = state.clock.elapsedTime - startTime.current;
        const x = -9 + (timeAlive * data.speed); // Start far left

        // Update Position
        groupRef.current.position.x = x;
        // Add some sine wave bobbing to Y and Z
        groupRef.current.position.y = data.initialY + Math.sin(timeAlive + data.id) * 0.5;
        groupRef.current.position.z = data.initialZ + Math.cos(timeAlive * 0.8 + data.id) * 0.5;

        // Update Rotation
        groupRef.current.rotation.x += data.rotationSpeed.x;
        groupRef.current.rotation.y += data.rotationSpeed.y;
        groupRef.current.rotation.z += data.rotationSpeed.z;

        // Transition Logic
        // Beam is roughly at x=0, width ~1.5
        const beamCenter = 0;
        const transitionWidth = 1.0;

        // Calculate blend factor: 0 = Taka, 1 = Component
        // Smoothstep transition
        let blend = 0;
        if (x < beamCenter - transitionWidth / 2) {
            blend = 0;
        } else if (x > beamCenter + transitionWidth / 2) {
            blend = 1;
        } else {
            // Normalized linear 0..1 in the transition zone
            blend = (x - (beamCenter - transitionWidth / 2)) / transitionWidth;
        }

        // We can't easily morph geometries.
        // We will control SCALE and OPACITY of two children.
        // Child 0: Taka. Scale 1 -> 0. Opacity 1 -> 0.
        // Child 1: Component. Scale 0 -> 1. Opacity 0 -> 1.

        const takaGroup = groupRef.current.children[0];
        const compGroup = groupRef.current.children[1];

        if (takaGroup && compGroup) {
            // Taka fades out
            const takaScale = 1 - blend;
            takaGroup.scale.setScalar(takaScale > 0 ? takaScale : 0.001);
            // takaGroup.visible = takaScale > 0.01;

            // Comp fades in
            const compScale = blend;
            compGroup.scale.setScalar(compScale > 0 ? compScale : 0.001);
            // compGroup.visible = compScale > 0.01;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Taka Symbol */}
            <group>
                <TakaSymbol position={[0, 0, 0]} />
            </group>

            {/* Target Component */}
            <group scale={[0.001, 0.001, 0.001]}> {/* Start hidden */}
                {data.targetComponent === 'gpu' && <GlowingGPU position={[0, 0, 0]} />}
                {data.targetComponent === 'ram' && <GlowingRAM position={[0, 0, 0]} />}
                {data.targetComponent === 'motherboard' && <GlowingMotherboard position={[0, 0, 0]} />}
            </group>
        </group>
    );
}
