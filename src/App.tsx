import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Introduction } from "./pages/intro";
import { Projects } from "./pages/project";
import { AboutUs } from "./pages/aboutus";
import { Team } from "./pages/Team";
import { Contact } from "./pages/contact";
import { ProfileBadge } from "./pages/profilebadge";
import { Magazine } from "./pages/Magazine";
import { GlobalHomeButton } from "./pages/home"; // 👈 Import here
import { Footer } from "./pages/footer";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<Introduction />} />
        <Route path="/project" element={<Projects />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/profilebadge" element={<ProfileBadge />} />
      </Routes>
      <Footer />
      {/* 🌟 Add globally visible floating Home button */}
      <GlobalHomeButton />
    </Router>
  );
};

export default App;
