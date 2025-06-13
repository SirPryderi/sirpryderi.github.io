import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import path from "path"


export const onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    const parent = getNode(node.parent!)

    const bucket: string | undefined = parent ? parent["relativeDirectory"] as string : undefined

    if (!bucket) return

    createNodeField({ name: "slug", node, value: `${value}` })
    createNodeField({ name: "type", node, value: `${bucket}` })
  }
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions

  const projectTemplate = path.resolve(`src/templates/Project.tsx`)

  const result = await graphql<Queries.GamesMdxQueryQuery>(`
  query GamesMdxQuery {
    allMdx {
      nodes {
        id
        frontmatter {
          slug
        }
        internal {
          contentFilePath
        }
        fields {
          type
        }
      }
    }
  }
`)

  result.data?.allMdx.nodes.forEach((node) => {
    if (!node.frontmatter) return

    const type = node.fields?.type

    if (!type || type === "posts") return

    createPage({
      path: `${type}/${node.frontmatter.slug}`,
      component: `${projectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      ownerNodeId: node.id,
      context: {
        id: node.id,
        type: type,
      },
    })
  })
}