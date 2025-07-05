import styled from "styled-components"

const Slide = styled.section<{ $fullSize?: boolean }>`
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

export default Slide
