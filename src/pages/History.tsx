import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const imageCount = 34;
const images = Array.from(
  { length: 34 },
  (_, i) => `${process.env.PUBLIC_URL}/imgg/story${i + 1}.jpg`
);
const getRandomRotation = () => Math.floor(Math.random() * 60 - 30); // -30° to +30°
const getRandomOffset = () => Math.floor(Math.random() * 40 - 20); // ±20px

export const History: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const storyAnimation = useSpring({
    transform: `translateX(${Math.min(scrollY * 1.2, 300)}px)`,
    config: { mass: 1.5, tension: 180, friction: 100 },
  });

  return (
    <div
      style={{
        minHeight: "250vh",
        background: "#f9f9fc",
        padding: "60px 20px",
        position: "relative",
        overflow: "hidden", // optional
      }}
    >
      {/* 🌌 Render background images first */}
      {images.map((src, i) => {
        const isLeft = i % 2 === 0;
        const top = `${(i / imageCount) * 400}vh`; // evenly spaced
        const rotation = getRandomRotation();
        const offset = getRandomOffset();
        return (
          <img
            key={i}
            src={src}
            alt={`story-img-${i}`}
            style={{
              position: "absolute",
              top,
              [isLeft ? "left" : "right"]: `${40 + offset}px`,
              maxWidth: "500px",
              maxHeight: "300px",
              width: "auto",
              height: "auto",
              transform: `rotate(${rotation}deg)`,
              borderRadius: "50px",
              boxShadow: "0 4px 10px rgba(55, 53, 53, 0.3)",
              zIndex: 5, // 👈 ensures under all text
            }}
          />
        );
      })}

      {/* 🏷️ Heading on top */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: 80,
          fontSize: "2.5rem",
          fontFamily: "Georgia, serif",
          position: "relative",
          zIndex: 10,
        }}
      >
        Our Story: The Journey of the Physics Society
      </h1>

      {/* 📜 Text block on top */}
      <animated.div
        style={{
          ...storyAnimation,
          maxWidth: "800px",
          margin: "0 auto",
          background: "#c4c8d053",
          padding: "30px 40px",
          borderRadius: "12px",
          color: "black",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          fontSize: "1.2rem",
          lineHeight: 1.8,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* ✍️ Long story paragraphs here */}

        {/* Your full story text goes here */}
        <p>
          Physics Society of the University of Ruhuna is built on a foundation
          of curiosity, collaboration, and a commitment to scientific growth.
          Its story is deeply interwoven with the history of the Department of
          Physics, which was established in 1978 as one of the original five
          departments of the Faculty of Science. From its inception, Physics has
          been a core subject within the Physical Science degree programme.
          However, it wasn’t until 1994 that students were allowed to pursue a
          complete Special Degree in Physics independently. Before that, the
          special degree was conducted jointly with the University of Kelaniya.
          The launch of the independent special degree marked a major academic
          advancement — and also coincided with the birth of a student-led
          initiative that would become a lasting symbol of unity and
          intellectual engagement: the Physics Society. That same year, 1994,
          the very first batch of special degree students founded the Physics
          Society with a vision that extended beyond academics. They created a
          vibrant platform where students could explore science beyond
          textbooks, exchange ideas, organize activities, and build a strong
          academic community. One of their most innovative contributions was the
          launch of The Horizon — the official magazine of the Society. The
          first edition, entirely handwritten, reflected a deep sense of
          commitment and creativity. In 1996, a printed version was published
          under the editorship of a student who would later become Prof. G. D.
          K. Mahanama, now the Patron of the Society. Following that issue,
          however, the Horizon was not continued. While the Physics Society
          itself was re-established every year by successive batches, the
          magazine remained dormant for nearly 29 years. Still, the spirit of
          the Society persisted, sustained through workshops, lectures,
          student-led initiatives, and a culture of academic engagement. In
          recent years, this spirit has been reignited with renewed energy. A
          new generation of students brought forth a revival of the Society’s
          full potential, launching a range of diverse, inclusive, and impactful
          activities that have restored the Society’s place as a dynamic force
          within the department.
        </p>
        <p>
          The resurgence can be traced back to a string of meaningful events. In
          2022, the Society organized a creative Art Competition during the
          annual Faculty Day, blending artistic expression with scientific
          enthusiasm. That same year, students hosted herbal porridge and wood
          apple juice stalls for fundraising, demonstrating not only creativity
          but also strong community spirit. In 2023, the Society stepped
          confidently into academic engagement. A Zoom session on Higher Studies
          Opportunities in the United States was conducted by Dr. Udara
          Saparamadu, providing practical guidance for students aspiring to
          study abroad. Later that year, students had the rare opportunity to
          attend a special lecture on Astrobiology and NASA’s Search for Life in
          the Universe, delivered by Dr. Henry Throop, an international expert
          affiliated with NASA. This inspiring session was coupled with a solar
          observation experience at the department itself. Meanwhile, the
          Society expanded its reach through digital platforms. In 2023, it
          launched an initiative to share student-written physics content on its
          official Facebook page, empowering undergraduates to express their
          knowledge publicly. Another social media initiative, titled “Physics
          Through Time”, presented a timeline of major discoveries and moments
          in physics history, fostering historical awareness in a creative and
          engaging format. Also in 2023, the Physics Society played a vital role
          in supporting innovation at the Sahasak Nimavum National Exhibition,
          where numerous student inventors were given a platform to showcase
          their work to a national audience. It was a proud moment of exposure
          and encouragement for science-driven creativity. Then came the
          defining academic year of 2024–2025. In August 2024, the Society
          launched its activities with the Annual General Meeting, where a new
          board of office bearers was elected and key constitutional reforms
          were adopted. This milestone laid the groundwork for a year filled
          with purposeful and high-impact events. In September, the Society
          returned to Sahasak Nimavum, this time organizing a Solar Observation
          event for schoolchildren and the public. A few days later, Stellar
          Night 2.0 brought students together under the stars for a night of
          telescope viewing, astronomy films, and expert-led discussions.
          Momentum continued in October with the installation of two new
          departmental notice boards, managed by students to share articles,
          updates, memes, and event news. The same month, a hands-on Telescope
          Workshop gave undergraduates the chance to learn celestial navigation
          and telescope mechanics in a practical setting. In November, the
          Society hosted the Next Chapter Interview Series, featuring alumni
          currently pursuing postgraduate studies in countries such as Germany,
          the USA, Finland, Japan, and China. Their personal stories offered
          insight into global academic opportunities and inspired students to
          dream bigger. December featured a return to Faculty Day celebrations
          with three fun and educational stalls: Solar Observation, an Astro
          Photo Booth, and a Sandwich Stall. These events not only engaged
          students but also raised funds for future Society projects. Later that
          month, the launch of a Muon Detector at the department marked a step
          forward in experimental particle physics and hands-on learning. In
          January 2025, the Society hosted the CERN TALKS series, culminating in
          a remarkable session by Prof. Archana Sharma, Senior Scientist at
          CERN. This was preceded by foundation lectures from Dr. Kalpanie
          Liyanage and Dr. Ishan Darshana, which helped build understanding and
          enthusiasm leading up to the main event. Community-building continued
          into early 2025, with a refreshment stall at RUSS 2025 serving iced
          coffee and sandwiches, creating a space for relaxation, socializing,
          and fundraising. In March, a LinkedIn and Personal Branding Workshop
          helped students prepare for the modern job market with insights on
          building a professional online presence. Amidst these initiatives came
          a long-awaited return: the revival of The Horizon magazine in July
          2025. Nearly three decades after its last issue, the magazine returned
          as a vibrant platform for student voices, academic insights, and
          creative expression. Articles from students, lecturers, and alumni now
          once again find a home in its pages.
        </p>
        <p>
          This revival is not the product of any single effort — it is a
          reflection of the Society’s broader transformation into a space for
          continuous growth, inclusion, and scientific curiosity. Parallel to
          this student-driven revival, the Department of Physics has also
          achieved remarkable progress. Since 1978, the department has produced
          thousands of graduates who serve in industry, research, and education
          both in Sri Lanka and abroad. In 2022, the department was recognized
          as the Best University for Physics in Sri Lanka by Best Global
          Universities powered by Clarivate (USA) — a distinction earned through
          decades of dedication from faculty and staff. This success stands on
          the shoulders of pioneers like Prof. Keerthi Tennakoon, Prof. W.G.D.
          Dharmaratne, and Prof. Kanthi K.A.S. Yapa, as well as the continuous
          commitment of the current academic team. With the number of Special
          Degree students now increased to 15, the department is building
          stronger pathways for future physicists and researchers. Today, the
          Physics Society moves forward — not because of any single publication
          or event, but because of a collective spirit of inquiry,
          collaboration, and hope. Together, we reach higher, think deeper, and
          build a community where physics thrives — not just in labs, but in
          conversations, questions, and dreams shared by all of us.
        </p>
        {}
      </animated.div>
    </div>
  );
};
