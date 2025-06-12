import * as React from "react"
import styled from "styled-components"

const ClientSideOnlyLazy = React.lazy(() => import("../cosmos/CosmosScene"))

const Main = styled.main`
  color: white;
  font-family: "Oxanium", sans-serif;
`

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isSSR = typeof window === "undefined"

  return (
    <Main>
      {children}

      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <ClientSideOnlyLazy />
        </React.Suspense>
      )}
    </Main>
  )
}

export default Layout
