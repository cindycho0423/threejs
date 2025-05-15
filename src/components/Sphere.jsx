import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
export default function Sphere(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  // const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  
  const sphere = useControls('Sphere', {
    size: { value: 0.5, min: 0.1, max: 10, step: 0.1 },
    color: { value: 'red' },
  })

  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      >
      <sphereGeometry args={[sphere.size, 32, 32]} />
      <meshStandardMaterial color={sphere.color} />
    </mesh>
  )
} 