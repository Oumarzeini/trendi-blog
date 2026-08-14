import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import PrimaryLink from "../ui/primary/PrimaryLink";
import { useStoreActions, useStoreState } from "easy-peasy";
import getUser from "../../utils/getUser";
import { useState, useEffect } from "react";

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
  background-color: transparent;
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

const NavItem = ({ icon, label, path, isPrimary }) => {
  const Icon = icon;
  const setSidebarIsOpen = useStoreActions(
    (actions) => actions.setSidebarIsOpen,
  );
  const setShowSignInModel = useStoreActions(
    (actions) => actions.setShowSignInModel,
  );
  const setOverlayOn = useStoreActions((actions) => actions.setOverlayOn);
  const isGuest = useStoreState((state) => state.guest.isGuest);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isGuest) return;
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };

    fetchUser();
  }, [isGuest]);

  const navigate = useNavigate();

  if (isPrimary) {
    return (
      <PrimaryLink path={path}>
        <Icon />
        <p>{label}</p>
      </PrimaryLink>
    );
  }
  if (path === "profile") {
    return (
      <StyledNavLink
        onClick={(e) => {
          e.preventDefault();
          setSidebarIsOpen(false);

          if (isGuest) {
            setShowSignInModel(true);
            setOverlayOn(true);
            return;
          }

          navigate(`/app/profile/${user.username}`);
        }}
        to={path}
        end
      >
        <StyledIcon>
          <Icon />
        </StyledIcon>
        <StyledLabel>{label}</StyledLabel>
      </StyledNavLink>
    );
  }
  return (
    <StyledNavLink
      onClick={(e) => {
        e.preventDefault();
        setSidebarIsOpen(false);

        if (isGuest) {
          if (path === "feed") {
            navigate("/app/feed");
            return;
          }
          setShowSignInModel(true);
          setOverlayOn(true);
          return;
        }

        navigate(path);
      }}
      to={path}
      end
    >
      <StyledIcon>
        <Icon />
      </StyledIcon>
      <StyledLabel>{label}</StyledLabel>
    </StyledNavLink>
  );
};

export default NavItem;
