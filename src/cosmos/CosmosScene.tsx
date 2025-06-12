import React, { useRef, useEffect, memo } from "react"
import styled from "styled-components"
import { renderer, animate } from "./scene"

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`

function CosmosScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mountRef.current!.replaceChildren(renderer.domElement)
    const handle = animate()

    return () => {
      cancelAnimationFrame(handle)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <CanvasContainer ref={mountRef} />
}

const CosmosSceneMemo = memo(CosmosScene)

export default CosmosSceneMemo
