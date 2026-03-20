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
  background-color: #f6f6fb;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 1px;
  font-weight: 500;
  color: gray;
  margin-left: 13px;
`;

const Theme = () => {
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
      <Switch />
    </Container>
  );
};

export default Theme;
