import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Plane } from "@react-three/drei";
import * as THREE from "three";

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
}: {
  position: [number, number, number];
  member: any;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3;
  });

  return (
    <group position={position} ref={ref}>
      {/* === Glow Plane Behind === */}

      <Plane args={[4.8, 8.8]}>
        <meshStandardMaterial color="#111" />
        <Html center distanceFactor={3.6}>
          <div
            style={{
              width: "480px",
              height: "880px",
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
              style={{ width: "100%", height: "700px", objectFit: "cover" }}
            />
            <div style={{ padding: "8px" }}>
              <h1 style={{ margin: 0, fontSize: "2.5rem" }}>{member.name}</h1>
              <p style={{ margin: 0, color: "#ccc", fontSize: "2.9rem" }}>
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
  // Row structure: 3 - 2 - 4 - 7
  const layout = [2, 3, 4, 7];
  const rowZGap = 4;
  const rowY = 0;

  const positions: [number, number, number][] = [];
  let idx = 0;

  layout.forEach((count, rowIndex) => {
    const z = -rowIndex * rowZGap;
    for (let i = 0; i < count; i++) {
      const x = (i - (count - 1) / 2) * 3 + (Math.random() - 0.5); // centered + jitter
      positions.push([x, rowY, z]);
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
      <Canvas camera={{ position: [9, 12, 14], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={true}
          minDistance={2}
          maxDistance={10}
        />
        {members.map((member, i) => (
          <FloatingCard key={i} position={positions[i]} member={member} />
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
