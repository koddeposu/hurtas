'use client'
import { Experience } from "@/components/page/Experience";
import { UI } from "@/components/page/UI";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

function App() {
  const [cameraZ, setCameraZ] = useState(4);

  useEffect(() => {
    // Bu blok sadece tarayıcıda (Client-side) çalışır
    const handleResize = () => {
      setCameraZ(window.innerWidth > 800 ? 4 : 9);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <UI />
      <Loader />
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true
        }}
        shadows
        camera={{
          position: [0, 1, cameraZ],
          fov: 35,
        }}
      >
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
