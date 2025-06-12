import * as React from "react"
import { HeadFC } from "gatsby"

type PageContext = { frontmatter: { name: string } }

const LayoutHead: HeadFC<object, PageContext> = ({ pageContext }) => (
  <>
    <title>{pageContext.frontmatter?.name || "Home Page"}</title>
    <style>{`body { margin: 0; }`}</style>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap"
      rel="stylesheet"
    />
  </>
)

export default LayoutHead
