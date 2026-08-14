import styled from "styled-components";
import supabase from "../../lib/supabase";
import { useEffect, useState, Activity } from "react";
import { useNavigate } from "react-router-dom";
import Person from "../../icons/person";

const Wraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 40px;

  @media (min-width: 768px) {
    width: 50%;
    margin: 0;
  }
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & label {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .inputContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-block: 5px;
    padding-inline: 10px;
    background-color: rgb(237, 237, 237);
    border-radius: 10px;
    height: 40px;
    position: relative;
  }

  & input {
    width: 100%;
    height: 40px;
    border: none;
    color: black;
    font-size: 1rem;
    background-color: transparent;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  width: 80%;
  color: rgb(113, 0, 0);
  text-align: center;
  background-color: rgba(255, 0, 0, 0.187);
  padding: 10px;
  border: 1px solid red;
  border-radius: 8px;
  letter-spacing: 1px;
`;

const ContinueBtn = styled.button`
  width: 80%;
  height: 40px;
  border-radius: 8px;
  background-color: var(--primary);
  color: white;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
`;

const SetName = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [userName]);

  const handleSetName = async (name) => {
    if (name === "") {
      setError("Please Enter Your Name");
      return;
    }

    if (name.length < 5) {
      setError("Minimum name length is 5 characters !");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setError("Error authenticating, please refresh the page");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update([{ full_name: name }])
        .eq("id", user.id);

      if (error) {
        setError(error.message);
        return;
      } else {
        navigate("/app");
        setSuccess("Name set successsfully");
      }
    } catch (err) {
      setError(err.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wraper>
      <Container className="labelinputcontainer">
        <label htmlFor="name">What should we call you ?</label>
        <div className="inputContainer">
          <Person height={"20px"} width={"20px"} color={"gray"} />
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
      </Container>

      <Activity mode={error ? "visible" : "hidden"}>
        <ErrorMessage>{error}</ErrorMessage>
      </Activity>

      <ContinueBtn
        onClick={() => {
          handleSetName(userName);
        }}
      >
        {success ?
          success
        : loading ?
          "Setting name..."
        : "Continue"}
      </ContinueBtn>
    </Wraper>
  );
};

export default SetName;
