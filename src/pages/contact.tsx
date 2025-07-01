import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  PerspectiveCamera,
  OrbitControls,
  Text,
  Grid,
} from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export const Contact = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows>
        <color attach="background" args={["#000011"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <OrbitControls enableZoom={false} />

        {/* Sci-fi Ground Grid */}
        <Grid
          position={[0, -5, 0]}
          infiniteGrid
          cellColor="#00ffff"
          sectionColor="#0088ff"
          fadeDistance={30}
          fadeStrength={2}
        />

        {/* Balloon Group with movement */}
        <BalloonGroup />
      </Canvas>

      {/* ✅ Messenger Button */}
      {/* ✅ Messenger Chat Button */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          zIndex: 10,
          transition: "transform 0.2s ease",
        }}
      >
        <button
          onClick={() =>
            window.open("https://web.facebook.com/UORphysics.society", "_blank")
          }
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#0084FF",
            border: "none",
            boxShadow: "0 0 20px #00f0ff",
            color: "white",
            fontSize: "30px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          title="Message us on Facebook"
        >
          💬
        </button>
      </div>
    </div>
  );
};

function BalloonGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (
      flameRef.current &&
      flameRef.current.material instanceof THREE.MeshStandardMaterial
    ) {
      flameRef.current.scale.set(
        1 + Math.sin(t * 10) * 0.05,
        1 + Math.sin(t * 30) * 0.25,
        1 + Math.cos(t * 12) * 0.05
      );
      flameRef.current.material.opacity = 0.5 + Math.sin(t * 60) * 0.3;
    }

    if (groupRef.current) {
      const speed = 0.5;
      const yMin = -5;
      const yMax = 15;
      const range = yMax - yMin;
      const yLoop = yMin + ((t * speed) % range);
      const zWiggle = Math.sin(0.4 * t) * 7;

      groupRef.current.position.set(0, yLoop, zWiggle);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Balloon Envelope */}
      <mesh>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Strings */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                1, -1, 0, 1, -4, 0, -1, -1, 0, -1, -4, 0, 0.5, -1, 1, 0.5, -4,
                1, -0.5, -1, 1, -0.5, -4, 1,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineDashedMaterial color="#00ffff" dashSize={0.3} gapSize={0.2} />
      </lineSegments>

      {/* Basket Frame */}
      <group position={[0, -4.5, 0]}>
        <mesh>
          <boxGeometry args={[2, 1.5, 1.5]} />
          <meshStandardMaterial
            color="#004466"
            transparent
            opacity={0.15}
            emissive="#00ffff"
            roughness={0.5}
          />
        </mesh>

        {/* Grid Lines */}
        {Array.from({ length: 11 }).map((_, i) => {
          const x = -0.95 + i * 0.19;
          return (
            <lineSegments key={`v-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([x, -0.75, 0.76, x, 0.75, 0.76]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ffff" />
            </lineSegments>
          );
        })}
        {Array.from({ length: 9 }).map((_, j) => {
          const y = -0.75 + j * 0.19;
          return (
            <lineSegments key={`h-${j}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-0.95, y, 0.76, 0.95, y, 0.76]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ffff" />
            </lineSegments>
          );
        })}
      </group>

      {/* Hanging Email Card */}
      <group position={[0, -5.3, 0]}>
        {/* Wires */}
        {[-0.8, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.6, 6]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}

        <RoundedBox
          position={[0, 0, 0]}
          args={[2.7, 0.5, 0.1]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial
            color="#001f33"
            emissive="#00ffff"
            emissiveIntensity={0.4}
            roughness={0.4}
            metalness={0.2}
          />
        </RoundedBox>

        <Text
          position={[0, 0, 0.06]}
          fontSize={0.22}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          physicsscifac@gmail.com
        </Text>
      </group>

      {/* Flickering Flame */}
      <mesh ref={flameRef} position={[0, -3.2, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff6600"
          emissiveIntensity={4}
          transparent
          opacity={0.1}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
