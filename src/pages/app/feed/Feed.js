import styled from "styled-components";
import Post from "../../../components/post/Post";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";

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
  const posts = useStoreState((state) => state.posts);
  return (
    <StyledMain>
      <h2 className="latestUpdates">Latest Updates</h2>
      <PostsContainer>
        {posts.map((post) => (
          <Link to={`/app/post/${post.id}`} key={post.id}>
            <Post post={post} key={post.id} />
          </Link>
        ))}
      </PostsContainer>
    </StyledMain>
  );
};

export default Feed;
