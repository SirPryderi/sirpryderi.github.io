import { graphql, type PageProps } from "gatsby"
import React from "react"
import Article, { ArticleMdx, ArticleTitle } from "../components/Article"
import Breadcrumbs from "../components/Breadcrumbs"
import Layout from "../components/Layout"
import LayoutHead from "../components/LayoutHead"

type Props = PageProps<Queries.AnyContentByIdQuery>

export default function GameTemplate({ data, children, location }: Props) {
  const document = data.mdx

  if (!document) return

  const slug = document.fields?.slug!
  const title = document.frontmatter?.name || "UNTITLED"
  const type = document.fields?.type || "UNCATEGORISED"

  const breadcrumbItems = [
    { title: "home", url: "/" },
    { title: type, url: `/#${type}` },
    { title: slug || "untitled", url: location.pathname },
  ]

  return (
    <Layout>
      <Article>
        <Breadcrumbs items={breadcrumbItems} />
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleMdx>{children}</ArticleMdx>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AnyContentById($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        name
        priority
      }
      fields {
        type
        slug
      }
    }
  }
`

export const Head = LayoutHead
