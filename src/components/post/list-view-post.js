import "./list-view-post.css";
import Comment from "../../icons/Comment";
import Heart from "../../icons/Heart";
import GlobalBookmark from "../../icons/global-bookmark";
import FilledBookmark from "../../icons/filled-global-bookmark";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import getAvatarUrl from "../../utils/getAvatarUrl";
import profilePlaceholder from "../../images/profile-placeholder.png";

const ListViewPost = ({ variant = "full", post }) => {
  const [imgExists, setImgExists] = useState(false);

  useEffect(() => {
    if (post.image) {
      setImgExists(true);
    } else {
      setImgExists(false);
    }
  }, [post]);

  const bookmarked = useStoreState((state) => state.bookmarks.bookmarked);

  const isBookmarked = bookmarked.some((item) => item.id === post.id);

  const likesCount =
    Array.isArray(post?.likes) ? post.likes.length
    : typeof post?.likes === "number" ? post.likes
    : 0;
  const commentsCount =
    Array.isArray(post?.comments) ? post.comments.length
    : typeof post?.comments === "number" ? post.comments
    : 0;

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
      <div className={`LSpostContainer LS${variant}--postContainer`}>
        <section
          className={imgExists ? "LSupper-layer" : "LSupper-layer-no-img"}
        >
          {post.image && (
            <figure className="LSimageFigure">
              <img
                className="post-image"
                height={"100px"}
                width={"100px"}
                src={post.image}
                alt=""
                loading="lazy"
              />
            </figure>
          )}

          <section className="LStext-section">
            <div className="LStextContainer">
              <p className="LStitle">{post.title}</p>

              <p className="LSbodyAbbreviation">
                {post.body.slice(0, 60) + "..."}
              </p>
            </div>
          </section>
        </section>

        <div className="LSbottomContainer">
          <div className="LSuserContainer">
            <figure className="LSprofileImgFigure">
              <img
                src={
                  post?.profiles?.avatar ?
                    getAvatarUrl(post.profiles.avatar)
                  : profilePlaceholder
                }
                alt=""
              />
            </figure>

            <div className="LSnameNUsernameContainer">
              <p className="LSname">{post.author}</p>
              <p className="LSusername">{post.authorUsername}</p>
            </div>
          </div>

          <div className="LSintractionContainer">
            <span className="LSlikes">
              <Heart
                width={variant === "full" ? "25px" : "10"}
                height={variant === "full" ? "25px" : "10"}
                color={"black"}
              />
              {likesCount}
            </span>

            <span className="LScomments">
              <Comment
                width={variant === "full" ? "25px" : "10"}
                height={variant === "full" ? "25px" : "10"}
                color={"black"}
              />
              {commentsCount}
            </span>

            <span className="LSbookmark">
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
};

export default ListViewPost;
