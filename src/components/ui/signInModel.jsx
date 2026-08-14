import styled from "styled-components";
import Mail from "../../icons/Mail";
import { useNavigate, useLocation } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

const Container = styled.div`
  width: 500px;
  height: fit-content;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  gap: 20px;
  z-index: 1100;

  @media (max-width: 768px) {
    width: 350px;

    & p {
      width: 10%;
    }
  }

  & p {
    width: 80%;
    color: gray;
    font-size: 1.1rem;
    line-height: 28px;

    & .auth-link {
      color: var(--primary);
      text-decoration: underline;
      font-weight: 500;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;

  & .icon-container {
    display: grid;
    place-content: center;
    padding-inline: 5px;
    border: 2px solid var(--primary);
    border-radius: 4px;
  }

  & h3 {
    font-size: 1.6rem;
  }
`;
const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  margin-top: 2rem;

  & .continue-button {
    display: grid;
    place-content: center;
    padding: 10px;
    padding-inline: 15px;
    border-radius: 10px;
    background-color: var(--primary);
    color: white;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    width: 120px;
  }

  & .cancel-button {
    display: grid;
    place-content: center;
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
    color: gray;
    border: none;
    padding-inline: 15px;
    font-size: 1rem;
    cursor: pointer;
    width: 100px;
  }
`;

const SignInModel = () => {
  const setOverlayOn = useStoreActions((actions) => actions.setOverlayOn);
  const setShowSignInModel = useStoreActions(
    (actions) => actions.setShowSignInModel,
  );

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const onCancel = () => {
    setShowSignInModel(false);
    setOverlayOn(false);
    if (path.includes("profile")) {
      navigate(-1);
    }
  };
  return (
    <Container>
      <Header>
        <span className="icon-container">
          <Mail height={"30px"} width={"30px"} color={"var(--primary)"} />
        </span>
        <h3>Sign In</h3>
      </Header>
      <p>
        You will need to{" "}
        <span onClick={() => navigate("/auth")} className="auth-link">
          Sign in
        </span>{" "}
        or
        <span onClick={() => navigate("/auth")} className="auth-link">
          {" "}
          Create an account
        </span>{" "}
        to continue with this action.
      </p>

      <ButtonsContainer>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button
          onClick={() => {
            navigate("/auth");
            setShowSignInModel(false);
            setOverlayOn(false);
          }}
          className="continue-button"
        >
          Continue
        </button>
      </ButtonsContainer>
    </Container>
  );
};

export default SignInModel;
