import "./Search.css";
import SearchIcon from "../../../icons/SearchIcon";
import Close from "../../../icons/Close";
import { useRef, useEffect, useState } from "react";

const Search = ({ setSearchFocus, openSearch, setOpenSearch }) => {
  const searchRef = useRef();
  const [shouldFocus, setShouldFocus] = useState(false);

  useEffect(() => {
    if (shouldFocus && searchRef.current) {
      searchRef.current.focus();
      setShouldFocus(false);
    }
  }, [openSearch, shouldFocus]);

  return (
    <form className={openSearch ? "searchForm" : "searchFormClosed"}>
      {openSearch ?
        <>
          <input
            ref={searchRef}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            type="search"
            name="search"
            id="search"
            placeholder="search posts..."
          />

          <span
            onClick={() => {
              setOpenSearch(false);
            }}
            className="closeIconSpan"
          >
            <Close width={"25px"} height={"25px"} color="rgb(193, 193, 193)" />
          </span>
        </>
      : <span
          onClick={() => {
            setOpenSearch(true);
            setShouldFocus(true);
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
