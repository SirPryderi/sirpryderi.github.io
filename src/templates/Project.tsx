import { graphql, type PageProps } from "gatsby"
import React from "react"
import Article, { ArticleMdx, ArticleTitle } from "../components/Article"
import Breadcrumbs from "../components/Breadcrumbs"
import Layout from "../components/Layout"
import LayoutHead from "../components/LayoutHead"

type Props = PageProps<Queries.AnyContentByIdQuery>

export default function GameTemplate({ data, children, location }: Props) {
  const frontmatter = data.mdx?.frontmatter
  const type = data.mdx?.fields?.type || "UNKNOWN"

  const breadcrumbItems = [
    { title: "home", url: "/" },
    { title: type, url: `/#${type}` },
    { title: frontmatter?.slug || type, url: location.pathname },
  ]

  return (
    <Layout>
      <Article>
        <Breadcrumbs items={breadcrumbItems} />
        <ArticleTitle>{frontmatter?.name}</ArticleTitle>
        <ArticleMdx>{children}</ArticleMdx>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AnyContentById($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        slug
        name
        priority
      }
      fields {
        type
      }
    }
  }
`

export const Head = LayoutHead
