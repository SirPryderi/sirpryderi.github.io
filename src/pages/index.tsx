import * as React from "react"
import { graphql, Link, type PageProps } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import LayoutHead from "../components/LayoutHead"
import Button from "../components/Button"
import { StaticImage } from "gatsby-plugin-image"
import HobbyList from "../components/HobbyList"
import Socials from "../components/Socials"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons"

const Slide = styled.section<{ $fullSize?: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 1840px;
  padding: 40px 200px;
  margin: 0 auto;
  justify-content: center;
  min-height: ${(props) => (props.$fullSize ? "100vh" : "auto")};

  // responsive breakpoints
  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  h2 {
    font-size: 4rem;
    margin: 0;
  }
`

const Title = styled.div`
  display: flex;
  flex-flow: column;

  @media (max-width: 768px) {
    box-sizing: border-box;
    justify-self: flex-start;
    min-height: calc(100vh - 80px);
    padding: 20px;
    padding-top: 40px;
  }

  h1 {
    margin: 1rem 0;
    font-size: 86px;

    @media (max-width: 768px) {
      font-size: 3rem;
    }

    .name {
      font-weight: 600;
    }

    .surname {
      font-weight: 200;
    }
  }

  .role {
    font-weight: 200;
    display: inline-flex;
    font-size: 36px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;

  h2 {
    font-size: 2rem;
  }
`

const ProjectCard = styled(Link)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #0a0e0c;
  border: 2px solid white;
  padding: 1.5rem 1rem;
  color: #fff;
  text-decoration: none;

  position: relative;
  overflow: hidden;

  &:hover {
    background-color: white;
    color: #0a0e0c;
    border-color: #0a0e0c;
  }

  &:active {
    transform: translateY(2px) translateX(2px);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0 0;
    letter-spacing: 0.04em;
  }
`

const Blackout = styled.div`
  display: grid;

  border-top: 2px solid white;
  border-bottom: 2px solid white;
  display: flex;
  background-color: #0a0e0c;
  width: 100%;
  padding: 10vh 0;

  margin-bottom: 160px;
`

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;

  > * {
    flex-basis: 200px;
    flex: 1;
    min-width: 200px;
  }
`

const IndexPage: React.FC<PageProps<Queries.HomePageQuery>> = ({ data }) => {
  return (
    <Layout>
      <Slide $fullSize>
        <Title>
          <div className="role">Full-Stack Engineer</div>
          <h1>
            <span className="name">Vittorio</span>{" "}
            <span className="surname">Iocolano</span>
          </h1>
          <Button href="mailto:pryderi.mail@gmail.com">Hire Me</Button>
        </Title>
        {/* ▿ */}
      </Slide>

      <Blackout>
        <Slide id="about">
          <h2>About</h2>
          <FlexRow>
            <div style={{ flexBasis: 512 }}>
              <p>
                I'm Vittorio (he/him), a full stack-stack engineer based in
                Scotland. I've been writing code professionally since 2015, but
                my real passion lies in building software that sparks joy.
              </p>
              <p>
                I combine technical expertise but without losing track of what
                brings customers value, always asking{" "}
                <i>"what if we tried it differently?"</i>
              </p>
              <p>
                When I'm not coding, you'll find me playing (or designing!)
                board games, capturing the world through my camera lens, or
                exploring Scotland's trails on foot or by bike.
              </p>
            </div>

            <HobbyList
              hobbies={[
                "Engineering",
                "Photography",
                "Parkour",
                "Hiking",
                "Bikepacking",
                "Videogames",
                "Board games",
                "TTRPGs",
              ]}
            />

            <StaticImage
              aspectRatio={1}
              alt="Vittorio Iocolano"
              src="../images/photo.png"
              transformOptions={{ grayscale: true }}
              style={{
                maxWidth: 256,
                maxHeight: 256,
                border: "2px solid white",
              }}
            />
          </FlexRow>
        </Slide>
      </Blackout>

      <Slide id="projects">
        <h2>Projects</h2>
        <ProjectsGrid>
          {data.allMdx.nodes.map(({ frontmatter }) => (
            <ProjectCard
              key={frontmatter!.slug}
              to={`/projects/${frontmatter!.slug}`}
            >
              <h3>{frontmatter!.name}</h3>
              <pre>{`> /projects/${frontmatter!.slug}`}</pre>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Slide>

      <Slide
        id="socials"
        aria-label="Social Links"
        style={{ textAlign: "center" }}
        $fullSize
      >
        <Socials
          socials={[
            {
              id: "email",
              url: "mailto:pryderi.mail@gmail.com",
              icon: faEnvelope,
            },
            {
              id: "linkedin",
              url: "https://www.linkedin.com/in/vittorio-iocolano/",
              icon: faLinkedinIn,
            },
            {
              id: "github",
              url: "https://github.com/sirpryderi",
              icon: faGithub,
            },
            {
              id: "instagram",
              url: "https://www.instagram.com/sirpryderi/",
              icon: faInstagram,
            },
          ]}
        />
      </Slide>
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomePage {
    allMdx {
      nodes {
        frontmatter {
          name
          slug
        }
      }
    }
  }
`

export default IndexPage

export const Head = LayoutHead
