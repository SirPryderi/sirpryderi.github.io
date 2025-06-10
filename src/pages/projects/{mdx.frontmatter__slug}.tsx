import * as React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Layout from "../../components/Layout"

type Props = {
  data: Queries.ProjectQuery
  children: React.ReactNode
}

export default function ProjectTemplate({ data, children }: Props) {
  const frontmatter = data.mdx?.frontmatter
  return (
    <Layout>
      <article>
        <h1>{frontmatter?.name}</h1>
        <MDXProvider>{children}</MDXProvider>
      </article>
    </Layout>
  )
}

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
