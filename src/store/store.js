import { createStore, action, persist } from "easy-peasy";
import appLogo from "../images/appLogo.png";

export default createStore({
  overlayOn: false,
  setOverlayOn: action((state, payload) => {
    state.overlayOn = payload;
  }),
  sidebarIsOpen: false,
  setSidebarIsOpen: action((state, payload) => {
    state.sidebarIsOpen = payload;
  }),
  feedbackFormOpen: false,
  setFeedbackFormOpen: action((state, payload) => {
    state.feedbackFormOpen = payload;
  }),
  theme: persist({
    darkMode: false,
    setDarkMode: action((state, payload) => {
      state.darkMode = payload;
    }),
  }),
  bookmarks: persist({
    bookmarked: [],

    toggleBookmark: action((state, payload) => {
      const exists = state.bookmarked?.find((item) => item.id === payload.id);

      if (exists) {
        state.bookmarked = state.bookmarked.filter(
          (item) => item.id !== payload.id,
        );
      } else {
        state.bookmarked.push(payload);
      }
    }),
  }),
  posts: [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg",
      category: "Lifestyle",
      date: "jan 25, 2026",
      title: "The Truth About Digital Nomadism in 2024",
      body: "It's not all beaches and laptops. We dive deep into the challenges of maintaining a career while traveling the globe.",
      author: "Elena Rodriguez",
      authorImage: appLogo,
      authorUsername: "E_rodri",
      likes: 1240,
      comments: 88,
    },

    {
      id: 2,
      image: "https://images.pexels.com/photos/205316/pexels-photo-205316.png",
      category: "Tech",
      date: "jan 25, 2026",
      title: "Will AI Replace the Human Touch in Creative Writing?",
      body: "Exploring the delicate balance between algorithmic efficiency and the messy, beautiful reality of human emotion.",
      author: "James Wilson",
      authorImage: appLogo,
      authorUsername: "james_23",
      likes: 3500,
      comments: 245,
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/5439453/pexels-photo-5439453.jpeg",
      category: "Business",
      date: "jan 25, 2026",
      title: "Bootstrapping to $1M: My Three Year Journey",
      body: "Raw data, failed experiments, and the one strategy that actually worked when everything else was falling apart.",
      author: "Marcus Thorne",
      authorImage: appLogo,
      authorUsername: "MT_writes",
      likes: 4200,
      comments: 312,
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/5439453/pexels-photo-5439453.jpeg",
      category: "Business",
      date: "jan 25, 2026",
      title: "Bootstrapping to $1M: My Three Year Journey",
      body: "Raw data, failed experiments, and the one strategy that actually worked when everything else was falling apart.",
      author: "Marcus Thorne",
      authorImage: appLogo,
      authorUsername: "MT_writes",
      likes: 4200,
      comments: 312,
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/5439453/pexels-photo-5439453.jpeg",
      category: "Business",
      date: "jan 25, 2026",
      title: "Bootstrapping to $1M: My Three Year Journey",
      body: "Raw data, failed experiments, and the one strategy that actually worked when everything else was falling apart.",
      author: "Marcus Thorne",
      authorImage: appLogo,
      authorUsername: "MT_writes",
      likes: 4200,
      comments: 312,
    },
    {
      id: 6,
      category: "Business",
      date: "jan 25, 2026",
      title: "Bootstrapping to $1M: My Three Year Journey",
      body: "Raw data, failed experiments, and the one strategy that actually worked when everything else was falling apart.",
      author: "Marcus Thorne",
      authorImage: appLogo,
      authorUsername: "MT_writes",
      likes: 4200,
      comments: 312,
    },
  ],
});
