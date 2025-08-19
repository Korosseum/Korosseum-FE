import { useState, useEffect } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

// hook to get window size dynamically
const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  if (typeof window === "undefined") {
    return {
      width: undefined,
      height: undefined,
    };
  }

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};
export default useWindowSize;
