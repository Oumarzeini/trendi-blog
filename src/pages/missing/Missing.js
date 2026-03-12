import styled from "styled-components";

const StyledSection = styled.section`
  width: 100%;
  height: 100vh;
  padding: 10px;
`;

function Missing() {
  return (
    <StyledSection>
      <p>Ops! Page not found or not implemented yet!...</p>
    </StyledSection>
  );
}

export default Missing;
