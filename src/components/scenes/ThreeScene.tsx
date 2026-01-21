/**
 * Three.js Scene Structure
 * 
 * PART 2 — THREE.JS SCENE STRUCTURE (NO ABSTRACT SHAPES)
 * 
 * Scene Architecture:
 * Scene
 * ├── Environment
 * │   ├── Skybox
 * │   ├── SunLight
 * │   ├── Fog
 * ├── WaterSystem
 * │   ├── SurfaceMesh
 * │   ├── UnderwaterVolume
 * ├── Fauna
 * │   ├── DolphinGroup
 * │   ├── Gharial
 * │   ├── Turtle
 * │   ├── FishSchools
 * ├── Terrain
 * │   ├── Riverbed
 * │   ├── Ghats
 * │   ├── Forest
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
}

export function ThreeScene({ className = '' }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07141E); // bg-primary
    scene.fog = new THREE.Fog(0x07141E, 10, 50);
    sceneRef.current = scene;

    // Get container dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height, // Dynamic aspect ratio
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Environment - Skybox (simplified)
    const skyGeometry = new THREE.SphereGeometry(100, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: 0x0C1F2E, // bg-secondary
      side: THREE.BackSide
    });
    const skybox = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skybox);

    // Environment - Sun Light
    const ambientLight = new THREE.AmbientLight(0xEAF6F6, 0.3); // text-primary
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00E6B8, 0.8); // accent-teal
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Water System - Surface Mesh
    const waterGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a4d5e,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9
    });
    const waterSurface = new THREE.Mesh(waterGeometry, waterMaterial);
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.y = 0;
    waterSurface.receiveShadow = true;
    scene.add(waterSurface);

    // Water System - Underwater Volume (simplified as a colored fog effect)
    // This would be more complex in a full implementation

    // Fauna - DolphinGroup (placeholder - would load .glb models)
    // In production, these would be loaded GLTFLoader models
    // const dolphinGeometry = new THREE.BoxGeometry(1, 0.5, 2);
    // const dolphinMaterial = new THREE.MeshStandardMaterial({ 
    //   color: 0x9CCFD8,
    //   roughness: 0.1,
    //   metalness: 0.9 // wet skin shader approximation
    // });
    // const dolphin = new THREE.Mesh(dolphinGeometry, dolphinMaterial);
    // dolphin.position.set(-2, 0.5, -2);
    // scene.add(dolphin);

    // Terrain - Riverbed
    const riverbedGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    const riverbedMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a4d5e,
      roughness: 0.8
    });
    const riverbed = new THREE.Mesh(riverbedGeometry, riverbedMaterial);
    riverbed.rotation.x = -Math.PI / 2;
    riverbed.position.y = -0.5;
    riverbed.receiveShadow = true;
    scene.add(riverbed);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Rotate camera slightly for atmosphere
      const time = Date.now() * 0.0005;
      camera.position.x = Math.sin(time) * 0.5;
      camera.position.z = 10 + Math.cos(time) * 0.5;
      camera.lookAt(0, 0, 0);

      // Animate water surface
      if (waterSurface) {
        waterSurface.rotation.z += 0.0001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Dispose of Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`relative w-full h-full ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
