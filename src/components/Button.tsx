import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

const baseStyles = css`
  display: inline-flex;
  background: none;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  font-size: 24px;
  font-family: "Oxanium";
  width: fit-content;
  padding: 5px 20px;
  font-weight: 200;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  &:hover, &:focus {
    background-color: white;
    color: #0a0e0c;
    border: 2px solid #0a0e0c;
    font-weight: 400;
  }

  &:active {
    transform: translateY(2px) translateX(2px);
  }
`

const StyledButton = styled.button`
  ${baseStyles}
`
const StyledLink = styled(Link)`
  ${baseStyles}
`
const StyledAnchor = styled.a`
  ${baseStyles}
`

type ButtonProps = {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: React.MouseEventHandler
}

const Button = ({ children, to, href, ...props }: ButtonProps) => {
  if (to) {
    return (
      <StyledLink to={to} {...props}>
        {children}
      </StyledLink>
    )
  }

  if (href) {
    return (
      <StyledAnchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </StyledAnchor>
    )
  }

  return (
    <StyledButton role="button" {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
