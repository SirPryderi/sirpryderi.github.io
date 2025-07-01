import * as React from "react"

import { type PageProps } from "gatsby"
import { ArticleTitle } from "../components/Article"
import Breadcrumbs from "../components/Breadcrumbs"
import Layout from "../components/Layout"
import LayoutHead from "../components/LayoutHead"
import Slide from "../components/Slide"
import CalendlyEmbed from "../components/CalendlyEmbed"

const breadcrumbItems = [
  { title: "home", url: "/" },
  { title: "meeting", url: "/meeting" },
]

const MeetingPage: React.FC<PageProps<null>> = ({}) => {
  return (
    <Layout>
      <Slide>
        <div>
          <Breadcrumbs items={breadcrumbItems} />
          <ArticleTitle>Let's chat</ArticleTitle>
        </div>
        <CalendlyEmbed
          url="https://calendly.com/vittorio-iocolano/30min"
          backgroundColor="0a0e0c"
          textColor="ffffff"
          primaryColor="ffffff"
          hideEventTypeDetails={false}
        />
      </Slide>
    </Layout>
  )
}

export default MeetingPage

export const Head = LayoutHead
