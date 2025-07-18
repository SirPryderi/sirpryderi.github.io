import type { GatsbyConfig } from "gatsby"

const title = `Vittorio Iocolano's Website`
const description = `Vittorio Iocolano's personal website, containing biography and portfolio`

const config: GatsbyConfig = {
  siteMetadata: {
    title,
    author: `Vittorio Iocolano`,
    username: `SirPryderi`,
    siteUrl: `https://sirpryderi.github.io`,
    description,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          "UA-19676043-2"
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: 'Oxanium',
            weights: ['200', '400', '600', '700']
          },
        ]
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: title,
        description,
        short_name: title,
        start_url: `/`,
        background_color: `#0a0e0c`,
        theme_color: `#0a0e0c`,
        display: `standalone`,
        icon: "src/images/icon.svg",
        icon_options: {
          purpose: `any maskable`,
        },
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-fontawesome-css",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "content",
        "path": "./content/"
      },
      __key: "content"
    }
  ]
}

export default config
