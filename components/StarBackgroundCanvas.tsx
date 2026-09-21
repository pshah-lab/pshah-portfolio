"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm.js";

const PointsComponent = Points as any;
const PointMaterialComponent = PointMaterial as any;
const CanvasComponent = Canvas as any;

const StarField = (props: any) => {
  const ref: any = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <PointsComponent ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterialComponent
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </PointsComponent>
    </group>
  );
};

export default function StarBackgroundCanvas() {
  return (
    <div className="w-full h-auto fixed inset-0 z-[11] pointer-events-none">
      <CanvasComponent camera={{ position: [0, 0, 1] }} style={{ pointerEvents: "none" }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </CanvasComponent>
    </div>
  );
}
