import styled from "styled-components";
import Switch from "../switch/Switch";

const Wraper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  margin-top: 10px;
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

  & .note {
    font-size: 0.7rem;
    color: rgb(55, 136, 250);
  }

  & .description {
    width: 70%;
    color: gray;
    font-size: 0.9rem;
  }

  &&.notAvailable {
    opacity: 0.5;
  }
`;

const NotifComponent = ({ title, subTitle, note, disabled }) => {
  return (
    <Wraper>
      <TextContainer className={disabled ? "notAvailable" : ""}>
        <p className="label">
          {title}{" "}
          {note ?
            <span className="note">{note}</span>
          : ""}{" "}
        </p>
        <p className="description">{subTitle}</p>
      </TextContainer>
      <Switch isDisabled={disabled} />
    </Wraper>
  );
};

export default NotifComponent;
