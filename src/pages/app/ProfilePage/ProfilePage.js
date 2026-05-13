import "./ProfilePage.css";
//ICONS
import Edit from "../../../icons/Edit";
import Add from "../../../icons/Add";
import ImgIcon from "../../../icons/ImageIcon";
import DeleteIcon from "../../../icons/delete-icon";
//COMPONENTS
import Loader from "../../../components/ui/loader";
import Notify from "../../../components/ui/notify";
import PicturePreview from "../../../components/ui/picture-preview";
//HOOKS
import useAlert from "../../../hooks/useAlert";
import useUploadAvatar from "../../../hooks/db/useUploadAvatar";
import useClickOutside from "../../../hooks/useClickOutside";
//HELPERS
import getAvatarUrl from "../../../utils/getAvatarUrl";
import deleteAvatar from "../../../utils/deleteAvatar";
import getUser from "../../../utils/getUser";
//REACT AND OTHER
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../../lib/supabase";
import { useEffect, useState, Activity, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const showPicturePreview = useStoreState((state) => state.showPicturePreview);
  const setShowPicturePreview = useStoreActions(
    (actions) => actions.setShowPicturePreview,
  );
  const setOverlayOn = useStoreActions((actions) => actions.setOverlayOn);

  const imgMenuRef = useRef();

  const navigate = useNavigate();

  const alert = useAlert();

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

    if (!file) return;

    setUploadLoading(true);
    try {
      alert("success", "Uploading...", true);
      const newPath = await uploadAvatar(file, user, alert);

      if (newPath) {
        setUser((prev) => ({
          ...prev,
          avatar: newPath,
        }));
      }
      setShowAvatarMenu(false);
    } catch (err) {
      alert("err", err, true);
      console.log(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setDeleteLoading(true);

    try {
      const currentUser = await getUser();
      deleteAvatar(currentUser.id, alert);
      setShowAvatarMenu(false);
      alert("success", "Uploading...", true);

      setUser((prev) => ({
        ...prev,
        avatar: null,
      }));
    } catch (err) {
      console.error(err);
      alert("err", err, true);
    } finally {
      setDeleteLoading(false);
    }
  };

  // const onCancel = () => {
  //   setShowPicturePreview(false);
  //   setOverlayOn(false);
  // };

  if (loading) return <Loader />;
  return (
    <section className="profile-main">
      <Activity mode={showPicturePreview ? "visible" : "hidden"}>
        <PicturePreview src={getAvatarUrl(user?.avatar)} />
      </Activity>

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
            <img
              onClick={() => {
                setOverlayOn(true);
                setShowPicturePreview(true);
              }}
              src={getAvatarUrl(user?.avatar)}
              alt=""
            />
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
              <li role="button" className={uploadLoading ? "isDisabled" : ""}>
                <label className="profile-img-label" htmlFor="profile-img">
                  <ImgIcon
                    height={"20px"}
                    width={"20px"}
                    color={`var(--text)`}
                  />
                  {uploadLoading ? "Uploading..." : "Choose new picture"}
                </label>
                <input
                  onChange={(e) => handleAvatarChange(e)}
                  className="profile-img-input"
                  type="file"
                  accept="image/*"
                  id="profile-img"
                />
              </li>
              <li
                role="button"
                onClick={() => {
                  if (!user?.avatar) return;
                  handleDeleteAvatar();
                }}
                className={!user?.avatar ? "isDisabled" : ""}
              >
                {" "}
                <DeleteIcon
                  height={"20px"}
                  width={"20px"}
                  color={`var(--text)`}
                />{" "}
                {deleteLoading ? "Deleting..." : "Delete current picture"}
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
