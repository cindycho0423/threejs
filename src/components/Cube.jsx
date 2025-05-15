import { useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import Sphere from './Sphere'
import gsap from 'gsap'

export default function Cube() {
    const spheresRef = useRef();
    const tl = useRef();
    const scroll = useScroll();
    
    const spherePositions = [];
    const sphereSpacing = 4;
  
    // Create a 3x3x3 grid of boxes
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          spherePositions.push([x * sphereSpacing, y * sphereSpacing, z * sphereSpacing]);
        }
      }
    }
    
    // 스크롤 진행도에 따라 애니메이션 타임라인 업데이트
    useFrame(() => {
      // 스크롤이 시작될 때부터 애니메이션 진행
      if (scroll.offset > 0) {
        tl.current.seek(scroll.offset * tl.current.duration());
      } else {
        // 스크롤이 0이면 초기 상태로 설정
        tl.current.seek(0);
      }
    });
    
    // 애니메이션 타임라인 설정
    useLayoutEffect(() => {
      tl.current = gsap.timeline({ paused: true }); // 타임라인을 일시정지 상태로 생성
      
      // 초기 상태 설정 (시작 포인트)
      tl.current.set(spheresRef.current.rotation, { x: 0, y: 0, z: 0 });
      tl.current.set(spheresRef.current.scale, { x: 1, y: 1, z: 1 });
      tl.current.set(spheresRef.current.position, { x: 0, y: 0, z: 0 });
      
      // 구(Sphere) 애니메이션
      tl.current.to(
        spheresRef.current.rotation,
        {
          duration: 2,
          x: Math.PI / 2,
          y: Math.PI * 2,
          z: Math.PI / 3,
          ease: "power2.inOut"
        },
        0
      );
      
      // 구 확장/축소 애니메이션
      tl.current.to(
        spheresRef.current.scale,
        {
          duration: 1,
          x: 2, 
          y: 2, 
          z: 2,
          ease: "elastic.out(1, 0.3)"
        },
        0.5
      );
      
      tl.current.to(
        spheresRef.current.scale,
        {
          duration: 1,
          x: 0.5,
          y: 0.5,
          z: 0.5,
          ease: "elastic.out(1, 0.3)"
        },
        1.5
      );
      
      // 구 위치 애니메이션
      // tl.current.to(
      //   spheresRef.current.position,
      //   {
      //     duration: 1,
      //     y: 5,
      //     x: 3,
      //     z: 2,
      //     ease: "power3.inOut"
      //   },
      //   0.2
      // );
      
      // tl.current.to(
      //   spheresRef.current.position,
      //   {
      //     duration: 1,
      //     y: -5,
      //     x: -3,
      //     z: -2,
      //     ease: "power3.inOut"
      //   },
      //   1.2
      // );
      
    }, []);
  
  return (
        <group ref={spheresRef}>
          {spherePositions.map((position, index) => (
            <Sphere key={index} position={position} />
          ))}
        </group>
  )
}
