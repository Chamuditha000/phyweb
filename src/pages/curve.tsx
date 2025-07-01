import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CurveLine() {
  const group = useMemo(() => new THREE.Group(), []);
  const particleRef = useRef<THREE.Mesh>(null);

  const radius = 0.1;
  const height = 1.5;
  const turns = 2;
  const centerX = -8;

  // Helix A
  const helixA = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2 * turns;
      const y = (i / 200) * height;
      const x = centerX + radius * Math.cos(t);
      const z = radius * Math.sin(t);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  // Helix B (phase-shifted)
  const helixB = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2 * turns + Math.PI;
      const y = (i / 200) * height;
      const x = centerX + radius * Math.cos(t);
      const z = radius * Math.sin(t);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const geometryA = useMemo(
    () => new THREE.TubeGeometry(helixA, 300, 0.035, 8, false),
    [helixA]
  );
  const geometryB = useMemo(
    () => new THREE.TubeGeometry(helixB, 300, 0.035, 8, false),
    [helixB]
  );

  const glowMaterialA = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff00ff",
        emissive: "#ff00ff",
        emissiveIntensity: 4.5,
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );
  const glowMaterialB = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0055ff", // 🔷 blue instead of pink
        emissive: "#0055ff",
        emissiveIntensity: 1.9,
        metalness: 0.3,
        roughness: 0.1,
      }),
    []
  );

  group.add(new THREE.Mesh(geometryA, glowMaterialA));
  group.add(new THREE.Mesh(geometryB, glowMaterialB));

  // Base pair cylinders
  useMemo(() => {
    for (let i = 0; i <= 50; i++) {
      const t = (i / 50) * Math.PI * 2 * turns;
      const y = (i / 50) * height;

      const ax = centerX + radius * Math.cos(t);
      const az = radius * Math.sin(t);

      const bx = centerX + radius * Math.cos(t + Math.PI);
      const bz = radius * Math.sin(t + Math.PI);

      const start = new THREE.Vector3(ax, y, az);
      const end = new THREE.Vector3(bx, y, bz);
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(end, start);
      const length = dir.length();

      const orientation = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize()
      );
      orientation.makeRotationFromQuaternion(quaternion);
      orientation.setPosition(mid);

      const color =
        i % 4 === 0
          ? "#ffff00"
          : i % 4 === 1
          ? "#ff6600"
          : i % 4 === 2
          ? "white"
          : "#9999ff";

      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.5,
        metalness: 0.3,
        roughness: 0.15,
      });

      const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, length, 8),
        material
      );
      cylinder.applyMatrix4(orientation);
      group.add(cylinder);
    }
  }, [group]);

  // Particle traveling along helixA (black color)
  const particle = useMemo(() => {
    const geom = new THREE.SphereGeometry(0.04, 12, 12);
    const mat = new THREE.MeshStandardMaterial({
      emissive: "white", //
      emissiveIntensity: 2,
      color: "white", //
      metalness: 0.5,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    return mesh;
  }, []);

  group.add(particle);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle DNA rotation
    group.rotation.y = Math.sin(t * 0.6) * 0.15;
    group.rotation.x = Math.sin(t * 0.3) * 0.15;
    // Particle motion along helix
    const u = (t * 0.1) % 1; // loop between 0–1
    const point = helixA.getPointAt(u);
    if (particleRef.current) {
      particleRef.current.position.copy(point);
    }
  });

  return (
    <>
      <primitive object={group} />
      <primitive object={particle} ref={particleRef} />
    </>
  );
}
