import * as React from "react"
import { HeadFC } from "gatsby"

type PageContext = { frontmatter: { name: string } }

const LayoutHead: HeadFC<object, PageContext> = ({ pageContext }) => (
  <>
    <title>{pageContext.frontmatter?.name || "Home Page"}</title>
    <style>{`body { margin: 0; background-color: black; }`}</style>
  </>
)

export default LayoutHead
