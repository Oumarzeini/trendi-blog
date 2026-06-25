import "./Post.css";
import Comment from "../../icons/Comment";
import Heart from "../../icons/Heart";
import GlobalBookmark from "../../icons/global-bookmark";
import FilledBookmark from "../../icons/filled-global-bookmark";
import { useStoreState } from "easy-peasy";
import getAvatarUrl from "../../utils/getAvatarUrl";
import profilePlaceholder from "../../images/profile-placeholder.png";
import React from "react";
import "react-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

const Post = React.forwardRef(({ variant = "full", post }, ref) => {
  const bookmarked = useStoreState((state) => state.bookmarks.bookmarked);

  const isBookmarked = bookmarked.some((item) => item.id === post.id);

  if (!post || post === null) {
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
    // <p>Hello world</p>
    <>
      <div ref={ref} className={`postContainer ${variant}--postContainer`}>
        {post.image_url && (
          <figure className="imageFigure">
            <img
              className="post-image"
              height={"100px"}
              width={"100px"}
              src={post.image_url}
              alt=""
              loading="lazy"
            />
          </figure>
        )}

        <div className="textContainer">
          <p className="title">{post.title}</p>

          <p className="bodyAbbreviation">{post.body.slice(0, 60) + "..."}</p>

          <div className="detailsContainer">
            <p className="category--date">
              <span className="category">{post.category}</span> &bull;{" "}
              <span className="date">
                <ReactTimeAgo date={post.created_at} locale="en" />{" "}
              </span>
            </p>
          </div>
        </div>

        <div className="bottomContainer">
          <div className="userContainer">
            <figure className="profileImgFigure">
              <img
                src={
                  // post.profiles.avatar ?
                  //   toString(post.profiles.avatar).includes("supabase") ?
                  //     getAvatarUrl(post.profiles.avatar)
                  //   : post.authorImage
                  // : profilePlaceholder
                  post?.profiles?.avatar ?
                    getAvatarUrl(post.profiles.avatar)
                  : profilePlaceholder
                }
                alt=""
              />
            </figure>

            <div className="nameNUsernameContainer">
              <p className="name">{post.profiles.full_name}</p>
              <p className="username">{post.profiles.username}</p>
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
        </div>
      </div>
    </>
  );
});

export default Post;
