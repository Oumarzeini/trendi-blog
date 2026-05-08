import styled from "styled-components";
// COMPONENTS AND ICONS
import SectionHeader from "./SectionHeader";
import Input from "./Input";
import Upload from "../../icons/Upload";
// HOOKS
import useWindowSize from "../../hooks/useWindowSize";
import useUploadAvatar from "../../hooks/db/useUploadAvatar";
import useAlert from "../../hooks/useAlert";
// REACT
import { useState, useEffect } from "react";
// HELPERS
import getUser from "../../utils/getUser";
import getAvatarUrl from "../../utils/getAvatarUrl";
import setUserDetails from "../../utils/setUserDetails";
import updatePassword from "../../utils/updatePassword";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: var(--bg);
  color: var(--text) !important;
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

  color: green;
  border-radius: 5px;
  font-size: 0.8rem;
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
  justify-content: start;
  align-items: center;

  padding: 10px;
  padding-top: 0;
  gap: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  @media (min-width: 768px) {
    width: 54%;
    margin-left: auto;
  }

  & button {
    margin-bottom: 10px;
  }

  & .cancelBtn {
    background-color: transparent;
    display: grid;
    place-content: center;
    border: none;
    width: 100px;
    padding: 8px;
    font-size: 1rem;
    color: var(--text);
    cursor: pointer;

    &:active {
      scale: 0.9;
    }
  }
`;

const SaveBtn = styled.button`
  min-width: 100px;
  background-color: rgb(55, 136, 250);
  display: grid;
  place-content: center;
  border: none;
  border-radius: 5px;
  padding: 8px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: 10px;
  }

  &:active {
    scale: 0.9;
  }

  &:hover {
    background-color: rgba(55, 136, 250, 0.84);
  }

  &.disabled {
    background-color: rgba(55, 136, 250, 0.5);
    cursor: not-allowed;

    &:active {
      scale: 1;
    }
  }
`;

const Account = () => {
  const [name, setName] = useState("...");
  const [username, setUsername] = useState("...");
  const [bio, setBio] = useState("...");
  const [email, setEmail] = useState("...");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialInfo, setInitialInfo] = useState({});
  const [saveBtnIsDis, setSaveBtnIsDis] = useState(true);
  const [saving, setSaving] = useState(false);

  const { width } = useWindowSize();
  const uploadAvatar = useUploadAvatar();

  const alert = useAlert();

  const getAndSetUser = async () => {
    const currentUser = await getUser();
    setUser(currentUser);
    setName(currentUser.full_name);
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setBio(currentUser?.bio ?? "");
    setInitialInfo({
      user: currentUser,
      email: currentUser.email,
      name: currentUser.full_name,
      username: currentUser.username,
      bio: currentUser?.bio ?? "",
    });
  };

  useEffect(() => {
    getAndSetUser();
  }, []);

  useEffect(() => {
    const updatedInof = () => {
      return (
        name !== initialInfo.name ||
        username !== initialInfo.username ||
        bio !== initialInfo.bio
      );
    };
    setSaveBtnIsDis(updatedInof());
  }, [
    name,
    username,
    bio,
    initialInfo.name,
    initialInfo.username,
    initialInfo.bio,
  ]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    setLoading(true);

    try {
      const newPath = await uploadAvatar(file, user);

      if (newPath) {
        setUser((prev) => ({
          ...prev,
          avatar: newPath,
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (name, username, bio) => {
    const isUpdated =
      name !== initialInfo.name ||
      username !== initialInfo.username ||
      bio !== initialInfo.bio;

    if (isUpdated) {
      setSaving(true);
      try {
        setUserDetails({ name, username, bio }, initialInfo.user, alert);
      } catch (err) {
        console.log(err);
        alert("err", err, true);
      } finally {
        setSaving(false);
        getAndSetUser();
      }
    }
  };

  const handlePasswordChange = (oldP, newP, confirmedP) => {
    if (oldP.length < 6 || newP.length < 6 || confirmedP.length < 6) {
      alert("err", "Min Password length is 6 characters", true);
      return;
    }

    if (newP !== confirmedP) {
      alert("err", "Passwords don't match !", true);
      return;
    }

    try {
      setSaving(true);
      updatePassword(initialInfo.email, oldP, newP, alert);
    } catch (err) {
      alert("err", err, true);
      console.log(err);
    } finally {
      setSaving(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

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
            <img src={getAvatarUrl(user?.avatar)} alt="" />
          </figure>
          <label htmlFor={loading ? "" : "avatarInput"}>
            <Upload height={"15px"} width={"15px"} color="gray" />
            {loading ? "uploading..." : "Upload Avatar"}
          </label>
          <input
            onChange={(e) => {
              if (loading) return;
              handleAvatarChange(e);
            }}
            id="avatarInput"
            type="file"
            accept="image/*"
          ></input>
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
            <Input
              width={width > 768 ? "100%" : "80%"}
              inputType="textarea"
              label="Bio"
              value={bio}
              setValue={setBio}
              placeholder="Tell something about yourself
              ..."
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

          <SaveBtn
            onClick={() => handleSave(name, username, bio)}
            disabled={!saveBtnIsDis}
            className={!saveBtnIsDis || saving ? "saveBtn disabled" : "saveBtn"}
          >
            {saving ? "Saving" : "Save Changes"}
          </SaveBtn>

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
            value={oldPassword}
            setValue={setOldPassword}
            required={true}
          />
          <div className="two-inputs-container">
            <Input
              width={width > 768 ? "100%" : "80%"}
              type="password"
              label={"New Password"}
              value={newPassword}
              setValue={setNewPassword}
              required={true}
            />
            <Input
              width={width > 768 ? "100%" : "80%"}
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              required={true}
            />
          </div>
        </div>
      </ContentWraper>
      <Footer>
        {/* <button className="cancelBtn">Cancel</button> */}
        <SaveBtn
          onClick={() =>
            handlePasswordChange(oldPassword, newPassword, confirmPassword)
          }
          disabled={
            oldPassword === "" || newPassword === "" || confirmPassword === "" ?
              true
            : false
          }
          className={
            (
              oldPassword === "" ||
              newPassword === "" ||
              confirmPassword === "" ||
              saving
            ) ?
              "disabled"
            : ""
          }
        >
          {saving ? "Saving" : "Save Password Changes"}
        </SaveBtn>
      </Footer>
    </Container>
  );
};

export default Account;
