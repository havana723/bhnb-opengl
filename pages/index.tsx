import { css, Global } from "@emotion/react";
import { Effects, TrackballControls } from "@react-three/drei";
import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import axios from "axios";
import type { NextPage } from "next";
import { Suspense, useMemo } from "react";
import { CopyShader, RenderPass, UnrealBloomPass } from "three-stdlib";
import Comet from "../components/Comet";
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
  lines: [
    [number, number, number],
    [number, number, number],
    [number, number, number]
  ][];
}

const Scene: React.FC<Props> = (props) => {
  const { database, lines } = props;
  return (
    <>
      <Effects disableGamma>
        <unrealBloomPass threshold={0.1} strength={5} radius={1} />
        <shaderPass args={[CopyShader]} />
      </Effects>
      <Stars database={database} />
      <Comet position={lines[0][0]} start={lines[0][1]} end={lines[0][2]} />;
      <Comet position={lines[1][0]} start={lines[1][1]} end={lines[1][2]} />;
      <Comet position={lines[2][0]} start={lines[2][1]} end={lines[2][2]} />;
      {lines.map((l, i) => {
        console.log(l);
        return <Comet position={l[0]} start={l[1]} end={l[2]} key={i} />;
      })}
    </>
  );
};

const Home: NextPage<{ database: StarAttr[] }> = ({ database }) => {
  const lineCount = 100;

  const lines = useMemo(() => {
    const temp = new Array(lineCount);
    for (let i = 0; i < lineCount; i++) {
      const x = (Math.random() * 100 + 50) * (Math.random() - 0.5) * 2;
      const y = (Math.random() * 100 + 50) * (Math.random() - 0.5) * 2;
      const z = (Math.random() * 100 + 50) * (Math.random() - 0.5) * 2;
      const dx = -Math.random() * 10 + x;
      const dy = -Math.random() * 10 + y;
      const dz = -Math.random() * 10 + z;
      const ddx = Math.random() * 10 + x;
      const ddy = Math.random() * 10 + y;
      const ddz = Math.random() * 10 + z;
      temp[i] = [
        [x, y, z],
        [dx, dy, dz],
        [ddx, ddy, ddz],
      ];
    }
    return temp;
  }, []);

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
          <TrackballControls
            rotateSpeed={5}
            minDistance={0.01}
            maxDistance={1000}
            noPan
          />
          <Scene database={database} lines={lines} />
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
