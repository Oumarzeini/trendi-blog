import styled from "styled-components";

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

const Switch = () => {
  return <Input type="checkbox" />;
};

export default Switch;
