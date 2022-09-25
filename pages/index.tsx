import { css, Global } from "@emotion/react";
import { Canvas } from "@react-three/fiber";
import type { NextPage } from "next";
import { Suspense } from "react";
import Stars from "../components/Stars";

const Scene = () => {
  return (
    <>
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
