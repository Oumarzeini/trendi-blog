import "./list-view-post.css";
import Comment from "../../icons/Comment";
import Heart from "../../icons/Heart";
import GlobalBookmark from "../../icons/global-bookmark";
import FilledBookmark from "../../icons/filled-global-bookmark";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";

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
            <section className="LSimg-section">
              <figure className="LSimageFigure">
                <img
                  className="LSpost-image"
                  height={"100px"}
                  width={"100px"}
                  src={post.image}
                  alt=""
                  loading="lazy"
                />
              </figure>
            </section>
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
              <img src={post.authorImage} alt="" />
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
              {post.likes}
            </span>

            <span className="LScomments">
              <Comment
                width={variant === "full" ? "25px" : "10"}
                height={variant === "full" ? "25px" : "10"}
                color={"black"}
              />
              {post.comments}
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
