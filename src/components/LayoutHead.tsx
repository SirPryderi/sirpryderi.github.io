import * as React from "react"
import { HeadFC } from "gatsby"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { getSrc } from "gatsby-plugin-image"

type PageContext = { frontmatter: { name: string } }

const LayoutHead: HeadFC<Queries.Mdx, PageContext> = ({
  data,
  pageContext,
  location,
}) => {
  const metadata = useSiteMetadata()

  let image: string | undefined

  if (metadata.image?.childImageSharp) {
    image = `${metadata.siteUrl}${getSrc(metadata.image.childImageSharp!)}`
  }

  const seo = {
    title: pageContext.frontmatter?.name || metadata.title || "",
    username: metadata.username || "",
    author: metadata.author || "",
    description: metadata.description || data.excerpt || "",
    image,
    url: `${metadata.siteUrl}${location.pathname || ``}`,
    type: location.pathname ? "article" : "website",
  }

  return (
    <>
      <title>{seo.title}</title>

      <meta name="color-scheme" content="dark" />
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      <link rel="canonical" href={seo.url} />
      {seo.image && <meta name="image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:creator" content={seo.username} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      <meta property="og:site_name" content={metadata.title || seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      {seo.image && <meta property="og:image" content={seo.image} />}

      <style>{`body { margin: 0; background-color: #0a0e0c; }`}</style>
    </>
  )
}

export default LayoutHead
