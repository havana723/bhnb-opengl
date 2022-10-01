import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Effects,
  PerspectiveCamera,
  TrackballControls,
} from "@react-three/drei";
import { TrackballControls as TrackballControlsImpl } from "three-stdlib";

import { Canvas, extend, Object3DNode, useFrame } from "@react-three/fiber";
import axios from "axios";
import type { NextPage } from "next";
import { Suspense, useEffect, useRef, useState } from "react";
import * as three from "three";
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
  lineCount: number;
}

const Scene: React.FC<Props> = (props) => {
  const { database, lineCount } = props;
  return (
    <>
      <Effects disableGamma>
        <unrealBloomPass threshold={0.1} strength={5} radius={1} />
        <shaderPass args={[CopyShader]} />
      </Effects>
      <Stars database={database} />
      {[...Array(lineCount)].map((x, i) => {
        return <Comet key={i} />;
      })}
    </>
  );
};

interface GalaxyProps {
  database: StarAttr[];
}

const Galaxy: React.FC<GalaxyProps> = (props) => {
  const lineCount = 10;
  const ZOOMTIME = 5;

  const controlRef = useRef<TrackballControlsImpl>(null);
  const cameraRef = useRef<three.PerspectiveCamera>(null);

  const elapsedTime = useRef<number>(0);

  const [zoomStartTime, setZoomStartTime] = useState<number>(0);
  const [targetPosition, setTargetPosition] = useState<three.Vector3>(
    new three.Vector3(0, 0, 0)
  );

  useEffect(() => {
    if (cameraRef.current && controlRef.current) {
      controlRef.current.enabled = false;
      cameraRef.current.position.set(500, 500, 500);
      cameraRef.current.updateProjectionMatrix();
      controlRef.current.enabled = true;
      controlRef.current.update();
    }
  }, []);

  useFrame(({ clock }) => {
    elapsedTime.current = clock.getElapsedTime();
    const time = clock.getElapsedTime() - zoomStartTime;

    if (time < ZOOMTIME) {
      if (cameraRef.current && controlRef.current) {
        controlRef.current.enabled = false;
        const newVector = cameraRef.current.position.lerp(
          targetPosition,
          time / ZOOMTIME
        );
        cameraRef.current.position.set(newVector.x, newVector.y, newVector.z);
        cameraRef.current.updateProjectionMatrix();
        controlRef.current.enabled = true;
        controlRef.current.update();
      }
    }
  });

  return (
    <>
      <color attach="background" args={["#000"]} />
      <Suspense fallback={null}>
        <PerspectiveCamera ref={cameraRef} near={0.0001} makeDefault />
        <TrackballControls
          ref={controlRef}
          camera={cameraRef.current ?? undefined}
          rotateSpeed={5}
          minDistance={0.1}
          maxDistance={1000}
          noPan
        />
        <Scene database={props.database} lineCount={lineCount} />
      </Suspense>
    </>
  );
};

const Blend = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
`;

const Blend1 = styled(Blend)`
  background-color: #1d31a520;
  mix-blend-mode: screen;
`;

const Blend2 = styled(Blend)`
  background: linear-gradient(to bottom, transparent 60%, #61c5ff22);
  mix-blend-mode: screen;
`;

const Blend3 = styled(Blend)`
  background: linear-gradient(to bottom, transparent 90%, #ffe0aa10);
  mix-blend-mode: screen;
`;

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
        <Galaxy database={database} />
      </Canvas>
      <Blend1 />
      <Blend2 />
      <Blend3 />
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
