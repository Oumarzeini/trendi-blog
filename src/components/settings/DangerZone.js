import styled from "styled-components";
import { useStoreActions } from "easy-peasy";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: var(--surface);
  width: 90%;
  border-radius: 10px;
  box-shadow: 0 0 3px var(--border);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  width: 100%;
  background-color: red;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  font-size: 1rem;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentWraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;

  & button {
    font-size: 0.9rem;
    color: #ff2323;
    background-color: transparent;
    display: flex;
    justify-content: start;
    algin-items: center;
    border: none;
    font-weight: 500;
    cursor: pointer;
    padding: 5px;
  }
`;

const Line = styled.div`
  width: 100%;
  margin-inline: auto;
  height: 1px;
  background-color: #ccc;
`;

const DangerZone = ({ setShowDeletePostsModel, setShowDeleteAccountModel }) => {
  const setOverlayOn = useStoreActions((actions) => actions.setOverlayOn);

  return (
    <Container>
      <Header>
        <p>Danger Zone</p>
      </Header>
      <ContentWraper>
        <button
          onClick={() => {
            setShowDeletePostsModel(true);
            setOverlayOn(true);
          }}
        >
          Delete All Posts
        </button>
        <Line />
        <button
          onClick={() => {
            setShowDeleteAccountModel(true);
            setOverlayOn(true);
          }}
        >
          Delete Account
        </button>
      </ContentWraper>
    </Container>
  );
};

export default DangerZone;
