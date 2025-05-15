import { useRef, useLayoutEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import Sphere from './Sphere'
import gsap from 'gsap'
import { useControls } from 'leva'

export default function Cube() {
    const spheresRef = useRef();
    const tl = useRef();
    const scroll = useScroll();
    
    // 애니메이션 제어 옵션
    const { 
      maxScale, 
      rotationX, 
      rotationY, 
      rotationZ,
      animationSpeed,
      easeType
    } = useControls('Cube Animation', {
      maxScale: { value: 10, min: 1, max: 100, step: 0.1 },
      rotationX: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.1 },
      rotationY: { value: Math.PI * 2, min: 0, max: Math.PI * 4, step: 0.1 },
      rotationZ: { value: Math.PI / 3, min: 0, max: Math.PI * 2, step: 0.1 },
      animationSpeed: { value: 1, min: 0.1, max: 3, step: 0.1 },
      easeType: { options: ["power1", "power2", "power3", "back", "elastic", "bounce"] }
    });
    
    const { sphereSpacing } = useControls('Cube Layout', {
      sphereSpacing: { value: 4, min: 1, max: 10, step: 0.1 }
    });
    
    // spherePositions를 useMemo로 최적화하고, sphereSpacing이 변경될 때 재계산
    const spherePositions = useMemo(() => {
      const positions = [];
      // Create a 3x3x3 grid of spheres
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            positions.push([x * sphereSpacing, y * sphereSpacing, z * sphereSpacing]);
          }
        }
      }
      return positions;
    }, [sphereSpacing]);
    
    // 스크롤 진행도에 따라 애니메이션 타임라인 업데이트
    useFrame(() => {
      if (scroll.offset > 0) {
        tl.current.seek(scroll.offset * tl.current.duration());
      } else {
        tl.current.seek(0);
      }
    });
    
    // 애니메이션 타임라인 설정
    useLayoutEffect(() => {
      tl.current = gsap.timeline({ paused: true }); 
    
      // 초기 상태 설정 (시작 포인트)
      tl.current.set(spheresRef.current.rotation, { x: 0, y: 0, z: 0 });
      tl.current.set(spheresRef.current.scale, { x: 1, y: 1, z: 1 });
      tl.current.set(spheresRef.current.position, { x: 0, y: 0, z: 0 });
      
      // 구(Sphere) 회전 애니메이션
      tl.current.to(
        spheresRef.current.rotation,
        {
          duration: 2 / animationSpeed,
          x: rotationX,
          y: rotationY,
          z: rotationZ,
          ease: `${easeType}.inOut`
        },
        0
      );
      
      // 구 확장 애니메이션 (시작 -> 중간 지점까지)
      tl.current.to(
        spheresRef.current.scale,
        {
          duration: 1 / animationSpeed,
          x: maxScale, 
          y: maxScale, 
          z: maxScale,
          ease: `${easeType}.out`
        },
        0
      );
      
      // 구 축소 애니메이션 (중간 -> 끝 지점까지)
      tl.current.to(
        spheresRef.current.scale,
        {
          duration: 1 / animationSpeed,
          x: 1,
          y: 1,
          z: 1,
          ease: `${easeType}.in`
        },
        1
      );
      
    }, [maxScale, rotationX, rotationY, rotationZ, animationSpeed, easeType]); 
  
  return (
        <group ref={spheresRef}>
          {spherePositions.map((position, index) => (
            <Sphere key={index} position={position} />
          ))}
        </group>
  )
}
