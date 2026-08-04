import "./Search.css";
import SearchIcon from "../../../icons/SearchIcon";
import Close from "../../../icons/Close";
import { useRef, useEffect, useState } from "react";
import supabase from "../../../lib/supabase";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = ({ openSearch, setOpenSearch }) => {
  const searchRef = useRef();
  const [shouldFocus, setShouldFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults,
  );
  const setSearchQuery = useStoreActions((actions) => actions.setSearchQuery);

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldFocus && searchRef.current) {
      searchRef.current.focus();
      setShouldFocus(false);
    }
  }, [openSearch, shouldFocus]);

  useEffect(() => {
    if (!openSearch) {
      return;
    }
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.from("blogs")
          .select(`*,profiles (username, email, full_name, avatar),
        likes (id),
        comments (id)`);
        if (error) {
          throw error;
        }

        setBlogs(data);
        console.log(data);
      } catch (err) {
        console.log("Error fetching blogs in search:", err);
      }
    };

    fetchPosts();
  }, [openSearch]);

  // useEffect(() => {
  //   const trimmedQuery = query.trim().toLowerCase();

  //   if (!trimmedQuery) {
  //     setSearchResults([]);
  //     return;
  //   }

  //   const results = (blogs || []).filter((blog) =>
  //     blog?.title?.toLowerCase().includes(trimmedQuery),
  //   );

  //   setSearchResults(results);
  // }, [query, blogs, setSearchResults]);

  const searchBlog = (query) => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      setSearchResults([]);
      setSearchQuery("");
      return;
    }

    const results = (blogs || []).filter((blog) =>
      blog?.title?.toLowerCase().includes(trimmedQuery),
    );

    setSearchQuery(query);
    setSearchResults(results);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={openSearch ? "searchForm" : "searchFormClosed"}
    >
      {openSearch ?
        <>
          <InputContainer>
            <input
              ref={searchRef}
              type="text"
              name="search"
              id="search"
              placeholder="search posts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <SearchButton
              onClick={() => {
                searchBlog(query);
                navigate("/app/search-result");
              }}
            >
              {" "}
              Search{" "}
            </SearchButton>
          </InputContainer>

          <span
            onClick={() => {
              setQuery("");
              setSearchResults([]);
              setSearchQuery("");
              setOpenSearch(false);
              navigate("/app/feed");
            }}
            className="closeIconSpan"
          >
            <Close width={"25px"} height={"25px"} color="rgb(193, 193, 193)" />
          </span>
        </>
      : <span
          onClick={() => {
            setQuery("");
            setSearchResults([]);
            setOpenSearch(true);
            setShouldFocus(true);
            navigate(`/app/search-result`);
          }}
          className="searchIconSpan"
        >
          {" "}
          <SearchIcon
            height={"40px"}
            width={"40px"}
            color="rgb(193, 193, 193)"
          />{" "}
        </span>
      }
    </form>
  );
};

export default Search;

const InputContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgb(221, 218, 218);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
`;

const SearchButton = styled.button`
  width: 10%;
  padding: 5px;
  font-size: 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  display: grid;
  place-content: center;
  cursor: pointer;

  &:active {
    scale: 0.9;
  }

  @media (max-width: 768px) {
    width: fit-content;
  }
`;
