import { useCallback, useEffect, useState } from "react";
import Position from "../types/Position";
import useThrottledEffect from "./useThrottledEffect";

const usePageSize = (throttle?: number): Position => {
  const [size, setSize] = useState<Position>({ x: 0, y: 0 });

  const listen = useCallback(() => {
    setSize({ x: window.innerWidth, y: window.innerHeight });
  }, [setSize]);

  useThrottledEffect(
    () => {
      window.addEventListener("resize", listen);
      return () => {
        window.removeEventListener("resize", listen);
      };
    },
    throttle || 0,
    [listen]
  );

  useEffect(() => listen(), [listen]);

  return size;
};

export default usePageSize;
