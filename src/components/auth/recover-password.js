import { useState, useRef, Activity } from "react";
import styled from "styled-components";
import supabase from "../../lib/supabase";

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
  border-radius: 5px;
  padding: 5px;
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

const BackBtn = styled.button`
  width: 90%;
  outline: none;
  background-color: transparent;
  color: var(--text);
  letter-spacing: 1px;
  padding: 10px;
  display: grid;
  place-content: center;
  border-radius: 8px;
  border: 1px solid var(--border);
  font-size: 1.1rem;
  margin-top: 0.5rem;
  cursor: pointer;

  &:disabled {
    color: gray;
  }
`;

const RecoverPassword = ({ setShowRecover }) => {
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isBackBtnDisabled, setIsBackBtnDisabled] = useState(false);
  const [isSendButtonDisabled, setIsSenddButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  //const isValidEmail = () => {};

  const handleSubmit = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "" || !regex.test(email)) {
      emailRef.current.style.borderColor = "red";
      emailRef.current.style.borderWidth = "3px";
      setIsBackBtnDisabled(true);
      setShowErr(true);
      setErrMsg("Please enter a valid Email");
      setIsSenddButtonDisabled(true);
      setTimeout(() => {
        emailRef.current.style.borderColor = "black";
        emailRef.current.style.borderWidth = "1px";
        setIsBackBtnDisabled(false);
      }, 1500);
    } else {
      setLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "http://192.168.56.1:3000/auth/update-password",
        });
        if (error) {
          throw error;
        } else {
          setSuccessMsg("Check your Email inbox for a reset link.");
          setShowSuccess(true);
          setIsSenddButtonDisabled(true);
        }
      } catch (err) {
        setShowErr(true);
        setErrMsg(`An error occured, ${err} , Please try again`);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Container>
      <Heading>Recover Your Password</Heading>
      <Paragraph>You will receive an email to reset your password</Paragraph>

      <ActionsContainer>
        <InputContainer>
          <Label htmlFor="email">Enter Your Email</Label>
          <Input
            onFocus={() => {
              setShowErr(false);
              setShowSuccess(false);
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsSenddButtonDisabled(false);
            }}
            ref={emailRef}
            type="email"
            id="email"
            placeholder="example@gmail.com"
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
          disabled={isSendButtonDisabled || loading}
          onClick={handleSubmit}
          type="submit"
        >
          {loading ? "Sending..." : "Send Email"}
        </SendBtn>
        <BackBtn
          disabled={isBackBtnDisabled}
          onClick={() => {
            setShowRecover((showRecover) => !showRecover);
          }}
        >
          Go Back
        </BackBtn>
      </ActionsContainer>
    </Container>
  );
};

export default RecoverPassword;
