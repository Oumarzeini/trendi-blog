import navItems from "../../data/navigation";
import SidebarSection from "./SidebarSection";
import NavItem from "./NavItem";
import styled from "styled-components";
import Theme from "../ui/theme/Theme";
import { useStoreState } from "easy-peasy";

const StyledAside = styled.aside`
  position: fixed;
  top: 60px;
  left: 0;
  width: 270px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  overflow: auto;
  border-right: 1px solid var(--border);
  padding: 10px;
  padding-bottom: 100px;
  z-index: 101;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 0;
    padding: 0;
    overflow: auto;
    transition: width 0.3s linear;

    &.open {
      width: 100%;
      padding: 10px;
      padding-bottom: 100px;
      transition: width 0.3s linear;
    }

    &.close {
      width: 0;
      padding: 0;
      overflow: auto;
      transition: width 0.3s linear;
    }
  }
`;

const Sidebar = () => {
  const sidebarIsOpen = useStoreState((state) => state.sidebarIsOpen);

  return (
    <StyledAside className={sidebarIsOpen ? "open" : "close"}>
      {navItems.map((section) => (
        <SidebarSection key={section.title} title={section.title}>
          {section.items.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              path={item?.path}
              isPrimary={item?.isPrimary}
            />
          ))}
        </SidebarSection>
      ))}
      <Theme />
    </StyledAside>
  );
};

export default Sidebar;
