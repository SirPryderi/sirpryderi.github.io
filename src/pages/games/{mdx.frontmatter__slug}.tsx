import { graphql, type PageProps } from "gatsby"
import React from "react"
import Article, { ArticleMdx, ArticleTitle } from "../../components/Article"
import Breadcrumbs from "../../components/Breadcrumbs"
import Layout from "../../components/Layout"
import LayoutHead from "../../components/LayoutHead"

type Props = PageProps<Queries.GameBySlugQuery>

export default function GameTemplate({ data, children, location }: Props) {
  const frontmatter = data.mdx?.frontmatter

  const breadcrumbItems = [
    { title: "home", url: "/" },
    { title: "games", url: "/#games" },
    { title: frontmatter?.slug || "game", url: location.pathname },
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
  query GameBySlug($frontmatter__slug: String!) {
    mdx(frontmatter: { slug: { eq: $frontmatter__slug } }, internal: {type: {eq: "Mdx"}, contentFilePath: {regex: "/content/game/"}}) {
      frontmatter {
        slug
        name
        priority
      }
      body
    }
  }
`

export const Head = LayoutHead
