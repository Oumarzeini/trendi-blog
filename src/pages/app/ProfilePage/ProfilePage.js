import "./ProfilePage.css";
import Edit from "../../../icons/Edit";
import Add from "../../../icons/Add";
import profileImg from "../../../images/profileImage.jpg";
import { useNavigate, Link } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  return (
    <section className="profile-main">
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
            navigate("/app/settings");
          }}
        >
          <Edit height={"25px"} width={"25px"} color={"white"} /> Edit Profile
        </button>
        <Link className="editProfileBtn" to={"/app/new-post"}>
          <Add height={"25px"} width={"25px"} color={"white"} /> New Post
        </Link>
      </section>

      <section className="recentStoriesSection">
        <h3>Recent Stories</h3>

        <p>No stories yet.</p>
      </section>
    </section>
  );
}

export default ProfilePage;
