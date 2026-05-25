import { useStoreState } from "easy-peasy";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";
import { Link } from "react-router-dom";
import ListViewPost from "../../../components/post/list-view-post";
import Post from "../../../components/post/Post";

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;

  & h2 {
    color: var(--primary);
  }
`;

const PostsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  padding: 10px;

  @media (min-width: 400px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const DraftsPage = () => {
  const draftPosts = useStoreState((state) => state.drafts.draftPosts);

  const { width } = useWindowSize();

  return (
    <Main>
      <Header>
        <h2>Your Drafts</h2>
        <p>
          {" "}
          <span style={{ color: `var(--primary)`, fontWeight: "500" }}>
            {" "}
            Notice{" "}
          </span>{" "}
          : drafts are only saved in localStorage therefor not persistant nor
          synced to other devices.
        </p>
      </Header>

      <PostsContainer>
        {!draftPosts.length && (
          <p style={{ fontWeight: "600" }}>You have no drafted posts.</p>
        )}
        {draftPosts.map((post) =>
          width <= 500 ?
            <Link
              style={{ width: width < 500 && "100%" }}
              to={`/app/post/${post.id}`}
            >
              <ListViewPost variant="compact" post={post} key={post.id} />{" "}
            </Link>
          : <Link
              style={{ width: width < 500 && "100%" }}
              to={`/app/post/${post.id}`}
            >
              <Post variant="compact" post={post} key={post.id} />
            </Link>,
        )}
      </PostsContainer>
    </Main>
  );
};

export default DraftsPage;
