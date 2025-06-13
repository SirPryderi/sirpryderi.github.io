// components/Breadcrumbs.tsx
import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

interface BreadcrumbItem {
  title: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const BreadcrumbsContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  font-family: monospace;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }
`

const BreadcrumbLink = styled(Link)`
  color: #a0a0a0;
  text-decoration: none;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
  
  &:last-child {
    color: white;
    pointer-events: none;
    
    &:hover {
      text-decoration: none;
    }
  }
`

const Separator = styled.span`
  color: #666;
  user-select: none;
`

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <BreadcrumbsContainer aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={item.url}>
          <BreadcrumbLink to={item.url}>
            {item.title}
          </BreadcrumbLink>
          {index < items.length - 1 && (
            <Separator>//</Separator>
          )}
        </React.Fragment>
      ))}
    </BreadcrumbsContainer>
  )
}