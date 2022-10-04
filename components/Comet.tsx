import { extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as three from "three";
import { BufferGeometry, Line, LineDashedMaterial } from "three";

// Add class `Line` as `Line_` to react-three-fiber's extend function. This
// makes it so that when you use <line_> in a <Canvas>, the three reconciler
// will use the class `Line`
extend({ Line_: Line });

// declare `line_` as a JSX element so that typescript doesn't complain
declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<Line, typeof Line>;
    }
  }
}

interface CometState {
  position: [number, number, number];
  start: three.Vector3;
  end: three.Vector3;
  offset: number;
}

const CYCLE = 10;
const SCALE = 300;

const Comet: React.FC = () => {
  const cometRef = useRef<Line | null>(null);
  const cometMaterialRef = useRef<LineDashedMaterial | null>(null);
  const cometGeomRef = useRef<BufferGeometry | null>(null);

  const [cometState, setCometState] = useState<CometState | null>(null);

  const initialize = useCallback((elapsedTime?: number): CometState => {
    const x = (Math.random() * SCALE + SCALE / 2) * (Math.random() - 0.5) * 2;
    const y = (Math.random() * SCALE + SCALE / 2) * (Math.random() - 0.5) * 2;
    const z = (Math.random() * SCALE + SCALE / 2) * (Math.random() - 0.5) * 2;
    const dx = (-Math.random() * SCALE) / 10 + x;
    const dy = (-Math.random() * SCALE) / 10 + y;
    const dz = (-Math.random() * SCALE) / 10 + z;
    const ddx = (Math.random() * SCALE) / 10 + x;
    const ddy = (Math.random() * SCALE) / 10 + y;
    const ddz = (Math.random() * SCALE) / 10 + z;

    return {
      position: [x, y, z],
      start: new three.Vector3(dx, dy, dz),
      end: new three.Vector3(ddx, ddy, ddz),
      offset: Math.random() * CYCLE + (elapsedTime || 0),
    };
  }, []);

  useEffect(() => {
    setCometState(initialize());
  }, [initialize]);

  const startPoint = useMemo(() => {
    return cometState?.start ?? new three.Vector3(0, 0, 0);
  }, [cometState?.start]);
  const endPoint = useMemo(() => {
    return cometState?.end ?? new three.Vector3(0, 0, 0);
  }, [cometState?.end]);

  const onUpdate = useCallback(
    (self: three.BufferGeometry) => {
      self.setFromPoints([startPoint, endPoint]);
    },
    [startPoint, endPoint]
  );

  useEffect(() => {
    cometGeomRef.current?.setFromPoints([startPoint, endPoint]);
  }, [startPoint, endPoint]);

  useFrame(({ clock }) => {
    cometRef.current?.computeLineDistances();

    if (!cometState) return;

    const time = clock.getElapsedTime() - cometState.offset;

    if (time > 0 && cometMaterialRef.current) {
      if (time < 0.5) cometMaterialRef.current.dashSize = time * 70;
      if (time >= 0.5 && time < 1.0) {
        if (cometGeomRef.current) {
          cometGeomRef.current.setFromPoints([
            startPoint.lerpVectors(
              cometState.start,
              endPoint,
              (time - 0.5) * 2
            ),
            endPoint,
          ]);
        }
      }
      if (time > 1.0) {
        cometMaterialRef.current.dashSize = 0;
      }
      if (time > CYCLE) {
        setCometState(initialize(clock.getElapsedTime()));
      }
    }
  });

  return (
    <>
      <line_ ref={cometRef}>
        <bufferGeometry
          ref={cometGeomRef}
          attach="geometry"
          onUpdate={onUpdate}
        >
          <bufferAttribute
            attach="attributes-position"
            count={1}
            array={cometState?.position}
            itemSize={3}
          />
        </bufferGeometry>
        <lineDashedMaterial
          ref={cometMaterialRef}
          attach="material"
          color={"#ffffff"}
          linewidth={20}
          linecap={"round"}
          linejoin={"round"}
          dashSize={0}
          gapSize={100000}
        />
      </line_>
    </>
  );
};

export default Comet;
