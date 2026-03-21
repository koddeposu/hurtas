'use client'

import { Environment } from "@react-three/drei";
import { Book } from "./Book";

export const Experience = () => {
  return (
    <>
      {/*
        Float bileşenini sildik.
        Kitabı sabit bir açıyla (hafif yatay) görmek için bir group içine aldık.
      */}
      <group rotation-x={-Math.PI / 4}>
        <Book />
      </group>

      {/* OrbitControls kapalı: Fare ile döndürme yapılamaz */}

      <Environment preset="studio" environmentIntensity={0.3} />
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.65}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Zemin ve Gölge
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh> */}
    </>
  );
};
