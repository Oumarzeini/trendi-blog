import "./ProfilePage.css";
import Edit from "../../../icons/Edit";
import Add from "../../../icons/Add";
import ImgIcon from "../../../icons/ImageIcon";
import DeleteIcon from "../../../icons/delete-icon";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../../lib/supabase";
import { useEffect, useState, Activity, useRef } from "react";
import Loader from "../../../components/ui/loader";
import Notify from "../../../components/ui/notify";
import useUploadAvatar from "../../../hooks/db/useUploadAvatar";
import useClickOutside from "../../../hooks/useClickOutside";
import getAvatarUrl from "../../../utils/getAvatarUrl";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  const imgMenuRef = useRef();

  const navigate = useNavigate();

  useClickOutside(imgMenuRef, () => setShowAvatarMenu(false));

  const uploadAvatar = useUploadAvatar();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setError(error.message);
          console.log(error.message);
          return;
        }

        const { data: user, userErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id);

        if (userErr) {
          console.log(userErr);
          return;
        }

        setUser(user[0]);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    const newPath = await uploadAvatar(file, user);

    if (newPath) {
      setUser((prev) => ({
        ...prev,
        avatar: newPath,
      }));
    }
  };

  if (loading) return <Loader />;
  return (
    <section className="profile-main">
      <Activity mode={error ? "visible" : "hidden"}>
        <p
          style={{
            fontSize: "2rem",
            textAlign: "center",
            color: "red",
          }}
        >
          {error}
        </p>
      </Activity>

      <Notify type={"success"} message={"Success Message"} />

      <section className="infoSection">
        <div className="upper-container">
          <figure>
            <img src={getAvatarUrl(user?.avatar)} alt="" />
          </figure>

          <span
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setShowAvatarMenu((prev) => !prev);
            }}
            className="edit-profile-img-icon"
          >
            <Edit height={"25px"} width={"25px"} color={`var(--primary)`} />
          </span>

          <div
            ref={imgMenuRef}
            className={showAvatarMenu ? "img-menu show" : "img-menu"}
          >
            <ul>
              <li>
                <label className="profile-img-label" htmlFor="profile-img">
                  <ImgIcon
                    height={"20px"}
                    width={"20px"}
                    color={`var(--text)`}
                  />
                  Choose new picture
                </label>
                <input
                  onChange={(e) => handleAvatarChange(e)}
                  className="profile-img-input"
                  type="file"
                  accept="image/*"
                  id="profile-img"
                />
              </li>
              <li>
                {" "}
                <DeleteIcon
                  height={"20px"}
                  width={"20px"}
                  color={`var(--text)`}
                />{" "}
                Delete current picture
              </li>
            </ul>
          </div>
        </div>
        <div className="nameNUsernameContainer">
          <p className="fullname">{user?.full_name ?? "Undefined"}</p>
          <p className="username">{user?.username ?? "Undefined"}</p>
        </div>
        <div className="descriptionContainer">
          <p className="descriptionText">
            {user?.bio ?? <Link to="/app/settings">Add Bio</Link>}
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
