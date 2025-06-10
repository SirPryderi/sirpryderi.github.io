import * as React from "react"
import "../cosmos/scene"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import CosmosScene from "../cosmos/CosmosScene"
import styled from "styled-components"

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

export const pageQuery = graphql`
  query HomePage {
    allMdx {
      nodes {
        frontmatter {
          name
          slug
        }
      }
    }
  }
`

export default Layout
