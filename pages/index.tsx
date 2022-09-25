import { css, Global } from "@emotion/react";
import { Effects } from "@react-three/drei";
import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import type { NextPage } from "next";
import { Suspense } from "react";
import { UnrealBloomPass } from "three-stdlib";
import Stars from "../components/Stars";

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
  }
}

extend({ UnrealBloomPass });

const Scene = () => {
  return (
    <>
      <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={5} radius={1} />
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
      <Canvas style={{ background: "black" }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Home;
