import styled from "styled-components";
import SectionHeader from "./SectionHeader";
import profileImg from "../../images/profileImage.jpg";
import Input from "./Input";
import Upload from "../../icons/Upload";
import useWindowSize from "../../hooks/useWindowSize";
import { useState } from "react";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fbfbfb;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0 0 3px gray;

  @media (max-width: 768px) {
    width: 100%;
  }

  & .profile-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 15px;

    & figure {
      width: 100px;
      height: 100px;
      border-radius: 50%;

      & img {
        width: 100%;
        border-radius: 50%;
        height: 100%;
        object-fit: cover;
      }
    }

    & #avatarInput {
      position: absolute;
      left: -1000px;
    }

    & label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding-inline: 10px;
      padding-block: 5px;
      border-radius: 5px;
      border: 1px solid gray;
      background-color: transparent;
      letter-spacing: 1px;
      font-weight: 500;
      cursor: pointer;
    }

    & .inputs-container {
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  & .two-inputs-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 5px;
    justif-content: space-between;
  }

  @media (max-width: 768px) {
    & .two-inputs-container {
      flex-direction: column;
    }
  }
`;

const ContentWraper = styled.div`
  width: 100%;
  justify-content: space-around;
  display: flex;
  padding: 10px;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const Verified = styled.p`
  height: 40px;
  padding: 5px;
  padding-inline: 10px;
  background-color: #abf3b1;
  border: 1px solid green;
  color: green;
  border-radius: 5px;
  font-size: 0.7rem;
  letter-spacing: 1px;
  font-weight: 400;
  margin-block: auto;
  display: grid;
  place-content: center;
  margin-top: 30px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  margin-block: 2rem;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 10px;
  gap: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  & .saveBtn {
    width: 100px;
    background-color: rgb(55, 136, 250);
    display: grid;
    place-content: center;
    border: none;
    border-radius: 5px;
    padding: 8px;
    font-size: 1rem;
    color: white;
    cursor: pointer;

    &:active {
      scale: 0.9;
    }
    &:hover {
      background-color: rgba(55, 136, 250, 0.84);
    }
  }

  & .cancelBtn {
    background-color: transparent;
    display: grid;
    place-content: center;
    border: none;
    width: 100px;
    padding: 8px;
    font-size: 1rem;
    color: black;
    cursor: pointer;

    &:active {
      scale: 0.9;
    }
  }
`;

const Account = () => {
  const [name, setName] = useState("Alexander Thompson");
  const [username, setUsername] = useState("Alexander_Thompson9");
  const [email, setEmail] = useState("Alexander@gmail.com");
  const [password, setPassword] = useState("***********");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const { width } = useWindowSize();

  return (
    <Container>
      <SectionHeader
        title={"Account"}
        subTitle={
          "Update your personal profile, email and security credentials."
        }
      />

      <ContentWraper>
        <div className="profile-container">
          <figure>
            <img src={profileImg} />
          </figure>
          <label htmlFor="avatarInput">
            <Upload height={"15px"} width={"15px"} color="gray" /> Upload Avatar
          </label>
          <input id="avatarInput" type="file"></input>
        </div>

        <div className="inputs-container">
          <div className="name-username-container">
            <Input
              width={width > 768 ? "100%" : "80%"}
              type="text"
              label={"Full Name"}
              value={name}
              setValue={setName}
            />
            <Input
              width={width > 768 ? "100%" : "80%"}
              type="text"
              label="Username"
              value={username}
              setValue={setUsername}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              width="100%"
              type="email"
              label="Email"
              value={email}
              setValue={setEmail}
            />
            <Verified>Verified</Verified>
          </div>

          <Line />

          <h3>Change Password</h3>
          <p
            style={{
              marginBottom: "1rem",
              marginTop: ".5rem",
              fontSize: ".8rem",
            }}
          >
            Keep your account secure with a strong password.
          </p>

          <Input
            label="Current Password"
            type="password"
            width={width > 768 ? "100%" : "80%"}
            value={password}
            setValue={setPassword}
          />
          <div className="two-inputs-container">
            <Input
              width={width > 768 ? "100%" : "80%"}
              type="password"
              label={"New Password"}
              value={newPassword}
              setValue={setNewPassword}
            />
            <Input
              width={width > 768 ? "100%" : "80%"}
              type="password"
              label="Confirm Password"
              value={ConfirmPassword}
              setValue={setConfirmPassword}
            />
          </div>
        </div>
      </ContentWraper>
      <Footer>
        <button className="cancelBtn">Cancel</button>
        <button className="saveBtn">Save</button>
      </Footer>
    </Container>
  );
};

export default Account;
