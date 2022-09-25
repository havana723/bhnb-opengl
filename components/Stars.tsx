import { useEffect, useMemo, useRef } from "react";
import * as three from "three";
import rawDatabase from "../scripts/reduced.json";
import { StarAttr } from "../types/Star";

const database = rawDatabase as unknown as StarAttr[];

const count = database.length;

const vertexShader = `
  attribute float size;
  attribute vec3 color;

  varying vec3 vColor;

	void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	  gl_PointSize = size;
	  gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;

  varying vec3 vColor;

  void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    gl_FragColor = vec4( color * vColor, 1.0 );
  }
`;

const Star = () => {
  const starsRef = useRef<three.Points | null>(null);

  const positions: Float32Array = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = +database[i].x;
      temp[i * 3 + 1] = +database[i].y;
      temp[i * 3 + 1] = +database[i].z;
    }
    return temp;
  }, []);

  const sizes: Float32Array = useMemo(() => {
    const temp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      temp[i] = Math.min(6.0, (-11 / 9) * +database[i].mag + 21 / 3 + 5);
    }
    return temp;
  }, []);

  const colors: Float32Array = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      temp[i] = 1.0;
      temp[i + 1] = 1.0;
      temp[i + 2] = 1.0;
    }
    return temp;
  }, []);

  useEffect(() => {
    if (starsRef.current) {
      starsRef.current.geometry.setAttribute(
        "position",
        new three.BufferAttribute(positions, 3)
      );
      starsRef.current.geometry.setAttribute(
        "color",
        new three.BufferAttribute(colors, 3)
      );
      starsRef.current.geometry.setAttribute(
        "size",
        new three.BufferAttribute(sizes, 1)
      );
    }
  }, [starsRef, positions, colors, sizes]);

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry />
        <shaderMaterial
          attach="material"
          uniforms={{ color: { value: new three.Color(0xffffff) } }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </points>
    </>
  );
};

export default Star;
