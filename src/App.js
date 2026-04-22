import "./App.css";
import LandingPage from "../src/pages/landing page/LandingPage";
import AuthPage from "./pages/Auth/AuthPage";
import AppLayout from "./pages/layout/app-layout";
import Feed from "./pages/app/feed/Feed";
import PostPage from "./pages/app/PostPage/PostPage";
import ProfilePage from "./pages/app/ProfilePage/ProfilePage";
import SettingsPage from "./pages/app/Settings/SettingsPage";
import NewPostPage from "./pages/app/NewPost/NewPostPage";
import Missing from "./pages/missing/Missing";
import { Routes, Route } from "react-router-dom";
import NotificationsPage from "./pages/app/notifications-page/notifications-page";
import BookmarksPage from "./pages/app/bookmarksPage/bookmarks-page";
import DraftsPage from "./pages/app/draftsPage/drafts-page";
import StatsPage from "./pages/app/statsPage/stats-page";
import CategoryPage from "./pages/app/category-page/category-page";
import TrendingPage from "./pages/app/trending-page/trending-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Feed />} />
        <Route path="feed" element={<Feed />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="new-post" element={<NewPostPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="drafts" element={<DraftsPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="trending" element={<TrendingPage />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
