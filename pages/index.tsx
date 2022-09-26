import { css, Global } from "@emotion/react";
import { Effects, TrackballControls } from "@react-three/drei";
import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import type { NextPage } from "next";
import { Suspense } from "react";
import { CopyShader, RenderPass, UnrealBloomPass } from "three-stdlib";
import Stars from "../components/Stars";

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    renderPass: Object3DNode<RenderPass, typeof RenderPass>;
  }
}

extend({ RenderPass, UnrealBloomPass });

const Scene = () => {
  return (
    <>
      <Effects disableGamma>
        <unrealBloomPass threshold={0.1} strength={5} radius={1} />
        <shaderPass args={[CopyShader]} />
      </Effects>
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
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={["#000"]} />
        <Suspense fallback={null}>
          <TrackballControls rotateSpeed={5} maxDistance={1000} noPan />
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Home;
