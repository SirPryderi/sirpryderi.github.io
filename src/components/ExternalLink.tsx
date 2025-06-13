import React from "react"
import {
  faDiscord,
  faGithub,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons"
import { faExternalLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

const StyledLink = styled.a`
  color: #fff;
  text-decoration: underline;
  font-weight: 500;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4em;
  padding: 0 .25rem;

  &:hover, &:focus {
    background-color: white;
    color: #0a0e0c;
    text-decoration: underline;
    text-shadow: none;
  }

  &:active {
    transform: translateY(2px) translateX(2px);
  }

  svg {
    align-self: center;
  }
`

type ExternalLinkProps = {
  text: string
  href: string
  icon?: "github" | "google-play" | "discord" | "link"
}

const iconMap = {
  github: faGithub,
  "google-play": faGooglePlay,
  discord: faDiscord,
  link: faExternalLink,
}

export const ExternalLinkContainer = styled.div`
  display: inline-flex;
  gap: 0.5rem;
`

const ExternalLink: React.FC<ExternalLinkProps> = ({
  text,
  href,
  icon = "link",
}) => (
  <StyledLink href={href} target="_blank" rel="noopener noreferrer">
    {icon && iconMap[icon] && <FontAwesomeIcon icon={iconMap[icon]} />}
    {text}
  </StyledLink>
)

export default ExternalLink
