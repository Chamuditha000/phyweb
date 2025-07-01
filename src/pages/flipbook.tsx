import * as THREE from "three";
import { useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export function PDFFlipbookViewer() {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [leftTex, setLeftTex] = useState<THREE.Texture | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    pdfjsLib
      .getDocument("/bb.pdf")
      .promise.then((doc) => {
        console.log("✅ PDF loaded:", doc.numPages);
        setPdfDoc(doc);
      })
      .catch((err) => {
        console.error("❌ PDF load failed:", err);
      });
  }, []);

  useEffect(() => {
    if (!pdfDoc) return;
    const render = async () => {
      const p = await pdfDoc.getPage(page);
      const vp = p.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = vp.width;
      canvas.height = vp.height;
      await p.render({ canvasContext: canvas.getContext("2d")!, viewport: vp })
        .promise;
      setLeftTex(new THREE.CanvasTexture(canvas));
    };
    render();
  }, [pdfDoc, page]);

  return (
    <group position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[8, 11]} />
        <meshBasicMaterial
          map={leftTex ?? undefined}
          color={leftTex ? "white" : "#333"}
        />
      </mesh>
      <Html position={[0, -7, 0]}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          ⬅ Prev
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Next ➡</button>
      </Html>
    </group>
  );
}
