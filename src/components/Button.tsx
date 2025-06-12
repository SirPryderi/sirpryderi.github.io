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
  transition: color 0.3s, background 0.3s, border 0.3s;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  &:hover {
    border: 2px solid #dbc554;
    color: #dbc554;
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
        referrerPolicy="no-referrer"
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
