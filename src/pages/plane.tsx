import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// === Wireframe Box ===
function WireframeBox({
  size,
  position = [0, 0, 0],
}: {
  size: [number, number, number];
  position?: [number, number, number];
}) {
  const geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(...size));
  return (
    <lineSegments geometry={geometry} position={position}>
      <lineBasicMaterial color="#00ffff" />
    </lineSegments>
  );
}

// === Wireframe Cylinder ===
function WireframeCylinder({
  radius,
  length,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  radialSegments = 8,
}: {
  radius: number;
  length: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  radialSegments?: number;
}) {
  const geometry = new THREE.EdgesGeometry(
    new THREE.CylinderGeometry(radius, radius, length, radialSegments)
  );
  return (
    <lineSegments geometry={geometry} position={position} rotation={rotation}>
      <lineBasicMaterial color="#00ffff" />
    </lineSegments>
  );
}

// === Sci-Fi Dotted Material ===
function DottedMaterial() {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#00ffff") },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          float lines = step(0.01, mod(vUv.y * 50.0, 1.0)) * step(mod(vUv.x * 5.0, 1.0), 0.1);
          gl_FragColor = vec4(color, lines);
        }
      `,
      transparent: true,
    });
  }, []);

  return <primitive object={material} attach="material" />;
}

// === Plane Component ===
function Plane() {
  const planeRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const takeoffStartZ = -2;
  const runwayLength = 60;
  const loopDuration = 30; // seconds before reset

  useFrame(({ clock }) => {
    timeRef.current += 0.016; // approx. 60fps frame delta
    const t = timeRef.current;

    const speed = 5;
    const z = takeoffStartZ - speed * t;
    const takeoffZ = takeoffStartZ - runwayLength * 0.6;

    if (planeRef.current) {
      planeRef.current.position.z = z;

      if (z < takeoffZ) {
        planeRef.current.position.y = (takeoffZ - z) * 0.2;
        planeRef.current.rotation.x = Math.PI / 18;
      } else {
        planeRef.current.position.y = 0.3;
        planeRef.current.rotation.x = 0;
      }

      // Loop condition
      if (t > loopDuration) {
        timeRef.current = 0;
      }
    }
  });

  return (
    <group ref={planeRef} position={[-10, 0.3, takeoffStartZ]}>
      <WireframeBox size={[1.6, 0.05, 0.4]} position={[0, 0.35, -0.3]} />
      <WireframeBox size={[0.05, 0.5, 0.3]} position={[0, 0.6, -1.2]} />
      <WireframeBox size={[0.5, 0.05, 0.2]} position={[0, 0.4, -1.2]} />
      <WireframeCylinder
        radius={0.2}
        length={1.5}
        radialSegments={32}
        position={[0, 0.3, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <WireframeBox size={[0.2, 0.2, 0.2]} position={[0.4, 0.15, -0.3]} />
      <WireframeBox size={[0.2, 0.2, 0.2]} position={[-0.4, 0.15, -0.3]} />
    </group>
  );
}

// === Runway Component ===
function Runway() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8, 0, -20]} receiveShadow>
      <planeGeometry args={[4, 40]} />
      <DottedMaterial />
    </mesh>
  );
}

// === Main Scene ===
export function PlaneTakeoffScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[15, 30, 15]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <Runway />
      <Plane />
    </>
  );
}
