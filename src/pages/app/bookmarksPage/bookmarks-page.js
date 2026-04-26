import styled from "styled-components";
import SearchIcon from "../../../icons/SearchIcon";
import Filter from "../../../icons/filter";
import { useState } from "react";
import Post from "../../../components/post/Post";
import ListViewPost from "../../../components/post/list-view-post";
import useWindowSize from "../../../hooks/useWindowSize";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

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

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 3px var(--border);
  overflow: hidden;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;

    & .input-container {
      width: 100%;
      height: 40px;
      justify-content: flex-start !important;
    }

    & .filter-container {
      width: 100%;
      justify-content: space-between !important;
    }
  }

  & .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    padding: 5px;
    background-color: var(--bg);
    border: 1px solid var(--border);

    & input {
      width: 200px;
      background-color: var(--bg);
      color: var(--text);
      border: none;
    }

    & input:focus {
      outline: none;
    }
  }

  & .filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    & p {
      font-size: 0.9rem;
      color: var(--text);
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      & .svg {
        transform: translateY(2px);
      }
    }

    & .filter-options {
      width: 150px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 5px;
      padding: 5px;
      padding-inline: 10px;
      border: 1px solid var(--primary);
      border-radius: 5px;

      & button {
        width: 50%;
        padding: 5px;
        background-color: var(--bg);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: var(--text);
      }

      & button.selected {
        background-color: var(--primary);
        color: white;
      }
    }

    // @media (max-width: 500px) {
    // //   & .input-container {
    // //     width: 100px;
    // //     gap: 5px;
    // //     & input {
    // //       font-size: 0.7rem;
    // //     }
    // //   }

    // //   & .filter-container {
    // //     gap: 5px;
    // //   }
    // // }
  }
`;

const PostsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
`;

const BookmarksPage = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  const { width } = useWindowSize();

  const bookmarked = useStoreState((state) => state.bookmarks.bookmarked);

  const searchResults = bookmarked.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Main>
      <Header>
        <h2>Your Bookmarks</h2>
        <p>Browse and manage your curated collection of inspiring stories</p>
      </Header>

      <ActionsBar>
        <div className="input-container">
          <SearchIcon height={"15px"} width={"15px"} color={`var(--border)`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search within bookmarks..."
          />
        </div>

        <div className="filter-container">
          <p>
            <span className="svg">
              <Filter height={"15px"} width={"15px"} color={`var(--text)`} />
            </span>
            SORT BY
          </p>
          <div className="filter-options">
            <button
              onClick={() => {
                setSortBy("newest");
              }}
              className={sortBy === "newest" ? "selected" : ""}
            >
              Newest
            </button>
            <button
              onClick={() => {
                setSortBy("oldest");
              }}
              className={sortBy === "oldest" ? "selected" : ""}
            >
              Oldest
            </button>
          </div>
        </div>
      </ActionsBar>

      <PostsContainer>
        {!bookmarked.length && (
          <p
            style={{
              marginLeft: "3rem",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Bookmark you favourite posts to find them here!
          </p>
        )}
        {searchResults.map((post) =>
          width <= 500 ?
            <Link to={`/app/post/${post.id}`}>
              <ListViewPost variant="compact" post={post} key={post.id} />{" "}
            </Link>
          : <Link to={`/app/post/${post.id}`}>
              <Post variant="compact" post={post} key={post.id} />
            </Link>,
        )}
      </PostsContainer>
    </Main>
  );
};

export default BookmarksPage;
