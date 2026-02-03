"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Preload models to prevent pop-in
useGLTF.preload("/models/geforce_rtx_3080_graphics_card.glb");
useGLTF.preload("/models/kingston_hyperx_fury_black_ram_module.glb");
useGLTF.preload("/models/intel_core_i9_12900k.glb");
useGLTF.preload("/models/gigabyte_trx40_aorus_xtreme.glb");

// Helper to center and normalize models
function ModelWrapper({ children, scale = 1, rotation = [0, 0, 0], opacity = 1 }: any) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            // Apply floating/rotation effects if needed, or let parent handle it
            // For now, we trust the parent TakaScene to handle main movement

            // Handle opacity - this is tricky for complex GLTFs with many materials
            // We traverse the object to update material opacity
            ref.current.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    child.material.transparent = true;
                    child.material.opacity = opacity;
                }
            });
        }
    });

    return (
        <group ref={ref} rotation={rotation} scale={scale}>
            {children}
        </group>
    );
}

export function GLTF_GPU({ opacity = 1 }: { opacity?: number }) {
    const { scene } = useGLTF("/models/geforce_rtx_3080_graphics_card.glb");
    const clone = useMemo(() => scene.clone(), [scene]);

    return (
        <ModelWrapper scale={0.1} opacity={opacity} rotation={[0, Math.PI / 2, 0]}>
            <primitive object={clone} />
        </ModelWrapper>
    );
}

export function GLTF_RAM({ opacity = 1 }: { opacity?: number }) {
    const { scene } = useGLTF("/models/kingston_hyperx_fury_black_ram_module.glb");
    const clone = useMemo(() => scene.clone(), [scene]);

    return (
        <ModelWrapper scale={0.5} opacity={opacity} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <primitive object={clone} />
        </ModelWrapper>
    );
}

export function GLTF_CPU({ opacity = 1 }: { opacity?: number }) {
    const { scene } = useGLTF("/models/intel_core_i9_12900k.glb");
    const clone = useMemo(() => scene.clone(), [scene]);

    return (
        <ModelWrapper scale={2} opacity={opacity} rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={clone} />
        </ModelWrapper>
    );
}

export function GLTF_Motherboard({ opacity = 1 }: { opacity?: number }) {
    const { scene } = useGLTF("/models/gigabyte_trx40_aorus_xtreme.glb");
    const clone = useMemo(() => scene.clone(), [scene]);

    return (
        <ModelWrapper scale={0.5} opacity={opacity} rotation={[Math.PI / 4, 0, 0]}>
            <primitive object={clone} />
        </ModelWrapper>
    );
}
