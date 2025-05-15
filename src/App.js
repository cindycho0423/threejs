import { Canvas } from '@react-three/fiber'

import { useControls } from 'leva'
import Experience from './components/Experience'

export default function App() {
    
  const color = useControls({
    backgroundColor: { value: 'black' },
  })

  const { cameraX, cameraY, cameraZ } = useControls('Camera Position', {
    cameraX: { value: 10, min: 0, max: 120, step: 0.1 },
    cameraY: { value: 10, min: 0, max: 120, step: 0.1 },
    cameraZ: { value: 10, min: 0, max: 120, step: 1 }
  })
  return (
    <Canvas camera={{
      position: [120, 30, cameraZ],
    }}>
      <color attach="background" args={[color.backgroundColor]} />
      <Experience />
    </Canvas>
  )
}
