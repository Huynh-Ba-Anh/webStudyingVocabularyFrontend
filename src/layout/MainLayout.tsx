import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header luôn ở trên */}
      <Navbar />
      {/* Nội dung thay đổi theo từng page */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer luôn ở dưới */}
      <Footer />
    </div>
  );
}
