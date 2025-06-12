import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Vittorio Iocolano's Website`,
    siteUrl: `https://sirpryderi.github.io`,
    description: `Vittorio Iocolano's personal website, containing biography and portfolio`,
    keywords: `Vittorio Iocolano, Software, Game, Web, Web, Developer, Programmer, Engineer`
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
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
        "name": "projects",
        "path": "./content/projects/"
      },
      __key: "projects"
    }
  ]
}

export default config
