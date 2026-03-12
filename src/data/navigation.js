import HomeIcon from "../icons/NavIcons/HomeIcon";
import Feed from "../icons/NavIcons/Feed";
import ExploreIcon from "../icons/NavIcons/ExploreIcon";
import Notification from "../icons/NavIcons/Notification";
import Bookmark from "../icons/NavIcons/Bookmark";
import Categories from "../icons/NavIcons/Categories";
import Hashtag from "../icons/NavIcons/Hashtag";
import People from "../icons/NavIcons/People";
import Following from "../icons/NavIcons/Following";
import Draft from "../icons/NavIcons/Draft";
import Stats from "../icons/NavIcons/Stats";
import ProfileIcon from "../icons/NavIcons/ProfileIcon";
import Settings from "../icons/NavIcons/Settings";
import Moon from "../icons/NavIcons/Moon";
import Logout from "../icons/NavIcons/Logout";

const navItems = [
  {
    title: "MAIN",
    items: [
      {
        icon: Feed,
        label: "Feed",
        path: "feed",
      },
      {
        icon: ExploreIcon,
        label: "Explore",
        path: "newPost",
      },
      {
        icon: Notification,
        label: "Notifications",
        path: "notifications",
      },
      {
        icon: Bookmark,
        label: "Bookmarks",
        path: "bookmarks",
      },
    ],
  },
  {
    title: "DISCOVER",
    items: [
      {
        icon: Categories,
        label: "Category",
        path: "categroy",
      },
      {
        icon: Hashtag,
        label: "Trending Tags",
        path: "trending",
      },
      {
        icon: People,
        label: "Top Authors",
        path: "top-authors",
      },
    ],
  },
  {
    title: "PERSONAL",
    items: [
      {
        icon: Following,
        label: "Following",
        path: "following",
      },
      {
        icon: Draft,
        label: "Drafts",
        path: "drafts",
      },
      {
        icon: Stats,
        label: "My Stats",
        path: "stats",
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        icon: ProfileIcon,
        label: "Profile",
        path: "profile",
      },
      {
        icon: Settings,
        label: "Settings",
        path: "settings",
      },
      {
        icon: Moon,
        label: "Dark Mode",
        path: "",
      },
      {
        icon: Logout,
        label: "Logout",
        path: "",
      },
    ],
  },
];

export default navItems;
