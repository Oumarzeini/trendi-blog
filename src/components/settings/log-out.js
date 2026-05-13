import styled from "styled-components";
import LogoutIcon from "../../icons/logout";
import supabase from "../../lib/supabase";
import useAlert from "../../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import { useState, Activity } from "react";
import { useStoreActions } from "easy-peasy";

const Container = styled.div`
  width: 90%;
  box-shadow: 0 0 4px gray;
  border-radius: 10px;
  background-color: var(--bg);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: transparent;
  display: flex !important;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border: none;
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    & span {
      transform: translateY(2px);
    }
  }

  & span {
    transform: translateY(3px);
  }
`;

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

const LogOut = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const setOverlayOn = useStoreActions((actions) => actions.setOverlayOn);

  const navigate = useNavigate();
  const alert = useAlert();

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      alert("error", error.message, true);
      return;
    }

    try {
      navigate("/auth", { replace: true });
    } catch (err) {
      console.log(err.message);
      alert("err", err.message, true);
    } finally {
      setOverlayOn(false);
      setShowPopup(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <LogoutButton
        onClick={() => {
          setOverlayOn(true);
          setShowPopup(true);
        }}
      >
        {" "}
        <span>
          <LogoutIcon height={"20px"} width={"20px"} color={"gray"} />
        </span>
        Log out
      </LogoutButton>

      <Activity mode={showPopup ? "visible" : "hidden"}>
        <ConfirmWraper>
          <Title>See You Soon</Title>
          <SubTitle>Are you sure this is what you want ?</SubTitle>
          <BtnsContainer>
            <Button
              onClick={() => {
                setOverlayOn(false);
                setShowPopup(false);
              }}
            >
              Cancel
            </Button>
            <Button
              $primary
              onClick={() => {
                handleLogout();
              }}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </BtnsContainer>
        </ConfirmWraper>
      </Activity>
    </Container>
  );
};

export default LogOut;
