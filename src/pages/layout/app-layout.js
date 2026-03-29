import "./app-layout.css";
//COMPONENTS
import Search from "../../components/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
//ASSETS
import appLogo from "../../images/appLogo.png";
import profileImg from "../../images/profileImage.jpg";
import OpenSidebar from "../../icons/open-sidebar";
import CloseSidebar from "../../icons/close-sidebar";
//import User from "../../icons/User";
//HOOKS
import useWindowSize from "../../hooks/useWindowSize";
//PAGES
import SearchResult from "../search result/SearchResult";
//FROM REACT AND EXTERNAL LIBRARIES
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const AppLayout = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  // document.body.style.backgroundColor = "#0f0a56";
  // document.body.style.color = "#7068e1";

  const overlayOn = useStoreState((state) => state.overlayOn);
  const sidebarIsOpen = useStoreState((state) => state.sidebarIsOpen);
  const setSidebarIsOpen = useStoreActions(
    (actions) => actions.setSidebarIsOpen,
  );

  const { width } = useWindowSize();
  const path = useLocation().pathname;

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
      <div
        className="overlay"
        style={{
          display: overlayOn ? "block" : "none",
        }}
      ></div>
      <main className={overlayOn ? "layout-main scroll-off" : "layout-main"}>
        <header className="layout-header">
          {width < 768 ?
            sidebarIsOpen ?
              <span
                onClick={() => setSidebarIsOpen(false)}
                style={{
                  display: "grid",
                  placeContent: "center",
                  cursor: "pointer",
                }}
              >
                {" "}
                <CloseSidebar
                  height={"40px"}
                  width={"40px"}
                  color={"rgb(55, 136, 250)"}
                />
              </span>
            : <span
                onClick={() => setSidebarIsOpen(true)}
                style={{
                  display: "grid",
                  placeContent: "center",
                  cursor: "pointer",
                }}
              >
                {" "}
                <OpenSidebar
                  height={"40px"}
                  width={"40px"}
                  color={"rgb(55, 136, 250)"}
                />{" "}
              </span>

          : ""}

          <img className="app-logo" src={appLogo} alt="" />

          {path.includes("feed") ?
            <Search
              setSearchFocus={setSearchFocus}
              openSearch={openSearch}
              setOpenSearch={setOpenSearch}
            />
          : ""}

          <Link to={"/app/profile"}>
            {" "}
            {/* <User
              width={"35"}
              height={"35"}
              fillColor={"none"}
              color={"rgb(55, 136, 250)"}
            /> */}
            <figure>
              <img src={profileImg} />
            </figure>
          </Link>
        </header>

        <Sidebar />

        {searchFocus ?
          <SearchResult />
        : <Outlet />}
        {/* </section> */}
      </main>
    </>
  );
};

export default AppLayout;
