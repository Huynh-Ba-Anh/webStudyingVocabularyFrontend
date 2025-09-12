import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/home";
import ProtectedRoute from "./component/ProtectedRoute";
import SettingsPage from "./pages/settingsPage";
import Dashboard from "./pages/dashboard";
import VocabularyPage from "./pages/vocabularyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cha có layout chung */}
        <Route path="/" element={<MainLayout />}/>
          {/* Route cần bảo vệ */}
          <Route path=":username" element={<ProtectedRoute />}>
            {/* HomePage là cha, bao bọc About */}
            <Route element={<HomePage />}>
              <Route index element={<div>Trang chủ người dùng</div>} />
              <Route path="settings" element={<SettingsPage/>} />
              <Route path="vocabulary" element={<VocabularyPage/>} />
              <Route path="dashboard" element={<Dashboard/>} />
            </Route>
          </Route>

        {/* 404 page */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
