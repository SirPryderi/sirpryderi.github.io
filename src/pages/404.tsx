import * as React from "react"
import { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Slide from "../components/Slide"
import Button from "../components/Button"

const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Slide $fullSize>
        <h1>// 404 // Page not found</h1>
        <p>
          These are not the pages you are looking for.
          <br />
          {process.env.NODE_ENV === "development" ? (
            <>
              <br />
              Try creating a page in <code style={codeStyles}>src/pages/</code>.
              <br />
            </>
          ) : null}
          <br />
          <br />
          <Button to="/">Go home</Button>
        </p>
      </Slide>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
