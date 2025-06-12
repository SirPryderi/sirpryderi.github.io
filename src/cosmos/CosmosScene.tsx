import React, { useRef, useEffect, memo } from "react"
import styled from "styled-components"
import { setup } from "./scene"

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`

function CosmosScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { animate, stop, renderer } = setup()
    mountRef.current!.replaceChildren(renderer.domElement)
    animate()

    return stop
  }, [])

  return <CanvasContainer ref={mountRef} />
}

const CosmosSceneMemo = memo(CosmosScene)

export default CosmosSceneMemo
