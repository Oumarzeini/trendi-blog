import "./app-layout.css";
//COMPONENTS
import Search from "../../components/ui/search/Search";
import Sidebar from "../../components/sidebar/Sidebar";
import FeedbackForm from "../../components/feedback form/feedback-form";
//ASSETS
import logo from "../../images/logo.png";
import profileImg from "../../images/profileImage.jpg";
import OpenSidebar from "../../icons/open-sidebar";
import CloseSidebar from "../../icons/close-sidebar";
import Feedback from "../../icons/feedback";
//import User from "../../icons/User";
//HOOKS
import useWindowSize from "../../hooks/useWindowSize";
//PAGES
import SearchResult from "../search result/SearchResult";
//FROM REACT AND EXTERNAL LIBRARIES
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const AppLayout = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const logoRef = useRef();
  const feedbackIconRef = useRef();

  const overlayOn = useStoreState((state) => state.overlayOn);
  const sidebarIsOpen = useStoreState((state) => state.sidebarIsOpen);
  const setSidebarIsOpen = useStoreActions(
    (actions) => actions.setSidebarIsOpen,
  );
  const feedbackFormOpen = useStoreState((state) => state.feedbackFormOpen);
  const setFeedbackFormOpen = useStoreActions(
    (actions) => actions.setFeedbackFormOpen,
  );

  const { width } = useWindowSize();
  const path = useLocation().pathname;

  if (overlayOn || feedbackFormOpen) {
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = "auto";

  useEffect(() => {
    if (
      !path.includes("notifications") &&
      !path.includes("bookmarks") &&
      !path.includes("new-post") &&
      !path.includes("category") &&
      !path.includes("trending") &&
      !path.includes("drafts") &&
      !path.includes("stats") &&
      !path.includes("profile") &&
      !path.includes("settings")
    ) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [path]);

  useEffect(() => {
    if (openSearch) {
      logoRef.current.style.display = "none";
      feedbackIconRef.current.style.display = "none";
    } else {
      logoRef.current.style.display = "block";
      feedbackIconRef.current.style.display = "block";
    }
  }, [openSearch]);

  console.log(process.env.REACT_APP_SOMETHING);

  return (
    <>
      <div
        className="overlay"
        style={{
          display: overlayOn || feedbackFormOpen ? "block" : "none",
        }}
      ></div>
      <main
        className={
          overlayOn || feedbackFormOpen ?
            "layout-main scroll-off"
          : "layout-main"
        }
      >
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

          <img ref={logoRef} className="app-logo" src={logo} alt="" />

          {showSearch ?
            <Search
              setSearchFocus={setSearchFocus}
              openSearch={openSearch}
              setOpenSearch={setOpenSearch}
            />
          : ""}

          <div className="feedback-profile-container">
            <span
              ref={feedbackIconRef}
              className="feedback-span"
              onClick={() => setFeedbackFormOpen(true)}
            >
              <Feedback
                height={"35px"}
                width={"35px"}
                color={"rgb(55,136,255)"}
              />
            </span>

            <Link to={"/app/profile"}>
              {" "}
              {/* <User
              width={"35"}
              height={"35"}
              fillColor={"none"}
              color={"rgb(55, 136, 250)"}
            /> */}
              <figure>
                <img src={profileImg} alt="" />
              </figure>
            </Link>
          </div>
        </header>

        {feedbackFormOpen && <FeedbackForm />}

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
