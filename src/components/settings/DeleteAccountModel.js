import { useState } from "react";
import styled from "styled-components";
import { useStoreActions } from "easy-peasy";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: fit-content;
  border-radius: 1rem;
  //background-color: #342c2c;
  background-color: #fff;
  padding: 10px;
  padding-inline: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  z-index: 2001;

  @media (max-width: 768px) {
    width: 300px;
  }

  & .heading {
    font-weight: 500;
    color: #ff2323;
  }
`;

const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  & .instructions {
    color: gray;
    font-size: 0.9rem;
  }

  & input {
    width: 90%;
    padding: 5px;
    border: 1px solid black;
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
  }
`;

const BtnsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  & button {
    width: 80px;
    background-color: transparent;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }

  & button:nth-child(2) {
    background-color: #ff2323;
    color: white;
  }
`;

const DeleteAccountModel = ({ setShowDeleteAccountModel }) => {
  const [confirmationValue, setConfirmationValue] = useState("");
  const confirmation = "I want to delete my account permenentally";

  const setOverlayOn = useStoreActions((actions) => actions.setOverlayOn);

  // POSTS DELETION FUNC
  const deletePosts = () => {
    if (confirmationValue === "") {
      console.log("Please type the confirmation sentence");
      document.getElementById("confirm-account-deletion-input").style.border =
        "2px solid red";
      return;
    }
    if (confirmationValue.toLowerCase() === confirmation.toLowerCase()) {
      // DELETION LOGIC
      console.log("deleting account");
      document.getElementById("confirm-account-deletion-input").style.border =
        "1px solid green";
      return;
    } else {
      // Give feedback;
      console.log("confirmation not matched");
      document.getElementById("confirm-account-deletion-input").style.border =
        "2px solid red";
      return;
    }
  };

  const handleCancel = () => {
    setShowDeleteAccountModel(false);
    setOverlayOn(false);
    setConfirmationValue("");
    document.getElementById("confirm-account-deletion-input").style.border =
      "1px solid black";
  };

  return (
    <>
      <Container>
        <p className="heading">
          Are you sure you want to permenentally delete your account? this can't
          be undone!
        </p>

        <ConfirmContainer>
          <p className="instructions">
            To continue type the following: <br></br> I want to permenentally
            delete my account
          </p>
          <input
            id="confirm-account-deletion-input"
            type="text"
            value={confirmationValue}
            onChange={(e) => setConfirmationValue(e.target.value)}
          />
        </ConfirmContainer>
        <BtnsContainer>
          <button onClick={handleCancel}> Cancel</button>
          <button onClick={deletePosts}>Delete</button>
        </BtnsContainer>
      </Container>
    </>
  );
};

export default DeleteAccountModel;
