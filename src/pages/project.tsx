import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Box } from "@react-three/drei";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";
import { FloatingChatBot } from "../pages/floatingbot";

interface Event {
  month: string;
  title: string;
  description?: string;
}

function getImageFolder(month: string | undefined) {
  return (month || "").toLowerCase().replace(/\s+/g, "").replace(/[^\w]/g, "");
}

const events: Event[] = [
  {
    month: "Aug 2024",
    title: "Annual General Meeting ",
    description: `
    Annual General Meeting – 28th August 2024

Venue: Physics Lecture Theater I, Faculty of Science, University of Ruhuna

The Annual General Meeting of the Physics Society was held on 28th August 2024, marking a pivotal moment in the society’s journey. It was an inspiring gathering filled with reflection, planning, and renewed ambition.

During the session, a new board was officially appointed to lead the society into the upcoming academic year. Members collaboratively voted on important constitutional updates, ensuring that the society continues to evolve in line with its goals and values. The meeting also served as a platform for brainstorming fresh event ideas, laying the groundwork for an exciting and engaging year ahead.

Our esteemed Patron Prof. G. D. K. Mahanama offered insightful advice and encouragement, while the newly elected President Ms. Vishadhi Liyanage delivered a motivating speech, sharing her vision for the future and her commitment to fostering a vibrant, inclusive community.

The AGM was not just an administrative meeting, it was a celebration of the society’s intellectual curiosity and collaborative spirit.
    `,
  },
  {
    month: "Sep 2024",
    title: "Solar Observation & Stellar Night 2.0 ",
    description: `

Solar Observation at "SAHASAK NIMAVUM" – 25th September 2024
Venue: University of Ruhuna

On 25th September 2024, the Physics Society of the University of Ruhuna proudly hosted a fascinating Solar Observation event as part of the "SAHASAK NIMAVUM" National Exhibition for Inventions and Innovations. The event was specially designed to engage school students, with parents and teachers also joining in on this exciting astronomical adventure.

This hands-on event sparked curiosity and inspired young minds to explore the wonders of science and technology. It provided a unique opportunity for participants to experience solar observation first-hand, offering valuable learning outside the classroom.

A special thanks to Mr. Kanishka Samararathna for his expert guidance in telescope setup and observation, making the experience even more impactful.

A big thank you to everyone who took part in making this event a stellar success. Let’s continue reaching for the stars!



Stellar Night 2.0: A Journey Through the Cosmos – 30th September 2024
Venue: University of Ruhuna 

Stellar Night 2.0 was an unforgettable evening of stargazing, exploration, and learning. We are grateful to everyone who joined us under the stars for this cosmic adventure. The event began with an insightful lecture on night sky observation by Mr. Kanishka Samararathna, who expertly guided attendees through the basics of stargazing and identifying key celestial objects.

Following the lecture, attendees enjoyed an engaging astronomy-related movie, offering both entertainment and educational value. As the night unfolded, participants had the opportunity to observe some incredible sights during the stargazing session, including Jupiter with its four moons, the Orion constellation, and many other stunning celestial wonders.

A big thank you to all who joined us for this memorable night, and we look forward to more cosmic adventures ahead!
`,
  },
  {
    month: "Oct 2024",
    title: "Notice Boards Launch & Telescope Workshop",
    description: `
Notice Boards Launch

Venue: Department of Physics Premises, University of Ruhuna

For the first time, the Physics Society launched two new notice boards at the Department of Physics premises. These notice boards are designed to serve as a central hub for sharing important updates, news, and exciting developments within the society and the broader field of physics.

The boards will feature a variety of content, including articles, announcements about upcoming events, and even some fun physics memes to engage the community. It’s an accessible and interactive way for members to stay informed, get involved, and share their ideas.

This initiative marks an exciting new chapter for the Physics Society, providing both a practical and entertaining resource for students and faculty alike.

Telescope Workshop – 9th October 2024
Venue: Physics Lecture Theater I & University Grounds, University of Ruhuna

On 9th October 2024, the Physics Society of the University of Ruhuna hosted an enriching Telescope Workshop, offering participants a hands-on experience to explore the wonders of the universe. The workshop began with a lecture by Ms. Vishadhi Liyanage, President of the Physics Society, who delivered an insightful talk on optical telescopes and their operations, providing attendees with a deeper understanding of how telescopes help us observe the cosmos.

Following the lecture, Mr. Kanishka Samararathna guided attendees through the practical aspects of using telescopes, ensuring that everyone had the chance to try their hand at stargazing and observing celestial objects up close.

The event was a fantastic opportunity for stargazing enthusiasts to enhance their knowledge and skills in astronomy, bringing the wonders of the universe closer to our passionate community.


`,
  },
  {
    month: "Nov 2024",
    title: "The Next Chapter: Interview Series  ",

    description: `
    The Next Chapter: Interview Series 


The Next Chapter interview series was designed specifically for those eager to explore new opportunities, push boundaries, and shape the future. This series offered exclusive insights into higher education opportunities, scholarships, and the journeys of students who have successfully ventured abroad for their studies.

Through insightful interviews with past students from the Department of Physics, we brought the experts straight to our community. Each day featured a new story of success, offering guidance on navigating the challenges of studying abroad and discovering opportunities you can seize.

Day 1: Mr. Senaka Madusanka – University of Münster, Germany
Day 2: Ms. Thilini Thilakarathne & Ms. Uththara Kavindi – University of North Dakota, USA
Day 3: Mr. Heshan Malinda – Aalto University, Finland
Day 4: Mr. Amila Nirosh – Nagaoka University of Technology, Japan
Day 5: Mr. Moditha Wijethunga – Hong Kong University of Science and Technology, China

Whether you’re considering studying abroad, looking for scholarships, or exploring higher education options, The Next Chapter series provided the knowledge and inspiration you need to turn your dreams into reality.



`,
  },
  {
    month: "Dec 2024",
    title:
      "Astro Photo Booth & Solar Observation Stall & Sandwich Stall & Muon Detector Launch",
    description: `
Astro Photo Booth & Solar Observation Stall + Sandwich Stall – 18th December 2024

Venue: University Grounds, University of Ruhuna

On 18th December 2024, the Physics Society participated in Science Faculty Day, offering two exciting stalls that combined science and refreshments.

Solar Observation & Astro Photo Booth  
Time: 10 AM onwards  
For just Rs. 100, attendees could experience a unique opportunity to observe the Sun through our telescope. They also had the chance to capture a personalized photo at our Astro Photo Booth, making it a fun and engaging way to learn more about the solar system.

Sandwich Stall  
Time: 9 AM onwards  
The Sandwich Stall served fresh, delicious sandwiches filled with melted cheese, eggs, and crunchy vegetables, a perfect treat to fuel attendees for the day.

The event provided an excellent chance to connect with the university community, share knowledge, and enjoy some tasty snacks.


Muon Detector Launch – 22nd December 2024
Venue: Department of Physics Mini Auditorium, University of Ruhuna

On 22nd December 2024, the Physics Society proudly hosted the Muon Detector Launch at the Department of Physics Mini Auditorium. This groundbreaking event marked the official introduction of the society’s new muon detector, a significant step forward in our engagement with experimental physics.

The launch provided an opportunity for students and faculty alike to learn about the technology behind the detector, its applications in physics research, and its potential for hands-on learning experiences. The event highlighted the society’s commitment to fostering scientific curiosity and innovation within the university community.

With the support of faculty members and the enthusiasm of our students, the launch was a memorable milestone in the society's ongoing efforts to deepen engagement with experimental physics.



  `,
  },
  {
    month: "Jan 2025",
    title: "CERN TALKS & Iced Coffee and Sandwich Stall",
    description: `
CERN TALKS – 22nd January 2025
Venue: Physics Mini Auditorium, University of Ruhuna

The Physics Society proudly hosted CERN TALKS, a captivating series of sessions that culminated in its final event on 22nd January 2025. The highlight of the series was a guest lecture by Prof. Archana Sharma, Senior Scientist at CERN, who unveiled the mysteries of dark matter and shared insights into the deepest secrets of the universe.

The event began with a warm welcome from the Society President, Ms. Vishadhi Liyanage, followed by a heartfelt vote of thanks from the Head of the Department of Physics, Dr. J. A. P. Bodhika. As a token of appreciation, both Dr. Bodhika and Ms. Liyanage presented tokens of appreciation to Prof. Sharma in recognition of her inspiring contribution.

Leading up to the finale, two insightful introductory sessions were conducted by Dr. Kalpanie Liyanage and Dr. Ishan Darshana, laying the groundwork for deeper engagement with CERN’s work and the field of particle physics.

This event marked the grand conclusion of the CERN TALKS series, leaving attendees inspired and intellectually energized.
 
Iced Coffee & Sandwich Stall at RUSS 2025 – 23rd January 2025
Venue: University of Ruhuna – RUSS 2025

On 23rd January 2025, the Physics Society of the University of Ruhuna brought energy and flavor to RUSS 2025 by hosting a lively iced coffee and sandwich stall, and it was a fantastic success!

The stall served as more than just a refreshment stop, it was a space for connection, laughter, and community. Students and staff alike dropped by to enjoy delicious homemade treats while supporting the society’s fundraising efforts for upcoming events and initiatives.

We’re incredibly grateful to everyone who visited and showed their support. This small but meaningful event reminded us how powerful community spirit can be, and how much fun physics students can have outside the lab!

Here’s to more exciting, engaging, and tasty events in the future!



`,
  },

  {
    month: "Mar 2025",
    title: "Workshop on Personal Branding and LinkedIn",

    description: `

Workshop on Personal Branding & LinkedIn – 5th March 2025

Venue: Physics Lecture Theater II, University of Ruhuna

On 5th March 2025, the Physics Society hosted a highly successful Personal Branding & LinkedIn Workshop that provided valuable insights into building a strong personal brand and using LinkedIn as a powerful tool for career growth.

The workshop was led by Mr. Sukhith Mendis, whose engaging presentation helped attendees understand the importance of cultivating an online presence and networking effectively.

Participants left with actionable strategies to:

Network effectively and enhance their online presence

Strengthen both their personal and professional brands

We extend our heartfelt thanks to all the participants for their enthusiasm and engagement, making this workshop a memorable and impactful event.`,
  },

  {
    month: "Jul 2025",
    title: "The Horizon Magazine",
    description: `

The Horizon Magazine Revival


We are thrilled to announce the revival of The Horizon Magazine, our very own Physics Society magazine, making its comeback after a 28-year hiatus since its last publication in 1996. This historic return allows both students and faculty members to contribute their articles, artistic works, and other creative content, offering a platform to share knowledge, ideas, and artistic expression within the Physics Society.

The magazine’s previous edition was published by Prof. G. D. K. Mahanama when he was a student, marking a memorable chapter in the society’s history. With its revival, The Horizon promises to be an exciting avenue for creativity and academic collaboration, enriching the society’s legacy.






`,
  },
];

// === Precomputed Static Image Positions (Guaranteed No Overlap, Grid-Based) ===
const staticImagePositions = Array.from({ length: 9 }, (_, i) => {
  const cols = 3;
  const spacingX = 29;
  const spacingY = 35;
  const startX = 5;
  const startY = 5;

  const col = i % cols;
  const row = Math.floor(i / cols);

  const left = startX + col * spacingX + Math.random() * 3 - 1;
  const top = startY + row * spacingY + Math.random() * 2 - 1;

  const size = 350 + Math.random() * 100;
  const rotate = (Math.random() - 0.5) * 30;

  return {
    top,
    left,
    size,
    rotate,
    index: i % 10,
  };
});

function EventBlock({
  position,
  month,
  title,
  onClick,
  onClickDisabled,
}: {
  position: [number, number, number];
  month: string;
  title: string;
  onClick: () => void;
  onClickDisabled: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = Math.sin(t + position[0]) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position} onClick={onClick}>
      <Box args={[2.5, 1, 0.3]}>
        <meshStandardMaterial
          color="#00aaff"
          emissive="#00ffff"
          emissiveIntensity={1.2}
          metalness={0.6}
          roughness={0.2}
        />
      </Box>
      {!onClickDisabled && (
        <Html distanceFactor={10} position={[0, 0.8, 0]}>
          <>
            <div
              style={{
                transform: "translate(-50%, -50%)",
                background: "rgba(0, 26, 51, 0.85)",
                padding: "10px 16px",
                borderRadius: "10px",
                border: "1px solid #00ffff",
                color: "#00ffff",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1.2rem",
                textAlign: "center",
                minWidth: "140px",
                boxShadow: "0 0 12px #00ffff99",
                backdropFilter: "blur(5px)",
              }}
            >
              <strong style={{ fontSize: "1.4rem" }}>{month}</strong>
            </div>
            {(() => {
              const parts = title.split("&").map((t) => t.trim());
              return parts.map((subTitle, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${70 + i * 70}px`,
                    left: `${i % 2 === 0 ? -40 : 40}px`,
                    background: "rgba(0, 26, 51, 0.8)",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #00ffff",
                    color: "#00ffff",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                    boxShadow: "0 0 10px #00ffff66",
                    transform: `rotate(${(Math.random() - 0.5) * 10}deg)`,
                    fontFamily: "Orbitron, sans-serif",
                  }}
                >
                  {subTitle}
                </div>
              ));
            })()}
          </>
        </Html>
      )}
    </group>
  );
}

function CameraScroll({ scroll }: { scroll: number }) {
  const { camera } = useThree();
  const { x } = useSpring({
    x: scroll * 3,
    config: { mass: 1, tension: 120, friction: 30 },
  });
  useFrame(() => {
    const camX = x.get();
    camera.position.set(camX, 4, 10);
    camera.lookAt(camX, 0, 0);
  });
  return null;
}

export const Projects = () => {
  const [scroll, setScroll] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const container = document.getElementById("timeline-scroll");
    if (!container) return;
    const onScroll = () => {
      const scrollPercent =
        container.scrollLeft / (container.scrollWidth - container.clientWidth);
      setScroll(scrollPercent * (events.length - 1));
    };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="timeline-scroll"
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "scroll",
        overflowY: "hidden",
        background: "black",
        whiteSpace: "nowrap",
      }}
    >
      {selectedEvent && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "40%",
              background: "#000",
              color: "#00ffff",
              fontFamily: "Orbitron, sans-serif",
              padding: "30px 50px",
              overflowY: "auto",
              height: "100vh",
            }}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                marginBottom: "20px",
                padding: "10px 20px",
                background: "#00ffff",
                color: "#001a33",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 0 8px #00ffff88",
              }}
            >
              ← Back to Timeline
            </button>
            <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
              {selectedEvent.month} – {selectedEvent.title}
            </h1>
            <div
              style={{
                background: "#001a33",
                borderRadius: "12px",
                padding: "30px",
                lineHeight: 1.7,
                fontSize: "1.05rem",
                boxShadow: "0 0 12px #00ffff22",
                border: "1px solid #00ffff33",
                height: "calc(100vh - 220px)",
                overflowY: "auto",
              }}
            >
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {selectedEvent.description}
              </pre>
            </div>
          </div>
          <div
            style={{
              width: "60%",
              height: "100vh",
              position: "relative",
              background: "#000",
              overflow: "hidden",
            }}
          >
            {staticImagePositions.map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  width: `${pos.size}px`,
                  height: `${pos.size * 0.7}px`,
                  backgroundImage: `url('${
                    process.env.PUBLIC_URL
                  }/images/${getImageFolder(selectedEvent?.month)}/${
                    pos.index + 1
                  }.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                  boxShadow: "0 0 12px #00ffff55",
                  transform: `rotate(${pos.rotate}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          width: `${events.length * 300}px`,
          height: "100vh",
          position: "relative",
        }}
      >
        <Canvas
          style={{ position: "absolute", top: 0, left: 0 }}
          camera={{ position: [0, 4, 10], fov: 45 }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 20, 10]} intensity={1.5} />
          <CameraScroll scroll={scroll} />
          {events.map((event, i) => (
            <EventBlock
              key={i}
              position={[i * 3.5, 0, 2]}
              month={event.month}
              title={event.title}
              onClick={() => event.description && setSelectedEvent(event)}
              onClickDisabled={!!selectedEvent}
            />
          ))}

          <mesh
            position={[events.length * 1.5, 0, 2]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.08, 0.08, events.length * 3 + 8, 32]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={5}
              transparent
              opacity={0.9}
            />
          </mesh>
          {!selectedEvent && (
            <Html position={[-12, 2.5, -5]} distanceFactor={10}>
              <div
                style={{
                  background: "rgba(0, 26, 51, 0.75)",
                  padding: "20px 28px",
                  borderRadius: "12px",
                  border: "1px solid #00ffffaa",
                  color: "#00ffff",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "3.0rem",
                  lineHeight: 1.6,
                  maxWidth: "920px",
                  boxShadow: "0 0 12px #00ffff88",
                  backdropFilter: "blur(5px)",
                  textAlign: "center",
                }}
              >
                “In the silence between stars and <br /> the spark between
                minds, we found <br /> our gravity — pulling ideas, <br />{" "}
                people, and purpose into one <br /> radiant orbit”
              </div>
            </Html>
          )}
        </Canvas>
        <FloatingChatBot />
      </div>
    </div>
  );
};
