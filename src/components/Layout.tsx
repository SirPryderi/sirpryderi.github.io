import * as React from "react"
import styled from "styled-components"
import CosmosScene from "../cosmos/CosmosScene"

const Main = styled.main`
  color: white;
  font-family: "Oxanium", sans-serif;
`

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Main>
      {children}
      <CosmosScene />
    </Main>
  )
}

export default Layout
