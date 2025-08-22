import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Plane } from "@react-three/drei";
import * as THREE from "three";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function RotateCameraZ() {
  const { camera } = useThree();

  useEffect(() => {
    camera.rotation.y = Math.PI / 3; // ✅ ~22.5° Z-axis rotation
  }, [camera]);

  return null;
}
const imageScaleList = [1.0, 1.0, 1.0, 1.0]; // e.g., enlarge first row images
const members = [
  {
    name: "Prof. G D K Mahanama",
    role: "Patron",
    image: process.env.PUBLIC_URL + "/img/16.jpg",
  },
  {
    name: "Dr. H.A.D. Saranga Dilruk Perera",
    role: "Senior Treasurer",
    image: process.env.PUBLIC_URL + "/img/15.jpg",
  },
  {
    name: "Dineth Dewminda",
    role: "Vice President",
    image: process.env.PUBLIC_URL + "/img/13.jpg",
  },
  {
    name: "Ms. Vishadhi Liyanage",
    role: "President",
    image: process.env.PUBLIC_URL + "/img/10.jpg",
  },
  {
    name: "Mr. Nimesh Sasindra",
    role: "Secretary",
    image: process.env.PUBLIC_URL + "/img/11.jpg",
  },
  {
    name: "Mr.Ashintha Pansilu",
    role: "Vice Secretary",
    image: process.env.PUBLIC_URL + "/img/1.jpg",
  },
  {
    name: "Ms.Amasha Herath",
    role: "Editor",
    image: process.env.PUBLIC_URL + "/img/3.jpg",
  },
  {
    name: "Mr.Haritha Pathiraja",
    role: "Junior Treasurer",
    image: process.env.PUBLIC_URL + "/img/5.jpg",
  },
  {
    name: "Mr.Supun Dissanayake",
    role: "Junior Editor",
    image: process.env.PUBLIC_URL + "/img/12.jpg",
  },
  {
    name: "Mr.Meghaka Ravishka",
    role: "Committee Member",
    image: process.env.PUBLIC_URL + "/img/7.jpg",
  },
  {
    name: "Ms.Kalpani Weerasekara",
    role: "Committee Member",
    image: process.env.PUBLIC_URL + "/img/6.jpg",
  },
  {
    name: "Mr.Avishka Maduwantha",
    role: "Committee Member",
    image: process.env.PUBLIC_URL + "/img/2.jpg",
  },
  {
    name: "Ms.Nimeshi Madhushika",
    role: "Committee Member",
    image: process.env.PUBLIC_URL + "/img/8.jpg",
  },
  {
    name: "Mr.Tharindu Prabhath",
    role: "Committee Member",
    image: process.env.PUBLIC_URL + "/img/9.jpg",
  },
  {
    name: "Ms.Hashani Aranayake",
    role: "Committee Member",
    image: process.env.PUBLIC_URL + "/img/4.jpg",
  },
  {
    name: "Mr.Chamuditha Dissanayake",
    role: "Committee Member",
    image: process.env.PUBLIC_URL + "/img/14.jpg",
  },
];

function FloatingCard({
  position,
  member,
  imageScale = 1.0,
}: {
  position: [number, number, number];
  member: any;
  imageScale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3;
    ref.current.rotation.y = t * 0.2; // 🌀 slow rotation
  });

  return (
    <group position={position} ref={ref}>
      {/* === Glow Plane Behind === */}

      <Plane args={[8.8, 13.5]}>
        <meshStandardMaterial color="#111" />
        <Html center distanceFactor={3.8}>
          <div
            style={{
              width: `${1000 * imageScale}px`,
              height: `${1780 * imageScale}px`,
              background: "#111",
              border: "1px solid #00ffff",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: `
        0 0 10px #00ffff,
        0 0 20px #00ffff,
        0 0 30px #00ffff66
      `,
              color: "#00ffff",
              fontFamily: "Orbitron, sans-serif",
              textAlign: "center",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100%",
                height: `${1400 * imageScale}px`,
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "5px" }}>
              <h1 style={{ margin: 0, fontSize: "5.0rem" }}>{member.name}</h1>
              <p style={{ margin: 0, color: "#ccc", fontSize: "5.0rem" }}>
                {member.role}
              </p>
            </div>
          </div>
        </Html>
      </Plane>
    </group>
  );
}

export const Team = () => {
  const layout = [2, 3, 4, 7]; // cards per row

  const spacingXList = [10, 12, 14, 9]; // horizontal spacing per row
  const rowZList = [-10, -10, -10, -10]; // depth per row (Z)
  const rowYList = [-8, -3, 2, 8]; // vertical height per row (Y)

  const positions: [number, number, number][] = [];
  let idx = 0;
  const memberMeta: {
    position: [number, number, number];
    member: any;
    imageScale: number;
  }[] = [];
  layout.forEach((count, rowIndex) => {
    const spacingX = spacingXList[rowIndex] ?? 10;
    const z = rowZList[rowIndex] ?? -rowIndex * 25;
    const y = rowYList[rowIndex] ?? -4;

    for (let i = 0; i < count; i++) {
      const x = (i - (count - 1) / 2) * spacingX;
      const pos: [number, number, number] = [x, y, z];
      positions.push(pos);
      memberMeta.push({
        position: pos,
        member: members[idx],
        imageScale: imageScaleList[rowIndex] ?? 1.0,
      });
      idx++;
    }
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 9, 55], fov: 30 }}>
        <RotateCameraZ />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 20, 20]} intensity={1.2} />
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
          minDistance={20}
          maxDistance={80}
        />
        {memberMeta.map((item, i) => (
          <FloatingCard
            key={i}
            position={item.position}
            member={item.member}
            imageScale={item.imageScale}
          />
        ))}
      </Canvas>

      {/* Bottom-left heading */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "30px",
          color: "#00ffff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "5rem",
          letterSpacing: "3px",
          textShadow: "0 0 10px #00ffff99",
        }}
      >
        OUR TEAM
      </div>
    </div>
  );
};
