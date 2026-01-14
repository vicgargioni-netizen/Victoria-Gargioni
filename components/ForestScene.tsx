
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, Stars, Text, Environment, ContactShadows, PositionalAudio, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { TRAIL_NODES } from '../constants';
import { SignType, TrailNode } from '../types';

// Fix: Define intrinsic elements as constants to avoid JSX Property 'color' and 'fogExp2' errors
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const ConeGeometry = 'coneGeometry' as any;
const CircleGeometry = 'circleGeometry' as any;
const BoxGeometry = 'boxGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const PlaneGeometry = 'planeGeometry' as any;
const Color = 'color' as any;
const FogExp2 = 'fogExp2' as any;

const WATER_SOUND_URL = 'https://actions.google.com/sounds/v1/water/crushing_waves.ogg';
const WIND_SOUND_URL = 'https://actions.google.com/sounds/v1/ambiences/wind_soft_howl_loop.ogg';

const DetailedTree: React.FC<{ position: [number, number, number], scale: number }> = ({ position, scale }) => {
  const rotation = useMemo(() => Math.random() * Math.PI, []);
  return (
    <Group position={position} rotation={[0, rotation, 0]} scale={[scale, scale, scale]}>
      {/* Tronco com textura de cor mais rica */}
      <Mesh position={[0, 2, 0]}>
        <CylinderGeometry args={[0.2, 0.4, 4, 8]} />
        <MeshStandardMaterial color="#2d1b0f" roughness={0.9} />
      </Mesh>
      {/* Camadas da copa para volume */}
      {[0, 1.2, 2.4].map((y, i) => (
        <Mesh key={i} position={[0, 4 + y * 0.8, 0]}>
          <ConeGeometry args={[1.8 - i * 0.4, 3, 8]} />
          <MeshStandardMaterial color={i === 0 ? "#1a3d1a" : i === 1 ? "#244d24" : "#2d5a27"} roughness={0.8} />
        </Mesh>
      ))}
    </Group>
  );
};

const GrassPatch: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Group position={position}>
       {Array.from({ length: 5 }).map((_, i) => (
         <Mesh key={i} position={[Math.random() * 0.5, 0, Math.random() * 0.5]} rotation={[0, Math.random(), 0]}>
            <CylinderGeometry args={[0.01, 0.05, 0.3, 3]} />
            <MeshStandardMaterial color="#2d5a27" />
         </Mesh>
       ))}
    </Group>
  );
};

const PathNode: React.FC<{ node: TrailNode, isActive: boolean, isAudioStarted: boolean }> = ({ node, isActive, isAudioStarted }) => {
  return (
    <Group position={node.position}>
      <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
        <CircleGeometry args={[2.5, 32]} />
        <MeshStandardMaterial color={isActive ? "#444" : "#222"} transparent opacity={0.2} />
      </Mesh>
      
      {node.sign && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Group position={[1.8, 0.8, -1]}>
            <Mesh position={[0, 0, 0]}>
              <CylinderGeometry args={[0.06, 0.06, 1.6, 8]} />
              <MeshStandardMaterial color="#3d2b1f" />
            </Mesh>
            <Mesh position={[0, 0.9, 0]}>
              <BoxGeometry args={[1, 0.7, 0.1]} />
              <MeshStandardMaterial color="#d2b48c" />
            </Mesh>
            <Text
              position={[0, 0.9, 0.06]}
              fontSize={0.14}
              color="#2d1b0f"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/shadowsintolight/v15/Uqy7p_zz6qxyS-S48fXm_46797E.woff"
            >
              {node.sign.replace('_', ' ')}
            </Text>
          </Group>
        </Float>
      )}

      {node.id === 4 && isAudioStarted && (
        <Suspense fallback={null}>
          <PositionalAudio url={WATER_SOUND_URL} distance={12} loop />
        </Suspense>
      )}
    </Group>
  );
};

const MovingCamera = ({ targetPosition, isMoving }: { targetPosition: [number, number, number], isMoving: boolean }) => {
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  const bobRef = useRef(0);

  useFrame((state) => {
    // Interpolação de posição (suave)
    vec.set(targetPosition[0], targetPosition[1] + 1.7, targetPosition[2] + 4.5);
    camera.position.lerp(vec, 0.04);

    // Efeito Head Bobbing (apenas se estiver "andando", simulado pelo lerp)
    if (camera.position.distanceTo(vec) > 0.1) {
      bobRef.current += 0.12;
      camera.position.y += Math.sin(bobRef.current) * 0.03;
      camera.position.x += Math.cos(bobRef.current * 0.5) * 0.015;
    }

    camera.lookAt(targetPosition[0], targetPosition[1] + 1.6, targetPosition[2] - 10);
  });

  return null;
};

interface ForestSceneProps {
  currentNode: TrailNode;
  isAudioStarted: boolean;
}

const ForestScene: React.FC<ForestSceneProps> = ({ currentNode, isAudioStarted }) => {
  const envElements = useMemo(() => {
    const trees = [];
    const grass = [];
    for (let i = 0; i < 250; i++) {
      const x = (Math.random() - 0.5) * 120;
      const z = (Math.random() - 1) * 220;
      if (Math.abs(x) > 5) {
        trees.push(<DetailedTree key={`tree-${i}`} position={[x, 0, z]} scale={0.8 + Math.random() * 0.5} />);
      }
    }
    for (let i = 0; i < 300; i++) {
      const x = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 1) * 200;
      grass.push(<GrassPatch key={`grass-${i}`} position={[x, -0.5, z]} />);
    }
    return { trees, grass };
  }, []);

  return (
    <Canvas shadows dpr={[1, 2]}>
      {/* Fix: Use the defined constants for background color and fog to resolve JSX intrinsic element errors */}
      <Color attach="background" args={['#0a1a0a']} />
      <FogExp2 attach="fog" args={['#0a1a0a', 0.025]} />
      
      <Sky sunPosition={[100, 10, 100]} turbidity={0.1} rayleigh={2} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <AmbientLight intensity={0.3} />
      <PointLight position={[10, 20, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      
      {isAudioStarted && (
        <Suspense fallback={null}>
           <PositionalAudio url={WIND_SOUND_URL} loop distance={1000} />
        </Suspense>
      )}

      {/* Ground with better texture color */}
      <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -100]} receiveShadow>
        <PlaneGeometry args={[200, 400]} />
        <MeshStandardMaterial color="#1a2e1a" roughness={1} />
      </Mesh>

      {/* Path - darker and more defined */}
      <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, -100]}>
        <PlaneGeometry args={[5, 400]} />
        <MeshStandardMaterial color="#2d1b0f" roughness={1} />
      </Mesh>

      {envElements.trees}
      {envElements.grass}

      {Object.values(TRAIL_NODES).map((node: any) => (
        <PathNode 
          key={node.id} 
          node={node} 
          isActive={node.id === currentNode.id} 
          isAudioStarted={isAudioStarted} 
        />
      ))}

      <MovingCamera targetPosition={currentNode.position} isMoving={true} />
      <Environment preset="forest" />
      <ContactShadows resolution={1024} scale={200} blur={2.5} opacity={0.3} far={10} color="#000000" />
    </Canvas>
  );
};

export default ForestScene;
