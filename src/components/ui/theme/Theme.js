import { useEffect, useState } from "react";
import Moon from "../../../icons/NavIcons/Moon";
import styled from "styled-components";
import Switch from "../switch/Switch";
import { useStoreState, useStoreActions } from "easy-peasy";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 90%;
  padding: 10px;
  background-color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 500;
  margin-left: 13px;

  & p {
    color: gray;
  }
`;

const Theme = () => {
  const darkMode = useStoreState((state) => state.theme.darkMode);
  const setDarkMode = useStoreActions((actions) => actions.theme.setDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          gap: "5px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Moon />
        <p>Dark mode</p>
      </div>
      <Switch
        checked={darkMode ? true : false}
        onChange={() => setDarkMode(!darkMode)}
      />
    </Container>
  );
};

export default Theme;
