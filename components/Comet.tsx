import { extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
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

const Comet: React.FC = () => {
  const cometRef = useRef<Line | null>(null);
  const cometMaterialRef = useRef<LineDashedMaterial | null>(null);
  const cometGeomRef = useRef<BufferGeometry | null>(null);

  const x = (Math.random() * 100 + 50) * (Math.random() - 0.5) * 2;
  const y = (Math.random() * 100 + 50) * (Math.random() - 0.5) * 2;
  const z = (Math.random() * 100 + 50) * (Math.random() - 0.5) * 2;
  const dx = -Math.random() * 10 + x;
  const dy = -Math.random() * 10 + y;
  const dz = -Math.random() * 10 + z;
  const ddx = Math.random() * 10 + x;
  const ddy = Math.random() * 10 + y;
  const ddz = Math.random() * 10 + z;

  const position = [x, y, z];
  const start = [dx, dy, dz];
  const end = [ddx, ddy, ddz];

  const offset = Math.random() * 5;
  const cycle = 10;

  const startPoint = useMemo(() => {
    return new three.Vector3(start[0], start[1], start[2]);
  }, []);
  const endPoint = useMemo(() => {
    return new three.Vector3(end[0], end[1], end[2]);
  }, []);

  const onUpdate = useCallback(
    (self: three.BufferGeometry) => {
      self.setFromPoints([startPoint, endPoint]);
    },
    [startPoint, endPoint]
  );

  useFrame(({ clock }) => {
    cometRef.current?.computeLineDistances();
    const time = (offset + clock.getElapsedTime()) % cycle;

    if (time > 0) {
      if (cometMaterialRef.current) {
        if (time < 0.25) cometMaterialRef.current.dashSize = time * 150;
        if (time >= 0.25 && time < 0.5) {
          if (cometGeomRef.current) {
            cometGeomRef.current.setFromPoints([
              startPoint.lerpVectors(
                new three.Vector3(start[0], start[1], start[2]),
                endPoint,
                (time - 0.25) * 4
              ),
              endPoint,
            ]);
          }
        }
        if (time > 0.5) {
          cometMaterialRef.current.dashSize = 0;
          if (cometGeomRef.current) {
            startPoint.lerp(new three.Vector3(start[0], start[1], start[2]), 1);
            cometGeomRef.current.setFromPoints([startPoint, endPoint]);
          }
        }
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
            array={position}
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
