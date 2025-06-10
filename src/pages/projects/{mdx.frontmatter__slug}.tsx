import * as React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../../components/Layout"
import styled from "styled-components"
import LayoutHead from "../../components/LayoutHead"

type Props = {
  data: Queries.ProjectQuery
  children: React.ReactNode
}

const Article = styled.article`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem 2rem;
  color: white;
  font-family: "Oxanium", sans-serif;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const ProjectTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: 0.04em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

export default function ProjectTemplate({ data, children }: Props) {
  const frontmatter = data.mdx?.frontmatter
  return (
    <Layout>
      <Article>
        <ProjectTitle>{frontmatter?.name}</ProjectTitle>
        <MDXProvider>{children}</MDXProvider>
      </Article>
    </Layout>
  )
}

export const Head = LayoutHead

export const pageQuery = graphql`
  query Project($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        name
        priority
      }
    }
  }
`
