import React from 'react'
import { OrbitControls, Grid, GizmoHelper, GizmoViewport, Environment, ScrollControls } from '@react-three/drei'
import Cube from './Cube'
import { useControls } from 'leva'

export default function Experience() {

  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: '#6f6f6f',
    sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: '#9d4b4b',
    fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true
  })

  return (
    <>
        <ambientLight intensity={Math.PI / 3} />
        <ScrollControls pages={3} damping={0.25}>
            <Cube />
        </ScrollControls>
        <OrbitControls makeDefault enableZoom={false}/>
        <Environment preset="city" />
        <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]} >
            <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
        </GizmoHelper>
    </> 
  )
}
