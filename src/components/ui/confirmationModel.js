import styled from "styled-components";

const ConfirmWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--surface);
  border-radius: 10px;
  min-height: 150px;
  min-width: 300px;
  z-index: 9999;
`;

const Title = styled.h2`
  color: var(--text);
`;

const SubTitle = styled.p`
  color: gray;
  font-size: 1rem;
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
  margin-top: 1rem;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 10px;
  padding-inline: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $primary }) =>
    $primary ? "var(--primary)" : "transparent"};
  color: ${({ $primary }) => ($primary ? "white" : "var(--text)")};
  cursor: pointer;
`;

const ConfirmationModel = ({
  title,
  subTitle,
  actionText,
  onAction,
  onCancel,
}) => {
  return (
    <ConfirmWraper>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <BtnsContainer>
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          $primary
          onClick={() => {
            onAction();
          }}
        >
          {actionText}
        </Button>
      </BtnsContainer>
    </ConfirmWraper>
  );
};

export default ConfirmationModel;
