import styled from "styled-components";

const Wraper = styled.div`
  width: ${(props) => props.width || "100%"};
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 8px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  color: black;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  height: 40px;
  border: 1px solid gray;
  border-radius: 5px;
  letter-spacing: 1px;
  font-size: 0.9rem;
  background-color: #e9e9e9a0;
`;

const Input = ({ type, width, label, value, setValue }) => {
  return (
    <Wraper width={width}>
      <Label>{label}</Label>
      <StyledInput
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={type === "email" ? true : false}
      ></StyledInput>
    </Wraper>
  );
};

export default Input;
