import * as React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

type Props = {
  data: Queries.ProjectQuery
  children: React.ReactNode
}

export default function ProjectTemplate({ data, children }: Props) {
  const frontmatter  = data.mdx?.frontmatter
  return (
    <article>
      <h1>{frontmatter?.name}</h1>
      <MDXProvider>{children}</MDXProvider>
    </article>
  )
}

export const pageQuery = graphql`
  query Project ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        name
        priority
      }
    }
  }
`
