// files
import "./PostPage.css";
//icons
import Comment from "../../../icons/Comment";
import Heart from "../../../icons/Heart";
import Share from "../../../icons/Share";
import GlobalBookmark from "../../../icons/global-bookmark";
import FilledBookmark from "../../../icons/filled-global-bookmark";
import profilePlaceholder from "../../../images/profile-placeholder.png";
//  OTHER
import { useEffect, useState, useCallback } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useParams, Link } from "react-router-dom";
import supabase from "../../../lib/supabase";
import Loader from "../../../components/ui/loader";
import ReactTimeAgo from "react-time-ago";
import "react-time-ago/locale/en";
import getAvatarUrl from "../../../utils/getAvatarUrl";
//HOOKS
import useLikes from "../../../hooks/db/useLikes";
import useAlert from "../../../hooks/useAlert";
import getUser from "../../../utils/getUser";

const PostPage = () => {
  // const [heartColor, setHeartColor] = useState(false);
  const [comment, setComment] = useState("");
  const [post, setPost] = useState(null);
  const [blogId, setBlogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(undefined);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [addingComment, setAddingComment] = useState(false);

  const Alert = useAlert();

  useEffect(() => {
    const getAndSetUser = async () => {
      const fetchUser = await getUser();
      setUser(fetchUser);
    };

    getAndSetUser();
  }, []);
  console.log(user);

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
          .select(`*, likes(id)`)
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
        setBlogId(data.id);
        setAuthor(author);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [slugWithId, postId]);

  const { liked, likesCount, toggleLike } = useLikes(blogId, user);

  const fetchComments = useCallback(async () => {
    if (!blogId) return;

    try {
      setCommentsLoading(true);

      const { data, error } = await supabase
        .from("comments")
        .select(
          `*,
          profiles (
            username,
            avatar
          )
        `,
        )
        .eq("blog_id", blogId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setComments(data || []);
    } catch (err) {
      console.log("ERROR FETCHING COMMENTS :", err);
      Alert("err", err.message || err, true);
    } finally {
      setCommentsLoading(false);
    }
  }, [blogId, Alert]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  console.log(comments);

  const addComment = async (content) => {
    if (!user || !content.trim() || !blogId) return;

    const { error } = await supabase.from("comments").insert({
      blog_id: blogId,
      user_id: user.id,
      content: content.trim(),
    });

    if (error) {
      console.log("Error commenting:", error);
      Alert("err", error.message || error, true);
      return;
    }

    await fetchComments();
  };

  console.log(blogId);

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
      <div className="content-section">
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
          <Link to={`/app/profile/${author?.username}`}>
            <figure className="profileImgFigure">
              <img
                src={
                  author?.avatar ?
                    getAvatarUrl(author.avatar)
                  : profilePlaceholder
                }
                alt=""
              />
            </figure>
          </Link>

          <div className="nameNUsernameContainer">
            <Link to={`/app/profile/${author?.username}`}>
              <p className="name">{author.full_name}</p>{" "}
            </Link>
            <p className="username">{author.username}</p>
          </div>
        </div>

        <hr />

        <article className="postContent">{post.body}</article>

        <div className="commentsAndLikesContainer">
          <h2>Comments ({comments ? comments.length : 0})</h2>

          <div className="iconsContainer">
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
              role="button"
              className="post-page-likes"
              onClick={() => {
                toggleLike();
              }}
            >
              <Heart
                width={"25px"}
                height={"25px"}
                color={liked ? "#ff4d6d" : "none"}
              />
              {likesCount}
            </span>

            <span className="post-page-comments">
              <Comment width={"25px"} height={"25px"} color={"black"} />
              {comments ? comments.length : 0}
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
          {commentsLoading && <p>Loading comments...</p>}
          {!comments || !comments.length ?
            <p>No comments yet, Be the first to comment!</p>
          : comments.map((comment) => (
              <div className="commentContainer" key={comment.id}>
                <figure className="CommentProfileImgFigure">
                  <img
                    src={
                      getAvatarUrl(comment.profiles.avatar) ||
                      profilePlaceholder
                    }
                    alt=""
                  />
                </figure>

                <div className="nameAndCommentContainer">
                  <div className="nameAndDateContainer">
                    <p className="name">{comment.profiles.username}</p>
                    <p className="date">
                      <ReactTimeAgo date={comment.created_at} local={"en"} />
                    </p>
                  </div>

                  <p className="commentContent">{comment.content}</p>

                  {/* <span
                  className="commentHeart"
                  onClick={() => setHeartColor(!heartColor)}
                >
                  <Heart width={"20px"} height={"20px"} color={"red"} />
                  233
                </span> */}
                </div>
              </div>
            ))
          }
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
            disabled={comment && !addingComment ? false : true}
            onClick={() => {
              try {
                setAddingComment(true);
                addComment(comment);
                setComment("");
              } catch (err) {
                console.log(err);
                Alert("err", err, true);
              } finally {
                setAddingComment(false);
              }
            }}
          >
            <Share height={"25px"} width={"25px"} color={"white"} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostPage;
