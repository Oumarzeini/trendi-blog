import "./SettingsPage.css";
import Edit from "../../../icons/Edit";
import BackArrow from "../../../icons/BackArrow";
import profileImg from "../../../images/profileImage.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  const [fullname, setFullname] = useState("Alex Rivera");
  const [username, setUsername] = useState("arivera_writes");

  return (
    <>
      <header className="settingsHeader">
        <Link to="/profile">
          <BackArrow height={"25px"} width={"25px"} color={"blue"} />
        </Link>
        <h3>Edit Profile</h3>
      </header>

      <main>
        <section className="infoSection">
          <div className="figureContainer">
            <figure>
              <img src={profileImg} alt="Profile image" />
              <span className="editIconSpan">
                <Edit width={"30px"} height={"30px"} color={"white"} />
              </span>
            </figure>
          </div>
          <div className="SettingsNameNUsernameContainer">
            <div className="inputLabelContainer">
              <label htmlFor="fullname">Fullname</label>
              <input
                id="fullname"
                className="fullnameInput"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="inputLabelContainer">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="usernameInput"
                type="text"
                value={username}
              />
            </div>
          </div>
          <div className="descriptionInputContainer">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="descriptionTextInput"
              type="text"
              value="Digital nomad & tech enthusiast sharing stories about remote work,
              coding, and modern lifestyle. Coffee addict ☕️.
            "
            />
          </div>
          <button className="saveProfileBtn">Save</button>
        </section>
      </main>
    </>
  );
};

export default Settings;
