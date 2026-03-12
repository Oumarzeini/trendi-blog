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
        <Route path="newPost" element={<NewPostPage />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
