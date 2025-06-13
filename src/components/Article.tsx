import React from "react"
import { MDXProvider } from "@mdx-js/react"
import styled from "styled-components"
import ExternalLink, { ExternalLinkContainer } from "./ExternalLink"

const Article = styled.article`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem 2rem;
  color: white;
  font-family: "Oxanium", sans-serif;

  text-shadow: 0 0px 5px #0a0e0c;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const shortcodes = { ExternalLink, ExternalLinkContainer }

export const ArticleTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: 0.04em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

export const ArticleMdx = ({ children }: { children: React.ReactNode }) => (
  <MDXProvider components={shortcodes}>{children}</MDXProvider>
)

export default Article
