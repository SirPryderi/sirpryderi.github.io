import React from "react"
import styled from "styled-components"

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  position: relative;
  padding-left: 1.5em;
  margin-bottom: 0.5em;

  &::before {
    content: ">";
    font-family: monospace;
    position: absolute;
    left: 0;
    font-weight: bold;
    font-size: 1.1em;
  }
`

type HobbyListProps = {
  hobbies: string[]
}

const HobbyList: React.FC<HobbyListProps> = ({ hobbies }) => (
  <List>
    {hobbies.map((hobby) => (
      <ListItem key={hobby}>{hobby}</ListItem>
    ))}
  </List>
)

export default HobbyList
