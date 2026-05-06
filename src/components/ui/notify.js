import styled from "styled-components";
import { useStoreState } from "easy-peasy";

const Container = styled.div`
  min-width: 200px;
  width: fit-content;

  height: 50px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$isSuccess ? `var(--primary)` : "red")};
  border-left: 3px solid
    ${(props) => (props.$isSuccess ? `var(--primary)` : "red")};
  padding: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--bg);
  z-index: 1000;
  box-shadow: 0 0 4px #a9a8a8;

  position: fixed;
  top: 80px;
  right: 10px;

  transform: translateX(200%);
  transition: transform 0.3s linear;

  &&.show {
    transform: translateX(0);
    transition: transform 0.3s linear;
  }

  & p {
    font-weight: 500;
    color: ${(props) =>
      props.$isSuccess ? `var(--primary)` : `var(--err-color)`};
  }
`;

const Notify = () => {
  const showNotify = useStoreState((state) => state.showNotify);
  const notifyMsg = useStoreState((state) => state.notifyMsg);
  const notifyType = useStoreState((state) => state.notifyType);

  return (
    <Container
      className={showNotify ? "show" : ""}
      $isSuccess={notifyType === "success" ? true : false}
    >
      <p>{notifyMsg}</p>
    </Container>
  );
};

export default Notify;
