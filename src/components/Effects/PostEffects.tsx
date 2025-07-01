// src/components/effects/PostEffects.tsx
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { forwardRef } from "react";

export const PostEffects = forwardRef((props, ref) => {
  return (
    <EffectComposer>
      <Bloom intensity={0.5} luminanceThreshold={0.85} {...props} />
      <DepthOfField focusDistance={0} focalLength={0.02} />
    </EffectComposer>
  );
});
