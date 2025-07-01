import { useState, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

type QA = {
  q: string;
  a: string;
};

export const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [qaData, setQaData] = useState<QA[]>([]);

  const stopWords = new Set([
    "the",
    "is",
    "at",
    "which",
    "on",
    "a",
    "an",
    "of",
    "for",
    "to",
    "in",
    "and",
    "by",
    "who",
    "what",
    "when",
    "where",
    "how",
  ]);

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((word) => word && !stopWords.has(word));

  const levenshtein = (a: string, b: string): number => {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] =
          b[i - 1] === a[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j - 1] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1
              );
      }
    }
    return matrix[b.length][a.length];
  };

  const getBotReply = (input: string): string => {
    const inputWords = normalize(input);
    let bestScore = 0;
    let bestAnswer = "";

    for (const { q, a } of qaData) {
      const questionWords = normalize(q);
      let score = 0;

      for (const word of inputWords) {
        if (questionWords.includes(word)) score += 2;
        else if (questionWords.find((qw) => levenshtein(word, qw) <= 2))
          score += 1;
      }

      if (score > bestScore) {
        bestScore = score;
        bestAnswer = a;
      }
    }

    return bestScore > 0
      ? bestAnswer
      : "I'm here to help you learn about the Physics Society or Horizon Magazine. Could you rephrase your question?";
  };

  const handleSend = () => {
    if (!input.trim() || qaData.length === 0) return;
    const userMessage: Message = { sender: "user", text: input };
    const botMessage: Message = { sender: "bot", text: getBotReply(input) };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/17ZBMgGf0pulGLEyTz8fvSTK3W_fEwP-XumKlx8OGLwk/Sheet1"
    )
      .then((res) => res.json())
      .then((data) => {
        const formatted: QA[] = data.map((row: any) => ({
          q: (row["Question"] || row[" Question"] || "").trim(),
          a: (row["Answer"] || row[" Answer"] || "").trim(),
        }));
        setQaData(formatted);
      })
      .catch((err) => console.error("Error loading Q&A data:", err));
  }, []);

  useEffect(() => {
    if (open && messages.length === 0 && qaData.length > 0) {
      setMessages([
        {
          sender: "bot",
          text: "Hi! Ask me anything about the Physics Society or Horizon Magazine.",
        },
      ]);
    }
  }, [open, qaData]);

  // Inject floating animation CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes floatBot {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }

      @keyframes floatPanel {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
        100% { transform: translateY(0px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: "20px",
          bottom: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#00aaff",
            color: "white",
            fontSize: "30px",
            border: "none",
            boxShadow: "0 0 15px #00f0ff, 0 0 30px #00f0ff66",
            cursor: "pointer",
            animation: "floatBot 4s ease-in-out infinite",
          }}
        >
          💬
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            left: "20px",
            bottom: "100px",
            width: "320px",
            height: "400px",
            backgroundColor: "#001f33",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
            fontFamily: "'Inter', sans-serif",
            animation: "floatPanel 7s ease-in-out infinite",
          }}
        >
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "6px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender === "user" ? "#00aaff" : "#003344",
                    color: "#fff",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #00aaff" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me about physics society..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "#002233",
                color: "#fff",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                backgroundColor: "#00aaff",
                border: "none",
                color: "white",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};
