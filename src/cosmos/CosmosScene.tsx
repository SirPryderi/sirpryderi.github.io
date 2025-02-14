import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { renderer } from "./scene";

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

function CosmosScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountRef.current!.appendChild(renderer.domElement);

    return () => {
      mountRef.current!.removeChild(renderer.domElement);
    };
  }, []);

  return <CanvasContainer ref={mountRef} />;
}

export default CosmosScene;
