import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { getAll } from "../api";
import * as THREE from 'three';
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import circleImg from "../assets/images/circle.png";
import { OrbitControls } from "@react-three/drei";

function CameraControls() {
  const { camera, gl: {domElement} } = useThree();

  const { viewport } = useThree();
  camera.position.set(100, 10, 0); // Set the initial position of
  // Creat a first person camera
  camera.lookAt(0, 0, 0); // Look at the origin 
  useFrame(() => {
    if ((camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      (camera as THREE.PerspectiveCamera).aspect = viewport.width / viewport.height;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <OrbitControls
      makeDefault
      camera={camera}
      domElement={domElement}
      enableZoom={true}
    />
  );
}


const Points = () => {
  const imgText = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef<THREE.BufferAttribute | null>(null);

  let t = 1; // Animation time variable
  let f = 0.002; // Animation speed factor
  let a = 3; // Animation amplitude

  const graph = useCallback((x: number, z: number) => {
    return Math.sin(f * (x**2 + z**2 + t)) * a;
  }, [t, f, a]);
  
  const count = 700;
  const sep = 0.2;
  let positions = useMemo(() => {
    const positions = [];

    for(let i = 0; i < count; i++) {
      for(let j = 0; j < count; j++) {
        const x = (i - count / 2) * sep;
        const z = (j - count / 2) * sep;
        const y = graph(x, z);

        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph]);

  useFrame(() => {
    t += 15;
    const positions = bufferRef.current?.array;

    if (positions) {
      let xi = 0;
      for(let i = 0; i < count; i++) {
        for(let j = 0; j < count; j++) {
          const x = (i - count / 2) * sep;
          const z = (j - count / 2) * sep;

          positions[xi + 1] = graph(x, z);
          xi += 3; // Increment by 3 for x, y, z
        }
      }
    }
    if (bufferRef.current) {
      bufferRef.current.needsUpdate = true; // Notify Three.js that the buffer has changed
    }
  })

  return(
    <points>
      <bufferGeometry attach={"geometry"}>
        <bufferAttribute
        ref={bufferRef}
        attach="attributes-position"
        args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial 
      attach={"material"}
      map={imgText}
      color={0x00AAFF}
      sizeAttenuation
      transparent={false}
      alphaTest={0.5}
      opacity={1.0}
      />
    </points>
  )
}

const AnimationCanvas = () => {
  return (
    <Canvas
      camera={{ position: [100, 10, 0], fov: 75 }}
    >
      <Suspense fallback={null}>
        <Points />
        <CameraControls />
      </Suspense>
    </Canvas>
  );
}

const Home = () => {
  const wakeUpAPI = async () => {
    try {
      await getAll("posts");
    }
    catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  // Call wakeUpAPI when the component mounts because we have a free version hosting our backend lol
  useEffect(() => {
    wakeUpAPI();
  }, []);

  return (
    <section className="home">
      <Suspense fallback={<div>Loading...</div>}>
      <AnimationCanvas/>
      </Suspense>
      
    </section>
  )
}

export default Home