// files
import "./PostPage.css";
import readingImg from "../../../images/reading illustration.jpg";
import profilePlaceholder from "../../../images/user placeholder.png";
import ronaldoImg from "../../../images/ronaldo smiling.avif";
import neymarImg from "../../../images/neymar smiling.webp";
import messiImg from "../../../images/messi smiling.webp";
//icons
import Comment from "../../../icons/Comment";
//import { Heart } from "iconsax-reactjs";
import Share from "../../../icons/Share";
import BackArrow from "../../../icons/BackArrow";
//hooks
import { useState } from "react";
// Utility imports
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
  const [heartColor, setHeartColor] = useState(false);
  const [comment, setComment] = useState("");

  const id = useParams();

  const handleInvalid = (e) => {
    e.target.setCustomValidity("I can see you didn't enter sh!t.");
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <section className="postPageSection">
      <figure className="postImgFigure">
        <img src={readingImg} alt="" />
        <Link to={"/home"}>
          <span className="backArrow">
            <BackArrow width={"25px"} height={"25px"} color={"blue"} />
          </span>
        </Link>
      </figure>

      <h3 className="title">
        The Future of Minimalist Design in Mobile Interfaces
      </h3>

      <p className="categoryContainer">
        <span className="category">Design</span>{" "}
        <span className="bullet">&bull;</span>{" "}
        <span className="date">Jan 25, 2026</span>
      </p>

      <div className="userContainer">
        <figure className="profileImgFigure">
          <img src={profilePlaceholder} alt="profile image" />
        </figure>

        <div className="nameNUsernameContainer">
          <p className="name">Omar Zeini</p>
          <p className="username">@omar_77</p>
        </div>
      </div>

      {/* <hr /> */}

      <article className="postContent">
        In the rapidly evolving world of digital interfaces, **minimalism** has
        transitioned from a mere aesthetic choice to a fundamental functional
        requirement. It's no longer just about whitespace; it's about cognitive
        load management. Negative space is not empty space. It is an active
        design element that guides the user's eye, creates structure, and
        emphasizes critical content without the need for heavy borders or
        dividers. As we move into 2024, we see a shift towards "Warm
        Minimalism"—a style that retains the clean lines of its predecessor but
        introduces organic shapes, warmer color palettes, and tactile textures
        to create inviting digital environments.
      </article>

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
            {/* <Heart
              size={26}
              color={heartColor ? "red" : "black"}
              variant={heartColor ? "Bold" : "Outline"}
              stroke={heartColor ? "red" : "black"}
            /> */}
            1034
          </span>

          <span className="comments">
            <Comment width={"25px"} height={"25px"} color={"black"} />
            23
          </span>
        </div>
      </div>

      <div className="commentsContainer">
        <div className="commentContainer">
          <figure className="CommentProfileImgFigure">
            <img src={ronaldoImg} alt="profile image" />
          </figure>

          <div className="nameAndCommentContainer">
            <div className="nameAndDateContainer">
              <p className="name">C Ronaldo</p>
              <p className="date">jan 27, 2026</p>
            </div>

            <p className="commentContent">
              yeah man, totally agree designers and frontenders need to pay
              attention for these details too often, yet the great majority
              don't.
            </p>

            <span
              className="commentHeart"
              onClick={() => setHeartColor(!heartColor)}
            >
              {/* <Heart
                size={15}
                color={heartColor ? "red" : "black"}
                variant={heartColor ? "Bold" : "Outline"}
                stroke={heartColor ? "red" : "black"}
              /> */}
              233
            </span>
          </div>
        </div>
        <div className="commentContainer">
          <figure className="CommentProfileImgFigure">
            <img src={neymarImg} alt="profile image" />
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
              {/* <Heart
                size={15}
                color={heartColor ? "red" : "black"}
                variant={heartColor ? "Bold" : "Outline"}
                stroke={heartColor ? "red" : "black"}
              /> */}
              15
            </span>
          </div>
        </div>
        <div className="commentContainer">
          <figure className="CommentProfileImgFigure">
            <img src={messiImg} alt="profile image" />
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
              {/* <Heart
                size={15}
                color={heartColor ? "red" : "black"}
                variant={heartColor ? "Bold" : "Outline"}
                stroke={heartColor ? "red" : "black"}
              /> */}
              1000
            </span>
          </div>
        </div>
      </div>

      <div className="commentFormContainer">
        <form className="commentForm" onSubmit={(e) => e.preventDefault()}>
          <textarea
            onInvalid={handleInvalid}
            onInput={handleInput}
            required
            name="comment"
            id="comment"
            placeholder="add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
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
