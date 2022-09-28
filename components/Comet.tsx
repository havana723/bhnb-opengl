import { useCallback, useMemo, useRef } from "react";
import * as three from "three";

const count = 10;

interface Props {
  position: [number, number, number];
  start: [number, number, number];
  end: [number, number, number];
}

const Comet: React.FC<Props> = (props) => {
  const cometRef = useRef<SVGLineElement | null>(null);

  const { position, start, end } = props;

  const points = useMemo(() => {
    return [
      new three.Vector3(start[0], start[1], start[2]),
      new three.Vector3(end[0], end[1], end[2]),
    ];
  }, [start, end]);

  const onUpdate = useCallback(
    (self: three.BufferGeometry) => self.setFromPoints(points),
    [points]
  );

  return (
    <>
      <line ref={cometRef}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate}>
          <bufferAttribute
            attach="attributes-position"
            count={1}
            array={position}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={"#ffffff"}
          linewidth={10}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
    </>
  );
};

export default Comet;
