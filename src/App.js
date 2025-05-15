import { Canvas } from '@react-three/fiber'

import { useControls } from 'leva'
import Experience from './components/Experience'

export default function App() {
    
  const color = useControls({
    value: 'skyblue',
  })
  return (
    <Canvas camera={{
      position: [10, 10, 10],
    }}>
      <color attach="background" args={[color.value]} />
      <Experience />
    </Canvas>
  )
}
