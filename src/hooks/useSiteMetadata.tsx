import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery<Queries.SiteMetadataQuery>(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          username
        }
      }
      img: file(relativePath: { eq: "photo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 1200, height: 630)
        }
      }
    }
  `)

  return { image: data.img, ...data.site?.siteMetadata! }
}
