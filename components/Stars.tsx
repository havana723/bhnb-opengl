import { useEffect, useMemo, useRef } from "react";
import * as three from "three";

const Star = () => {
  const count = 10000;
  const starsRef = useRef<three.Points | null>(null);

  let material = new three.ShaderMaterial({
    transparent: true,
    uniforms: {
      size: { value: 10 },
      scale: { value: 1 },
      color: { value: new three.Color("white") },
    },
    vertexShader: three.ShaderLib.points.vertexShader,
    fragmentShader: `
    uniform vec3 color;
    void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        gl_FragColor = vec4(color, step(ll, 0.5));
    }
    `,
  });

  const positions: Float32Array = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const x = Math.floor(Math.random() * 100) - 50;
      const y = Math.floor(Math.random() * 100) - 50;
      const z = Math.floor(Math.random() * 100) - 50;
      temp[i] = x;
      temp[i + 1] = y;
      temp[i + 2] = z;
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

  const generateStars = useEffect(() => {
    if (starsRef.current) {
      starsRef.current.geometry.setAttribute(
        "position",
        new three.BufferAttribute(positions, 3)
      );
      starsRef.current.geometry.setAttribute(
        "color",
        new three.BufferAttribute(colors, 3)
      );
    }
  }, [starsRef, positions, colors]);

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.1}
          sizeAttenuation={true}
          depthWrite={true}
          vertexColors={true}
          blending={three.AdditiveBlending}
        />
      </points>
    </>
  );
};

export default Star;
