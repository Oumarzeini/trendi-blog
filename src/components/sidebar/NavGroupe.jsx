import styled from "styled-components";

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 8px;
`;

const StyledTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: gray;
  &:hover {
    color: blue;
  }
`;

const StyledEl = styled.li`
  color: gray;
  font-size: 0.9rem;
  padding: 5px;
`;

const NavGroupe = ({ title, elements }) => {
  return (
    <StyledUl>
      <StyledTitle className="title">{title}</StyledTitle>
      {elements.map((el) => (
        <StyledEl key={crypto.randomUUID()}>{el}</StyledEl>
      ))}
    </StyledUl>
  );
};

export default NavGroupe;
