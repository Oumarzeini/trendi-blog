import "./ProfilePage.css";
import Edit from "../../../icons/Edit";
import Add from "../../../icons/Add";
import profileImg from "../../../images/profileImage.jpg";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  return (
    <>
      <header className="ProfilePageHeader"></header>

      <section className="infoSection">
        <figure>
          <img src={profileImg} alt="" />
        </figure>
        <div className="nameNUsernameContainer">
          <p className="fullname">Alex Rivera</p>
          <p className="username">arivera_writes</p>
        </div>
        <div className="descriptionContainer">
          <p className="descriptionText">
            Digital nomad & tech enthusiast sharing stories about remote work,
            coding, and modern lifestyle. Coffee addict ☕️.
          </p>
        </div>

        <button
          className="editProfileBtn"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <Edit height={"25px"} width={"25px"} color={"white"} /> Edit Profile
        </button>

        <button
          className="editProfileBtn"
          onClick={() => {
            navigate("/newPost");
          }}
        >
          <Add height={"25px"} width={"25px"} color={"white"} /> New Post
        </button>
      </section>

      <section className="recentStoriesSection">
        <h3>Recent Stories</h3>

        <p>No stories yet.</p>
      </section>
    </>
  );
}

export default ProfilePage;
