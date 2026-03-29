import styled from "styled-components";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
`;

function Missing() {
  return (
    <StyledSection>
      <p>Ops! Page not found or not implemented yet!...</p>
    </StyledSection>
  );
}

export default Missing;
