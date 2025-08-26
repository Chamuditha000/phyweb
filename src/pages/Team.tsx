import React from "react";

const members = [
  {
    name: "Prof. G D K Mahanama",
    role: "Patron",
    image: process.env.PUBLIC_URL + "/img/16.jpg",
  },
  {
    name: "Dr. H.A.D.S.D Perera",
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
    image: process.env.PUBLIC_URL + "/img/20.jpg",
  },
];

const layout = [2, 3, 4, 7]; // cards per row

function chunkByLayout<T>(items: T[], layout: number[]) {
  const rows: T[][] = [];
  let i = 0;
  for (const count of layout) {
    rows.push(items.slice(i, i + count));
    i += count;
  }
  return rows;
}

export const Team: React.FC = () => {
  const rows = chunkByLayout(members, layout);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#000",
        color: "#fcfeffff",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 16px" }}>
        <h1
          style={{
            margin: "0 0 78px",
            color: "#00ffff",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 2,
            fontSize: "3rem",
          }}
        >
          OUR TEAM
        </h1>

        {rows.map((row, rIdx) => (
          <div
            key={rIdx}
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "nowrap",
              marginBottom: 16,
            }}
          >
            {row.map((m, i) => (
              <div
                key={i}
                style={{
                  width: "min(18vw, 200px)",
                  background: "#111",
                  border: "1px solid #222",
                  borderRadius: 8,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image area keeps a 3:4 ratio */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3 / 4",
                    background: "#0a0a0a",
                  }}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Caption */}
                <div style={{ padding: "8px 10px", textAlign: "center" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.2,
                      fontSize: 14,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                    title={m.name}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      color: "#42befcff",
                      fontSize: 12,
                      marginTop: 2,
                      lineHeight: 1.2,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                    title={m.role}
                  >
                    {m.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
