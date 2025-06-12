import * as React from "react"
import { graphql, type PageProps } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Breadcrumbs from "../../components/Breadcrumbs"
import Layout from "../../components/Layout"
import styled from "styled-components"
import LayoutHead from "../../components/LayoutHead"

type Props = PageProps<Queries.ProjectBySlugQuery>

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

export default function ProjectTemplate({ data, children, location }: Props) {
  const frontmatter = data.mdx?.frontmatter

  const breadcrumbItems = [
    { title: "Home", url: "/" },
    { title: "Projects", url: "/#projects" },
    { title: frontmatter?.name || "Project", url: location.pathname },
  ]

  return (
    <>
      <Article>
        <Breadcrumbs items={breadcrumbItems} />
        <ProjectTitle>{frontmatter?.name}</ProjectTitle>
        <MDXProvider>{children}</MDXProvider>
      </Article>
    </>
  )
}

export const Head = LayoutHead

export const pageQuery = graphql`
  query ProjectBySlug($frontmatter__slug: String!) {
      mdx(frontmatter: { slug: { eq: $frontmatter__slug } }) {
      frontmatter {
        slug
        name
        priority
      }
      body
    }
  }
`
