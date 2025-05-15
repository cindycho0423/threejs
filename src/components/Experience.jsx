import React from 'react'
import { OrbitControls, Grid, GizmoHelper, GizmoViewport, Environment, ScrollControls } from '@react-three/drei'
import Cube from './Cube'
import { useControls } from 'leva'

export default function Experience() {

  const { showGrid } = useControls('Grid', {
    showGrid: true,
  })

  return (
    <>
        <ambientLight intensity={Math.PI / 3} />
        <ScrollControls pages={3} damping={0.25}>
            <Cube />
        </ScrollControls>
        <OrbitControls makeDefault enableZoom={false}/>
        <Environment preset="city" />
        {showGrid && (
          <Grid 
            position={[0, -0.01, 0]} 
            args={[10.5, 10.5]} 
            cellSize={0.6}
            cellThickness={1}
            cellColor="#6f6f6f"
            sectionSize={3.3}
            sectionThickness={1.5}
            sectionColor="#9d4b4b"
            fadeDistance={25}
            fadeStrength={1}
            infiniteGrid={true}
          />
        )}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]} >
            <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
        </GizmoHelper>
    </> 
  )
}
