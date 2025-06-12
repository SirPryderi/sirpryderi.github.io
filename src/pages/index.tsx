import * as React from "react"
import { graphql, Link, type PageProps } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import LayoutHead from "../components/LayoutHead"

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

  h2 {
    font-size: 4rem;
    margin: 0;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;

  h2 {
    font-size: 2rem;
  }
`

const ProjectCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: rgba(30, 30, 30, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.18);
  transition: background 0.3s, box-shadow 0.3s, border 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(60, 60, 60, 0.85);
    border: 1px solid #ffe066;
    box-shadow: 0 4px 32px 0 rgba(255, 224, 102, 0.08);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0 0;
    letter-spacing: 0.04em;
  }
`

const IndexPage: React.FC<PageProps<Queries.HomePageQuery>> = ({ data }) => {
  return (
    <Layout>
      <Slide>
        <Title>
          <h1>
            <span className="name">Vittorio</span>{" "}
            <span className="surname">Iocolano</span>
          </h1>
        </Title>
      </Slide>

      <Slide id="projects">
        <h2>Projects</h2>
        <ProjectsGrid>
          {data.allMdx.nodes.map(({ frontmatter }) => (
            <ProjectCard
              key={frontmatter!.slug}
              to={`/projects/${frontmatter!.slug}`}
            >
              <h3>{frontmatter!.name}</h3>
              <pre>{`> /projects/${frontmatter!.slug}`}</pre>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Slide>

      <Slide style={{textAlign: "center"}}>
        <h2>The end.</h2>
      </Slide>
    </Layout>
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

export const Head = LayoutHead
