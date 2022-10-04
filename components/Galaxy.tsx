import {
  Effects,
  PerspectiveCamera,
  TrackballControls,
} from "@react-three/drei";
import { extend, Object3DNode, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as three from "three";
import {
  CopyShader,
  RenderPass,
  TrackballControls as TrackballControlsImpl,
  UnrealBloomPass,
} from "three-stdlib";
import { StarAttr } from "../types/Star";
import Comet from "./Comet";
import Stars from "./Stars";

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

export default Galaxy;
