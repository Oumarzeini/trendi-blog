import styled from "styled-components";

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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const DraftsPage = () => {
  return (
    <Main>
      <Header>
        <h2>Your Drafts</h2>
        <p>Find your unpublished posts over the last 30 days.</p>
      </Header>

      <PostsContainer>
        <p style={{ fontWeight: "600" }}>You have no drafted posts.</p>
      </PostsContainer>
    </Main>
  );
};

export default DraftsPage;
