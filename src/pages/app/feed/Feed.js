import styled from "styled-components";
import Post from "../../../components/post/Post";
import { Link } from "react-router-dom";
import useFeed from "../../../hooks/db/useFeed";
import { useCallback, useRef } from "react";

const StyledMain = styled.main`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  gap: 15px;

  .latestUpdates {
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text);
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-block: 30px;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

const Feed = () => {
  const { loading, blogs, fetchBlogs, hasMore } = useFeed();

  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchBlogs();
          console.log("reaching the last post");
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, fetchBlogs, hasMore],
  );

  //const posts = useStoreState((state) => state.posts);

  return (
    <StyledMain>
      <h2 className="latestUpdates">Latest Updates</h2>
      <PostsContainer>
        {blogs.map((post, index) => (
          <Link to={`/app/post/${post.id}`} key={post.id}>
            <Post
              post={post}
              key={post.id}
              ref={index === blogs.length - 1 ? lastPostRef : null}
            />
          </Link>
        ))}
      </PostsContainer>
    </StyledMain>
  );
};

export default Feed;
