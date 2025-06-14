import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import path from "path"


export const onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {

    const parent = getNode(node.parent!)

    const bucket: string | undefined = parent ? parent["relativeDirectory"] as string : undefined
    const slug: string | undefined = parent ? parent["name"] as string : undefined

    createNodeField({ name: "slug", node, value: `${slug}` })
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
        internal {
          contentFilePath
        }
        fields {
          type
          slug
        }
      }
    }
  }
`)

  result.data?.allMdx.nodes.forEach((node) => {
    if (!node.fields?.slug) return

    const type = node.fields?.type

    if (!type || type === "posts") return

    createPage({
      path: `${type}/${node.fields.slug}`,
      component: `${projectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      ownerNodeId: node.id,
      context: {
        id: node.id,
        type: type,
      },
    })
  })
}