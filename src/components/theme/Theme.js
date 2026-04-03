import { useEffect, useState } from "react";
import Moon from "../../icons/NavIcons/Moon";
import styled from "styled-components";
import Switch from "../switch/Switch";

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
  const [darkMode, setDarkMode] = useState(false);

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
      <Switch checked={darkMode} onChange={() => setDarkMode((s) => !s)} />
    </Container>
  );
};

export default Theme;
