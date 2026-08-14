import "./AuthPage.css";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import Notify from "../../components/ui/notify";
import { useState, Activity, useEffect } from "react";
import supabase from "../../lib/supabase";
import styled from "styled-components";

const Container = styled.div`
  width: 40%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const ActionsContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    margin-top: 2rem;
    width: 100%;
    margin: 0 auto;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
`;

const Spacer = styled.div`
  width: 100%;
  height: 2rem;

  @media (max-width: 768px) {
    height: 1rem;
  }
`;

const ErrorFeedback = styled.div`
  width: 90%;
  background-color: var(--err-bg);
  color: var(--err-color);
  border: 1px solid red;
  padding: 10px;
  border-radius: 6px;

  @media (min-width: 768px) {
    margin-top: 10px;
  }
`;

const SuccessFeedback = styled.div`
  width: 90%;
  background-color: var(--success-bg);
  color: var(--success-color);
  border: 1px solid green;
  padding: 10px;
  border-radius: 6px;
  font-weight: 500;

  @media (min-width: 768px) {
    margin-top: 10px;
  }
`;

const Heading = styled.h2`
  color: var(--primary);

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: var(--text);
  font-weight: 500;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 60%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  color: var(--text);
`;

const Input = styled.input`
  outline: none;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  padding-left: 10px;
  font-size: 1rem;
  width: 100%;
  height: 50px;

  @media (max-width: 768px) {
    height: 50px;
  }
`;
const SendBtn = styled.button`
  width: 90%;
  outline: none;
  background-color: var(--primary);
  color: white;
  letter-spacing: 1px;
  padding: 10px;
  display: grid;
  place-content: center;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  margin-top: 1rem;
  cursor: pointer;
  opacity: 1;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const UpdatePassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSendButtonDisabled, setIsSenddButtonDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      if (!session) {
        setIsValidSession(false);
      } else {
        setIsValidSession(true);
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrMsg("Passwords don't match !");
      setShowErr(true);
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }
      setSuccessMsg("Password Updated successsfully");
      setShowSuccess(true);
      navigate("/app/feed");
    } catch (err) {
      setErrMsg(`${err.message} || ${err}, Please try again`);
      setShowErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="authPageMain">
      <Notify />
      <section className="logoSection">
        <figure>
          <img src={logo} alt="" />
        </figure>
        <p>Read, write and connect on the go.</p>
      </section>

      {isValidSession ?
        <Container>
          <Heading>Update Your Password</Heading>
          <Paragraph>Make sure to use a strong password</Paragraph>

          <ActionsContainer>
            <InputContainer>
              <Label htmlFor="password">Enter Your Password</Label>
              <Input
                onFocus={() => {
                  setShowErr(false);
                  setShowSuccess(false);
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsSenddButtonDisabled(false);
                }}
                type="password"
                id="password"
                placeholder="strongPassword123"
                required
              />
            </InputContainer>
            <Spacer />
            <InputContainer>
              <Label htmlFor="confirmPassword">Comfirm Your Password</Label>
              <Input
                onFocus={() => {
                  setShowErr(false);
                  setShowSuccess(false);
                }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setIsSenddButtonDisabled(false);
                }}
                type="password"
                id="confirmPassword"
                placeholder="strongPassword123"
                required
              />
            </InputContainer>

            <Activity mode={showErr ? "visible" : "hidden"}>
              <ErrorFeedback>
                <p>{errMsg}</p>
              </ErrorFeedback>
            </Activity>

            <Activity mode={showSuccess ? "visible" : "hidden"}>
              <SuccessFeedback>
                <p>{successMsg}</p>
              </SuccessFeedback>
            </Activity>

            <SendBtn
              disabled={isSendButtonDisabled}
              onClick={handleSubmit}
              type="submit"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </SendBtn>
          </ActionsContainer>
        </Container>
      : <p
          style={{
            marginTop: "2rem",
            marginLeft: "2rem",
            fontSize: "2rem",
            color: "red",
            fontWeight: "500",
          }}
        >
          This password reset link is invalid or has expired.{" "}
        </p>
      }
    </main>
  );
};

export default UpdatePassword;
