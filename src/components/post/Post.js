import "./Post.css";
import Comment from "../../icons/Comment";
import Heart from "../../icons/Heart";
import GlobalBookmark from "../../icons/global-bookmark";

const Post = ({ variant = "full", post }) => {
  if (!post) {
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          width: "80%",
          marginBlock: "1rem",
          marginInline: "auto",
        }}
      >
        Loading... <br /> If posts don't load shortly try refreshing the page.
      </p>
    );
  } else {
    return (
      <>
        <div className={`postContainer ${variant}--postContainer`}>
          <figure className="imageFigure">
            <img
              className="post-image"
              height={"100px"}
              width={"100px"}
              src={post.image}
              alt=""
            />
          </figure>

          <div className="textContainer">
            <div className="detailsContainer">
              <p className="category--date">
                <span className="category">{post.category}</span> &bull;{" "}
                <span className="date">{post.date}</span>
              </p>
            </div>

            <p className="title">{post.title}</p>

            <p className="bodyAbbreviation">{post.body.slice(0, 60) + "..."}</p>
          </div>

          <div className="bottomContainer">
            <div className="userContainer">
              <figure className="profileImgFigure">
                <img src={post.authorImage} alt="" />
              </figure>

              <div className="nameNUsernameContainer">
                <p className="name">{post.author}</p>
                <p className="username">{post.authorUsername}</p>
              </div>
            </div>

            <div className="intractionContainer">
              <span className="likes">
                <Heart
                  width={variant === "full" ? "25px" : "10"}
                  height={variant === "full" ? "25px" : "10"}
                  color={"black"}
                />
                {post.likes}
              </span>

              <span className="comments">
                <Comment
                  width={variant === "full" ? "25px" : "10"}
                  height={variant === "full" ? "25px" : "10"}
                  color={"black"}
                />
                {post.comments}
              </span>

              <span className="bookmark">
                <GlobalBookmark
                  width={variant === "full" ? "25px" : "10"}
                  height={variant === "full" ? "25px" : "10"}
                  color={"black"}
                />
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Post;
