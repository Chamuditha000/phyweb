import { SetStateAction, useEffect, useRef, useState } from "react";
import "./MagazineUI.css";

export function MagazineUIControls() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12); // Default, can sync with PDF
  const [chapters] = useState([
    { name: "Intro", page: 1 },
    { name: "Science", page: 3 },
    { name: "Tech", page: 5 },
    { name: "Culture", page: 7 },
    { name: "Final", page: 11 },
  ]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const goToPage = (page: SetStateAction<number>) => {
    setCurrentPage(page);
    iframeRef.current?.contentWindow?.postMessage({ page }, "*");
  };

  useEffect(() => {
    const handleKey = (e: { key: string }) => {
      if (e.key === "ArrowRight")
        goToPage(Math.min(currentPage + 2, totalPages));
      if (e.key === "ArrowLeft") goToPage(Math.max(currentPage - 2, 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentPage]);

  return (
    <div className="magazine-ui">
      {/* Thumbnails */}
      <div className="thumbnails">
        {[...Array(totalPages)].map((_, i) => (
          <div
            key={i}
            className={`thumb ${i + 1 === currentPage ? "active" : ""}`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Prev/Next Arrows */}
      <button
        className="nav-button prev"
        onClick={() => goToPage(Math.max(currentPage - 2, 1))}
      >
        ◀
      </button>
      <button
        className="nav-button next"
        onClick={() => goToPage(Math.min(currentPage + 2, totalPages))}
      >
        ▶
      </button>

      {/* Page Scrubber */}
      <input
        className="scrubber"
        type="range"
        min={1}
        max={totalPages}
        step={1}
        value={currentPage}
        onChange={(e) => goToPage(Number(e.target.value))}
      />

      {/* Chapter Menu */}
      <select
        className="chapter-select"
        value={chapters.find((c) => c.page === currentPage)?.name || ""}
        onChange={(e) => {
          const chapter = chapters.find((c) => c.name === e.target.value);
          if (chapter) goToPage(chapter.page);
        }}
      >
        {chapters.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Fullscreen */}
      <button
        className="fullscreen-btn"
        onClick={() => {
          const el = document.documentElement;
          if (!document.fullscreenElement) {
            el.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
      >
        ⛶
      </button>

      {/* Iframe Preview */}
      <iframe
        ref={iframeRef}
        src="/magazine.html"
        title="Magazine"
        className="magazine-iframe"
      />
    </div>
  );
}
