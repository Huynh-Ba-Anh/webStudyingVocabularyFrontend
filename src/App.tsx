import { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { Routes, Route, HashRouter } from "react-router-dom";
import SettingsPage from "./pages/settingsPage";
import VocabularyPage from "./pages/vocabularyPage";
import Progress from "./pages/progress";
import Profile from "./pages/profile";
import TopicVocabPage from "./component/TopicVocabPage";

function App() {
  const [accessToken, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <HashRouter>
      <Routes>
        {accessToken ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<VocabularyPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="vocabulary" element={<VocabularyPage />} />
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<Profile />} />
            <Route path="topic/:topicId" element={<TopicVocabPage />} />
          </Route>
        ) : (
          <Route element={<MainLayout />}>
            <Route path="/" element={null} />
          </Route>
        )}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
