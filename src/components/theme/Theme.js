import Moon from "../../icons/NavIcons/Moon";
import styled from "styled-components";

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

const Input = styled.input`
  position: relative;
  appearance: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 15px;
    background-color: #ccc;
    transform: translateY(-5px);
    border-radius: 15px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 17px;
    height: 17px;
    background-color: gray;
    transform: translateY(-6px) translateX(-18px);
    border-radius: 50%;
    transition: transform 0.3s linear;
  }

  &&:checked:after {
    background-color: #687cff;
    transform: translateY(-6px);
    border-radius: 50%;
  }

  &:checked::before {
    background-color: #b7c1ff;
  }
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
      <Input type="checkbox" />
    </Container>
  );
};

export default Theme;
