import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

const PrimaryLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  background-color: rgb(55, 136, 250);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 500;
  color: gray;
  cursor: pointer;

  & p {
    color: white;
  }
`;

const PrimaryBtn = ({ path, children }) => {
  const setSidebarIsOpen = useStoreActions(
    (actions) => actions.setSidebarIsOpen,
  );

  return (
    <PrimaryLink onClick={() => setSidebarIsOpen(false)} to={path}>
      {children}
    </PrimaryLink>
  );
};

export default PrimaryBtn;
