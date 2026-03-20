import styled from "styled-components";
import Switch from "../switch/Switch";

const Wraper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 30px;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justif-content: space-between;
  gap: 5px;

  & .label {
    font-weight: 500;
    font-size: 1rem;
  }

  & .description {
    width: 70%;
    color: gray;
    font-size: 0.9rem;
  }
`;

const NotifComponent = ({ title, subTitle }) => {
  return (
    <Wraper>
      <TextContainer>
        <p className="label">{title}</p>
        <p className="description">{subTitle}</p>
      </TextContainer>
      <Switch />
    </Wraper>
  );
};

export default NotifComponent;
