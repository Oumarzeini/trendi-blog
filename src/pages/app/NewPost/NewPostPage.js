import "./NewPostPage.css";
import styled from "styled-components";
import ImageIcon from "../../../icons/ImageIcon";
import Eye from "../../../icons/Eye";
import { useEffect, useState } from "react";
import useCreateBlog from "../../../hooks/db/useCreateBlog";
import useBlogActions from "../../../hooks/db/useBlogActions";
import getUser from "../../../utils/getUser";
import useAlert from "../../../hooks/useAlert";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import supabase from "../../../lib/supabase";

const NewPostPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [showPreviewImg, setShowPreviewImg] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedBlogId, setEditedBlogId] = useState(null);

  const path = useLocation().pathname;

  useEffect(() => {
    setTitle("");
    setCategory("");
    setBody("");
    setPreviewImg(null);
    setPostImage(null);
  }, [path]);

  const { updateBlog } = useBlogActions();

  const alert = useAlert();
  const navigate = useNavigate();

  const { postId } = useParams();
  const isEditMode = Boolean(postId);

  useEffect(() => {
    const getAndSetUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    getAndSetUser();
  }, []);

  useEffect(() => {
    if (!isEditMode || !user) return;

    const fetchPostForEditing = async () => {
      const { data: post, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", postId)
        .single();

      if (error || !post) {
        alert("err", error.message || error || "Post not found", true);
        console.log("error fetching editing post", error);
        navigate("/write");
        return;
      }

      if (post.user_id !== user.id) {
        alert("err", "UNAUTHORIZED! You do not own this Post", true);
        console.log("UNAUTHORIZED");
        navigate("/write");
        return;
      }

      setEditedBlogId(post.id);

      setTitle(post.title);
      setCategory(post?.category || "uncategorized");
      setBody(post.body);

      if (post?.image_url) {
        // const imageURL = await getAvatarUrl(post.image_url);
        setPostImage(post?.image_url);
      } else {
        setPostImage(null);
      }
    };

    fetchPostForEditing();
  }, [postId, isEditMode, user, navigate, alert]);

  useEffect(() => {
    if (postImage) {
      setShowPreviewImg(true);
      if (isEditMode) {
        setPreviewImg(postImage);
      } else {
        const previewUrl = URL.createObjectURL(postImage);
        setPreviewImg(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
      }
    } else {
      setShowPreviewImg(false);
    }
  }, [postImage, isEditMode]);

  const { createBlog } = useCreateBlog(user);

  const handlePublish = async () => {
    if (!title || !body || title === "" || body === "") {
      alert("err", "Please fill the title and content fields", true);
      console.log("Please fill the title and content fields");
      return;
    }

    if (category === "") {
      setCategory("uncategorized");
    }

    setLoading(true);

    try {
      if (isEditMode) {
        const updates = { title, category, body, image_url: postImage };
        await updateBlog(editedBlogId, updates);
        setTitle("");
        setCategory("");
        setBody("");
        setPostImage(null);
        setPreviewImg(null);
        setShowPreviewImg(false);
        navigate(`/app/profile/${user?.username}`);
      } else {
        await createBlog({ title, body, category, file: postImage });
        setTitle("");
        setCategory("");
        setBody("");
        setPostImage(null);
        setPreviewImg(null);
        setShowPreviewImg(false);
        navigate("/app/feed");
      }
    } catch (err) {
      alert("err", err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (!e.target.files[0]) return;
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setPostImage(imageUrl);

    setPreviewImg(imageUrl);
    setMenuVisible(false);
  };

  return (
    <main className="newPostMain">
      <header className="newPostHeader">
        <h3>{isEditMode ? "Edit Your Post" : "New Post"}</h3>
      </header>

      <section className="innerContainer">
        <div className="titleNCategoryContainer">
          <div className="labelInputContainer">
            <label htmlFor="title">POST TITLE</label>
            <input
              placeholder="Enter title..."
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="line"></div>
          <div className="labelInputContainer">
            <label htmlFor="category">POST CATEGORY</label>
            <input
              placeholder="Enter category..."
              id="category"
              type="text"
              maxLength={"16"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="contentContainer">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder="Enter content..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        {showPreviewImg ?
          <ImagePreview>
            <img src={previewImg || ""} alt="" />
            <span
              onClick={() => {
                setMenuVisible((prev) => !prev);
              }}
            >
              {menuVisible ? "Cancel" : "Edit"}
            </span>
            <ul className={menuVisible ? "menu visible" : "menu"}>
              <li role="button">
                <label style={{ cursor: "pointer" }} htmlFor="newImg">
                  Change
                </label>
                <input
                  style={{
                    position: "absolute",
                    left: "-1000px",
                  }}
                  id="newImg"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </li>
              <li
                onClick={() => {
                  setPostImage(null);
                  setShowPreviewImg(false);
                  setMenuVisible(false);
                }}
                role="button"
              >
                Remove
              </li>
            </ul>
          </ImagePreview>
        : <div className="addImageContainer">
            <label id="imageLabel" htmlFor="image">
              <ImageIcon height={"40px"} width={"40px"} color="gray" />
              Attach an image
            </label>
            <input
              style={{
                position: "absolute",
                left: "-10000px",
              }}
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (!e.target.files[0]) return;
                setPostImage(e.target.files[0]);
              }}
            />
          </div>
        }

        <div className="buttonsContainer">
          <button
            onClick={() => {
              setTitle("");
              setBody("");
              setCategory("");
              setPostImage(null);
              setPreviewImg(null);
              setShowPreviewImg(false);
              navigate("/app/write");
            }}
            className="draftBtn"
          >
            {" "}
            Clear
          </button>
          <button
            onClick={() => {
              if (loading) return;
              handlePublish();
            }}
            className={loading ? "publishBtn btn-loading" : "publishBtn"}
          >
            {" "}
            <Eye height={"25px"} width={"25px"} color="white" />
            {loading && !isEditMode ?
              "Publishing..."
            : loading && isEditMode ?
              "Updating..."
            : !isEditMode ?
              "Publish"
            : "Update"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default NewPostPage;

const ImagePreview = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  & span {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background-color: var(--bg);
    color: var(--text);

    padding: 5px;
    padding-inline: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }

  & .menu {
    background-color: var(--bg);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    right: 10px;
    width: 100px;
    height: fit-content;
    gap: 5px;
    padding: 0;
    display: none;

    & li {
      padding: 5px;
      color: var(--text);
      cursor: pointer;
      border-radius: 5px;
      width: 100%;
    }

    & li:hover {
      background-color: var(--text);
      color: var(--bg);
    }
  }

  & .menu.visible {
    display: flex;
  }
`;
