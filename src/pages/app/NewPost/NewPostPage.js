import "./NewPostPage.css";
import ImageIcon from "../../../icons/ImageIcon";
import Eye from "../../../icons/Eye";

const NewPostPage = () => {
  return (
    <main className="newPostMain">
      <header className="newPostHeader">
        <h3>New Post</h3>
      </header>

      <div className="titleNCategoryContainer">
        <div className="labelInputContainer">
          <label htmlFor="title">POST TITLE</label>
          <input placeholder="Enter title" id="title" type="text" />
        </div>
        <div className="line"></div>
        <div className="labelInputContainer">
          <label htmlFor="category">POST CATEGORY</label>
          <input
            placeholder="Enter category"
            id="category"
            type="text"
            maxLength={"16"}
          />
        </div>
      </div>

      <div className="contentContainer">
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          placeholder="Enter content"
        ></textarea>
      </div>

      <div className="addImageContainer">
        <label id="imageLabel" htmlFor="image">
          <ImageIcon height={"40px"} width={"40px"} color="gray" />
          Attach an image
        </label>
        <input id="image" type="file" accept="image" />
      </div>

      <div className="buttonsContainer">
        <button className="draftBtn">Draft</button>
        <button className="publishBtn">
          {" "}
          <Eye height={"25px"} width={"25px"} color="white" /> Publish
        </button>
      </div>
    </main>
  );
};

export default NewPostPage;
