import "./Post.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ActionsContainer = styled.div`
  width: 100%;
  background-image: linear-gradient(black, transparent);
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  padding: 10px;
  z-index: 100;

  & button {
    padding: 5px;
    padding-inline: 15px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  & button.deleteBtn {
    background-color: #920a0a;
  }
`;

const Post = ({ variant = "full", post }) => {
  // const bookmarked = useStoreState((state) => state.bookmarks.bookmarked);
  const [isImage, setIsImage] = useState(true);

  useEffect(() => {
    if (post.image) {
      setIsImage(true);
    } else {
      setIsImage(false);
    }
  }, [post]);

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
  }

  return (
    <>
      <div
        className={`postContainer ${variant}--postContainer drafts `}
        style={{
          height: isImage ? "400px" : "fit-content",
          cursor: "auto",
          position: "relative",
        }}
      >
        <ActionsContainer>
          <button>Open</button>
          <button className="deleteBtn">delete</button>
        </ActionsContainer>
        {post.image && (
          <figure className="imageFigure drafts">
            <img
              className="post-image drafts"
              height={"100px"}
              width={"100px"}
              src={post.image}
              alt=""
              loading="lazy"
            />
          </figure>
        )}

        {/* {post.image ? setIsImage(true) : setIsImage(false)} */}

        <div className="textContainer">
          <p className="title">{post.title}</p>

          <p className="bodyAbbreviation">{post.body.slice(0, 40) + "..."}</p>

          <div className="detailsContainer">
            <p className="category--date">
              <span className="category">{post.category}</span> &bull;{" "}
              <span className="date">{post.date}</span>
            </p>
          </div>
        </div>

        {/* <div className="bottomContainer " id="bottomContainerDrafts">
          <div className="userContainer">
            <figure className="profileImgFigure">
              <img
                src={getAvatarUrl(post.authorImage) || profilePlaceholder}
                alt=""
              />
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
              {isBookmarked ?
                <FilledBookmark
                  width={variant === "full" ? "25px" : "10"}
                  height={variant === "full" ? "25px" : "10"}
                  color={`var(--primary)`}
                />
              : <GlobalBookmark
                  width={variant === "full" ? "25px" : "10"}
                  height={variant === "full" ? "25px" : "10"}
                  color={`var(--primary)`}
                />
              }
            </span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Post;
