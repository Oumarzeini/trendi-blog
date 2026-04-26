// files
import "./PostPage.css";

import ronaldoImg from "../../../images/ronaldo smiling.avif";
import neymarImg from "../../../images/neymar smiling.webp";
import messiImg from "../../../images/messi smiling.webp";
//icons
import Comment from "../../../icons/Comment";
import Heart from "../../../icons/Heart";
import Share from "../../../icons/Share";
import GlobalBookmark from "../../../icons/global-bookmark";
import FilledBookmark from "../../../icons/filled-global-bookmark";
//  OTHER
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams, Link } from "react-router-dom";

const PostPage = () => {
  const [heartColor, setHeartColor] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookmarked = useStoreState((state) => state.bookmarks.bookmarked);
  const toggleBookmark = useStoreActions(
    (actions) => actions.bookmarks.toggleBookmark,
  );

  const posts = useStoreState((state) => state.posts);

  const id = Number(useParams().id);
  //const id = 6;
  const postObj = posts.filter((post) => (post.id === id ? post : ""));

  const post = postObj[0] || [];

  const isBookmarked = bookmarked.some((item) => item.id === post.id);

  const handleInvalid = (e) => {
    e.target.setCustomValidity("I can see you didn't enter sh!t.");
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  if (!post) return <p>Loading...</p>;
  if (!post.id)
    return (
      <p>
        Ops post not found !{" "}
        <Link style={{ color: `var(--primary)` }} to="/app/feed">
          {" "}
          go back{" "}
        </Link>
      </p>
    );

  return (
    <section className="postPageSection">
      {post.image && (
        <figure className="postImgFigure">
          <img src={post.image} alt="" />
        </figure>
      )}

      <h3 className="title">{post.title}</h3>

      <div className="categoryContainer">
        <span className="category">{post.category}</span>{" "}
        <span className="bullet">&bull;</span>{" "}
        <span className="date"> {post.date} </span>
      </div>

      <div className="userContainer">
        <figure className="profileImgFigure">
          <img src={post.authorImage} alt="" />
        </figure>

        <div className="nameNUsernameContainer">
          <p className="name">{post.author}</p>
          <p className="username">{post.authorUsername}</p>
        </div>
      </div>

      <hr />

      <article className="postContent">{post.body}</article>

      <div className="commentsAndLikesContainer">
        <h2>Comments</h2>

        <div className="iconsContainer">
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "5px",
            }}
            role="button"
            className="likes"
            onClick={() => setHeartColor(!heartColor)}
          >
            <Heart width={"25px"} height={"25px"} color={"black"} />
            {post.likes}
          </span>

          <span className="comments">
            <Comment width={"25px"} height={"25px"} color={"black"} />
            {post.comments}
          </span>

          <span
            onClick={() => {
              toggleBookmark(post);
            }}
            style={{
              cursor: "pointer",
            }}
            className="comments bookmark"
          >
            {isBookmarked ?
              <FilledBookmark
                width="25px"
                height="25px"
                color={`var(--primary)`}
              />
            : <GlobalBookmark
                width="25px"
                height="25px"
                color={`var(--primary)`}
              />
            }
          </span>
          {/* <span
            style={{
              cursor: "pointer",
            }}
            className="comments bookmark"
          >
            <GlobalBookmark width={"25px"} height={"25px"} color={"black"} />
          </span> */}
        </div>
      </div>

      <div className="commentsContainer">
        <div className="commentContainer">
          <figure className="CommentProfileImgFigure">
            <img src={ronaldoImg} alt="" />
          </figure>

          <div className="nameAndCommentContainer">
            <div className="nameAndDateContainer">
              <p className="name">C Ronaldo</p>
              <p className="date">jan 27, 2026</p>
            </div>

            <p className="commentContent">
              yeah man, totally agree designers and frontenders need to pay
              attention for these details too often, yet the great majority
              don't. yeah man, totally agree designers and frontenders need to
              pay attention for these details too often, yet the great majority
              don't.
            </p>

            <span
              className="commentHeart"
              onClick={() => setHeartColor(!heartColor)}
            >
              <Heart width={"20px"} height={"20px"} color={"black"} />
              233
            </span>
          </div>
        </div>
        <div className="commentContainer">
          <figure className="CommentProfileImgFigure">
            <img src={neymarImg} alt="" />
          </figure>

          <div className="nameAndCommentContainer">
            <div className="nameAndDateContainer">
              <p className="name">Neymar Junior</p>
              <p className="date">jan 29, 2026</p>
            </div>

            <p className="commentContent">
              I think that this is a time when everyone should focus more on
              content rather than designs.
            </p>
            <span
              className="commentHeart"
              onClick={() => setHeartColor(!heartColor)}
            >
              <Heart width={"20px"} height={"20px"} color={"black"} />
              15
            </span>
          </div>
        </div>
        <div className="commentContainer">
          <figure className="CommentProfileImgFigure">
            <img src={messiImg} alt="" />
          </figure>

          <div className="nameAndCommentContainer">
            <div className="nameAndDateContainer">
              <p className="name">Lionel Messi</p>
              <p className="date">feb 2, 2026</p>
            </div>

            <p className="commentContent">couldn't agree more.</p>
            <span
              className="commentHeart"
              onClick={() => setHeartColor(!heartColor)}
            >
              <Heart width={"20px"} height={"20px"} color={"black"} />
              1000
            </span>
          </div>
        </div>
      </div>

      <div className="commentFormContainer">
        <form className="commentForm" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onInvalid={handleInvalid}
            onInput={handleInput}
            required
            name="comment"
            id="comment"
            placeholder="add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            style={{
              opacity: comment ? 1 : 0.7,
              cursor: comment ? "pointer" : "not-allowed",
            }}
            disabled={comment ? false : true}
          >
            <Share height={"25px"} width={"25px"} color={"white"} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostPage;
