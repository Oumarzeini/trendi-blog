import "./NewPostPage.css";
import styled from "styled-components";
import ImageIcon from "../../../icons/ImageIcon";
import Eye from "../../../icons/Eye";
import { useEffect, useState } from "react";
import useCreateBlog from "../../../hooks/db/useCreateBlog";
import getUser from "../../../utils/getUser";
import useAlert from "../../../hooks/useAlert";
import { useStoreActions, useStoreState } from "easy-peasy";

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
  const [draftLoading, setDraftLoading] = useState(false);
  const draftPosts = useStoreState((state) => state.drafts.draftPosts);
  const setDraftPosts = useStoreActions(
    (actions) => actions.drafts.setDraftPosts,
  );

  const alert = useAlert();

  useEffect(() => {
    const getAndSetUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };

    getAndSetUser();
  }, []);

  useEffect(() => {
    if (postImage) {
      setShowPreviewImg(true);
      const previewUrl = URL.createObjectURL(postImage);
      setPreviewImg(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setShowPreviewImg(false);
    }
  }, [postImage]);

  const { createBlog } = useCreateBlog(user);

  const handlePublish = async () => {
    if (!title || !body || title === "" || body === "") {
      alert("err", "Please fill the title and content fields", true);
      console.log("Please fill the title and content fields");
      return;
    }

    if (category === "") setCategory("uncategorized");

    // alert(
    //   "success",
    //   `title: ${title}, category: ${category}, content: ${body}, img: ${JSON.stringify(postImage)}`,
    //   true,
    // );

    setLoading(true);

    try {
      await createBlog({ title, body, category, file: postImage });
      setTitle("");
      setCategory("");
      setBody("");
      setPostImage(null);
      setPreviewImg(null);
      setShowPreviewImg(false);
    } catch (err) {
      alert("err", err, true);
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async () => {
    if (!title || !body || title === "" || body === "") {
      alert("err", "Please fill the title and content fields", true);
      console.log("Please fill the title and content fields");
      return;
    }

    const returnUser = async () => {
      const currentUser = await getUser();
      return currentUser;
    };

    const user = await returnUser();

    const toBase64 = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    const imageData = postImage ? await toBase64(postImage) : "";

    const post = {
      id: draftPosts.length ? draftPosts[draftPosts.length - 1] + 1 : 1,
      title,
      category: category ? category : "uncategorized",
      body,
      image: imageData,
      author: user.full_name,
      authorImage: user.avatar,
      authorUsername: user.username,
    };

    setDraftLoading(true);
    try {
      setDraftPosts(post);
      alert("success", "Post added to drafts successfully", true);
      setTitle("");
      setCategory("");
      setBody("");
      setPostImage(null);
      setPreviewImg(null);
      setShowPreviewImg(false);
    } catch (err) {
      alert("err", err, true);
    } finally {
      setDraftLoading(false);
    }
  };

  // const log = async () => {
  //   const username = await user.username;
  //   console.log(user.username);
  // };

  // log();

  // const toBase64 = (file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const log = async () => {
  //   const str = await toBase64(postImage);
  //   console.log(str);
  // };
  // log();

  return (
    <main className="newPostMain">
      <header className="newPostHeader">
        <h3>New Post</h3>
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
                    if (!e.target.files[0]) return;
                    setPostImage(e.target.files[0]);
                    setMenuVisible(false);
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
          <button onClick={handleDraft} className="draftBtn">
            {" "}
            {draftLoading ? "Adding to drafts..." : "Draft"}{" "}
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
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default NewPostPage;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
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
