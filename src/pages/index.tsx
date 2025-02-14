import * as React from "react"
import "../cosmos/scene"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import CosmosScene from "../cosmos/CosmosScene"
import styled from "styled-components"

const Main = styled.main`
  color: white;
  font-family: "Oxanium", sans-serif;
`

const Slide = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1800px;
  padding: 0 200px;
  margin: 0 auto;
  justify-content: center;
  min-height: 100vh;

  // responsive breakpoints
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 20px;
  }
`

const Title = styled.div`
  font-size: 5rem;
  @media (max-width: 768px) {
    font-size: 3rem;
  }

  .name {
    font-weight: 600;
  }

  .surname {
    font-weight: 200;
  }
`

const IndexPage: React.FC<PageProps<Queries.HomePageQuery>> = ({ data }) => {
  return (
    <Main>
      <Slide>
        <Title>
          <h1>
            <span className="name">Vittorio</span>{" "}
            <span className="surname">Iocolano</span>
          </h1>
        </Title>
      </Slide>
      <Slide>
        {
          data.allMdx.nodes.map(({ frontmatter }) => (
            <div key={frontmatter!.slug}>
              <Link to={`/projects${frontmatter!.slug}`}>
                {frontmatter!.name}
              </Link>
            </div>
          ))
        }
      </Slide>
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

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Home Page</title>
    <style>{`body { margin: 0; }`}</style>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap"
      rel="stylesheet"
    />
  </>
)
