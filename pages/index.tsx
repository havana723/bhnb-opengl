import { css, Global } from "@emotion/react";
import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import type { NextPage } from "next";
import { Suspense } from "react";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import Stars from "../components/Stars";
import StarsGlow from "../components/StarsGlow";

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    effectComposer: Object3DNode<EffectComposer, typeof EffectComposer>;
    renderPass: Object3DNode<RenderPass, typeof RenderPass>;
  }
}

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const Scene = () => {
  return (
    <>
      <StarsGlow />
      <Stars />
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #__next {
            width: 100%;
            height: 100%;
          }
        `}
      />
      <Canvas>
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Home;
