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
import profilePlaceholder from "../../../images/profile-placeholder.png";
//  OTHER
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams, Link } from "react-router-dom";
import supabase from "../../../lib/supabase";
import Loader from "../../../components/ui/loader";
import ReactTimeAgo from "react-time-ago";
import "react-time-ago/locale/en";
import getAvatarUrl from "../../../utils/getAvatarUrl";

const PostPage = () => {
  const [heartColor, setHeartColor] = useState(false);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(undefined);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookmarked = useStoreState((state) => state.bookmarks.bookmarked);
  const toggleBookmark = useStoreActions(
    (actions) => actions.bookmarks.toggleBookmark,
  );

  //const posts = useStoreState((state) => state.posts);

  //const id = Number(useParams().id);

  const { id: slugWithId } = useParams();

  const slugParts = slugWithId.split("-");
  const postId = slugParts[slugParts.length - 1];

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blogs")
          .select(`*`)
          .eq("id", postId)
          .single();

        const { data: author, authorErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user_id)
          .single();

        if (error || authorErr) {
          console.log(
            "error getting post or author:",
            error.message || authorErr,
          );
          return;
        }
        setPost(data);
        setAuthor(author);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [slugWithId, postId]);

  console.log(post);
  console.log(author);

  const isBookmarked = bookmarked.some((item) => item.id === post.id);

  const handleInvalid = (e) => {
    e.target.setCustomValidity("I can see you didn't enter sh!t.");
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  if (loading) return <Loader />;
  if (!post || !author)
    return (
      <p>
        Ops post not found !{" "}
        <Link style={{ color: `var(--primary)` }} to="/app/feed">
          {" "}
          Go back{" "}
        </Link>
      </p>
    );

  return (
    <section className="postPageSection">
      {post.image_url && (
        <figure className="postImgFigure">
          <img src={post.image_url} alt="" />
        </figure>
      )}

      <h3 className="title">{post.title}</h3>

      <div className="categoryContainer">
        <span className="category">{post.category}</span>{" "}
        <span className="bullet">&bull;</span>{" "}
        <span className="date">
          {" "}
          <ReactTimeAgo date={post.created_at} locale="en" />{" "}
        </span>
      </div>

      <div className="userContainer">
        <figure className="profileImgFigure">
          <img
            src={
              author?.avatar ? getAvatarUrl(author.avatar) : profilePlaceholder
            }
            alt=""
          />
        </figure>

        <div className="nameNUsernameContainer">
          <p className="name">{author.full_name}</p>
          <p className="username">{author.username}</p>
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
            <Heart width={"25px"} height={"25px"} color={`var(--text)`} />
            498
          </span>

          <span className="comments">
            <Comment width={"25px"} height={"25px"} color={"black"} />
            67
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
        {/* {!post.comments.length ? <p>No comments yet, Be the first to comment!</p>:
             post.comments.map((comment) => (
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
              <Heart width={"20px"} height={"20px"} color={"red"} />
              233
            </span>
          </div>
        </div>
             ))
             } */}

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
              <Heart width={"20px"} height={"20px"} color={"red"} />
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
              <Heart width={"20px"} height={"20px"} color={""} />
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
              <Heart width={"20px"} height={"20px"} color={"transparent"} />
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
