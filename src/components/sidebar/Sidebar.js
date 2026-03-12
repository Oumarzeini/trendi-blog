import navItems from "../../data/navigation";
import SidebarSection from "./SidebarSection";
import NavItem from "./NavItem";
import styled from "styled-components";

const StyledAside = styled.aside`
  position: fixed;
  top: 60px;
  left: 0;
  width: 270px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f6fb;
  overflow: auto;
  border-right: 1px solid gray;
  padding: 10px;
  padding-bottom: 100px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  return (
    <StyledAside>
      {navItems.map((section) => (
        <SidebarSection key={section.title} title={section.title}>
          {section.items.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              path={item.path}
            />
          ))}
        </SidebarSection>
      ))}
    </StyledAside>
  );
};

export default Sidebar;
