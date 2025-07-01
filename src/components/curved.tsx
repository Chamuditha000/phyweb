import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export const CurvedSciFiTV = () => {
  const screenRef = useRef<THREE.Group>(null);
  const radius = 40; // Radius of the circular screen
  const height = 30; // Height of the screen

  // Create cylindrical screen geometry
  const screenGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(
      radius, // radiusTop
      radius, // radiusBottom
      height, // height
      64, // radialSegments
      4, // heightSegments
      true, // openEnded
      0, // thetaStart
      Math.PI * 2 // thetaLength
    );

    // Rotate 90 degrees to lay horizontally
    geometry.rotateZ(0); // Changed from rotateX to rotateZ
    geometry.translate(0, 0, height / 2); // Adjust position for horizontal orientation

    // Flip normals to face inward
    geometry.scale(-1, 1, 1);

    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (screenRef.current) {
      // Gentle pulsing animation
      screenRef.current.position.y =
        3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={screenRef} position={[0, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Glowing Screen Surface */}
      <mesh geometry={screenGeometry}>
        <meshStandardMaterial
          color="#0066ff"
          emissive="#00aaff"
          emissiveIntensity={2.5}
          metalness={0.95}
          roughness={0.02}
          side={THREE.BackSide}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Full Glow Effect (replaces wireframe) */}
      <mesh geometry={screenGeometry}>
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={1.5}
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};
