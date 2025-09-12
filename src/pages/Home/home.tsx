import { Button } from "antd";
import { useDecodedToken } from "../../component/DecodedToken";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const links = [
  { name: "Trang chủ", path: "" },
  { name: "Bảng điều khiển", path: "dashboard" },
  { name: "Từ vựng", path: "vocabulary" },
  { name: "Cài đặt", path: "settings" },
];

export default function HomePage() {
  const decoded = useDecodedToken();
  const navigate = useNavigate();
  const [, setIsToken] = useState(decoded);

  return (
    <div className="flex h-screen">
      {/* Sidebar bên trái */}
      <div className="w-64 bg-gray-100 shadow-md p-4 flex flex-col space-y-6">
        {/* Lời chào */}
        <span className="text-blue-600 font-semibold">
          {decoded?.role === "admin"
            ? "Xin chào Admin"
            : `Xin chào: ${decoded?.username}`}
        </span>

        {/* Menu */}
        <nav className="flex flex-col space-y-2">
          {links.map((item, index) => (
            <button
              key={index}
              className="text-left px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Nút đăng xuất ở cuối sidebar */}
        {decoded && (
          <Button
            type="primary"
            className="!bg-red-500 hover:!bg-red-600 !text-white !rounded-lg mt-auto"
            onClick={() => {
              localStorage.removeItem("token");
              setIsToken(null);
              navigate("/");
            }}
          >
            Đăng xuất
          </Button>
        )}
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
