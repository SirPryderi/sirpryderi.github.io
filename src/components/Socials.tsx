import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SocialsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`

const SocialLink = styled.a`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-size: 2.5rem;
  padding: 5px;

  svg {
    width: 1em;
  }

  border-radius: 4px;

  &:hover,
  &:focus {
    color: #0a0e0c;
    background-color: white;
  }

  &:active {
    transform: translateY(2px) translateX(2px);
  }
`

type Social = {
  id: string
  url: string
  icon: any
}

type SocialsProps = {
  socials: Social[]
}

const Socials: React.FC<SocialsProps> = ({ socials }) => (
  <SocialsRow>
    {socials.map((social) => (
      <SocialLink
        key={social.id}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.id}
      >
        <FontAwesomeIcon icon={social.icon} />
      </SocialLink>
    ))}
  </SocialsRow>
)

export default Socials
