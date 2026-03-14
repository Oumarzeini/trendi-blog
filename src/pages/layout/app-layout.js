import "./app-layout.css";
import Search from "../../components/search/Search";
import SearchResult from "../search result/SearchResult";
import appLogo from "../../images/appLogo.png";
import { Link, Outlet } from "react-router-dom";
import User from "../../icons/User";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const AppLayout = () => {
  // const [showHeader, setShowHeader] = useState(true);
  // const [headerEffect, setHeaderEffect] = useState(false);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const [searchFocus, setSearchFocus] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY > lastScrollY && lastScrollY > 50) {
  //       setShowHeader(false);
  //       setHeaderEffect(true);
  //     } else if (currentScrollY <= 10) {
  //       setShowHeader(true);
  //       setHeaderEffect(false);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastScrollY]);

  return (
    <>
      <main className="homeMain">
        <header className="homeHeader">
          <img src={appLogo} alt="" />

          <Search
            setSearchFocus={setSearchFocus}
            openSearch={openSearch}
            setOpenSearch={setOpenSearch}
          />

          <Link to={"/app/profile"}>
            {" "}
            <User
              width={"35"}
              height={"35"}
              fillColor={"none"}
              color={"rgb(55, 136, 250)"}
            />
          </Link>
        </header>

        <Sidebar />

        <section
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            backgroundColor: "#f6f6fb",
          }}
        >
          {searchFocus ?
            <SearchResult />
          : <Outlet />}
        </section>
      </main>
    </>
  );
};

export default AppLayout;
