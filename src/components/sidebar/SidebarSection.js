import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

const StyledTitle = styled.h3`
  font-size: 0.7rem;
  color: gray;
`;

const SidebarSection = ({ title, children }) => {
  return (
    <StyledWrapper>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledWrapper>
  );
};

export default SidebarSection;
