import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLabel = styled.span`
  display: flex;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  background-color: #f6f6fb;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 500;
  color: gray;
  cursor: pointer;

  &:hover,
  &.active {
    color: rgb(55, 136, 250);
    background-color: rgb(224, 236, 255);

    & svg path {
      stroke: rgb(55, 136, 250);
    }
  }
`;

const NavItem = ({ icon, label, path }) => {
  const Icon = icon;
  return (
    <StyledNavLink to={path} end>
      <StyledIcon>
        <Icon />
      </StyledIcon>
      <StyledLabel>{label}</StyledLabel>
    </StyledNavLink>
  );
};

export default NavItem;
