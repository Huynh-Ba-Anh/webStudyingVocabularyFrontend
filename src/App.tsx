import { useEffect, useState } from "react";
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingsPage from "./pages/settingsPage";
import VocabularyPage from "./pages/vocabularyPage";
import Progress from "./pages/progress";

function App() {
  const [accessToken, setToken] = useState(localStorage.getItem("accessToken"));

  // Lắng nghe sự thay đổi trong localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {accessToken ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<VocabularyPage />} />  
            <Route path="settings" element={<SettingsPage />} />
            <Route path="vocabulary" element={<VocabularyPage />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        ) : (
          <Route element={<MainLayout />}>
            <Route path="/" element={null} />
          </Route>
        )}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
