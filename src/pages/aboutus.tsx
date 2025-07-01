import React from "react";
import { useNavigate } from "react-router-dom";

const cardStyle: React.CSSProperties = {
  width: "240px",
  height: "120px",
  background: "#111",
  border: "2px dotted #00ffff",
  borderRadius: "12px",
  color: "#00ffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Orbitron, sans-serif",
  fontSize: "1.4rem",
  letterSpacing: "1px",
  boxShadow: "0 0 15px #00ffff66",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  userSelect: "none",
};

const hoverStyle: React.CSSProperties = {
  transform: "scale(1.08)",
  boxShadow: "0 0 25px #00ffff88",
};

export const AboutUs = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState<string | null>(null);

  const options = [
    { label: "Our Story", path: "/history" },
    { label: "Our Team", path: "/team" },
  ];

  return (
    <div
      style={{
        background: "#000",
        width: "100vw",
        height: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        gap: "40px",
      }}
    >
      <h1
        style={{
          color: "#00ffff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "3.8rem",
          textShadow: "0 0 12px #00ffffaa",
        }}
      ></h1>

      {/* Our Mission Floating Card (non-clickable) */}
      <div
        style={{
          width: "80%",
          maxWidth: "800px",
          background: "#111",
          border: "2px dotted #00ffff",
          borderRadius: "16px",
          color: "#00ffff",
          padding: "24px 32px",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.2rem",
          textAlign: "center",
          boxShadow: "0 0 20px #00ffff66",
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <h1>OUR MISSION </h1>
        Our mission is to inspire students to develop an interest in science and
        technology, and to encourage them to apply that knowledge creatively and
        practically.
      </div>

      {/* Floating Navigation Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {options.map((opt) => (
          <div
            key={opt.label}
            style={{
              ...cardStyle,
              ...(hovered === opt.label ? hoverStyle : {}),
            }}
            onClick={() => navigate(opt.path)}
            onMouseEnter={() => setHovered(opt.label)}
            onMouseLeave={() => setHovered(null)}
          >
            {opt.label}
          </div>
        ))}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
