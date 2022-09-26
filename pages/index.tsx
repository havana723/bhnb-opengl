import { css, Global } from "@emotion/react";
import { Effects, TrackballControls } from "@react-three/drei";
import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import axios from "axios";
import type { NextPage } from "next";
import { Suspense } from "react";
import { CopyShader, RenderPass, UnrealBloomPass } from "three-stdlib";
import Stars from "../components/Stars";
import { StarAttr } from "../types/Star";

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    renderPass: Object3DNode<RenderPass, typeof RenderPass>;
  }
}

extend({ RenderPass, UnrealBloomPass });

interface Props {
  database: StarAttr[];
}

const Scene: React.FC<Props> = (props) => {
  const { database } = props;
  return (
    <>
      <Effects disableGamma>
        <unrealBloomPass threshold={0.1} strength={5} radius={1} />
        <shaderPass args={[CopyShader]} />
      </Effects>
      <Stars database={database} />
    </>
  );
};

const Home: NextPage<{ database: StarAttr[] }> = ({ database }) => {
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
          <Scene database={database} />
        </Suspense>
      </Canvas>
    </>
  );
};

export const getStaticProps = async () => {
  const PATH =
    "https://raw.githubusercontent.com/havana723/bhnb-opengl/main/scripts/reduced.json";
  try {
    const database = await axios.get<StarAttr[]>(PATH);
    return {
      props: {
        database: database.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default Home;
