import { Menu, Button, Dropdown, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../component/RegisterForm";
import FormLogin from "../component/Formlogin";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    setIsOpen(false);
  };

  const userMenu = {
    items: [
      { key: "profile", label: "Hồ sơ", onClick: () => navigate("/profile") },
      {
        key: "logout",
        label: "Đăng xuất",
        onClick: () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setToken(null);
          window.dispatchEvent(new Event("storage"));
          navigate("/");
        },
      },
    ],
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md px-8 py-3 sticky top-0 z-50">
      {/* Logo */}
      <div
        className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text cursor-pointer"
        onClick={() => navigate("/")}
      >
        VocabStudy
      </div>

      {!token ? (
        <div className="flex gap-3">
          <Button
            className="rounded-lg"
            onClick={() => {
              setIsOpen(true);
              setIsOpenRegister(false);
            }}
          >
            Đăng nhập
          </Button>

          <Button
            type="primary"
            className="rounded-lg"
            onClick={() => {
              setIsOpenRegister(true);
              setIsOpen(false);
            }}
          >
            Đăng ký
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Menu
            mode="horizontal"
            selectable={false}
            items={[
              {
                key: "study",
                label: "Học từ vựng",
                onClick: () => navigate("/vocabulary"),
              },
              {
                key: "practice",
                label: "Luyện tập",
                onClick: () => navigate("/progress"),
              },
              {
                key: "stats",
                label: "Thống kê",
                onClick: () => navigate("/progress"),
              },
            ]}
          />
          <Dropdown menu={userMenu} placement="bottomRight" arrow>
            <Button
              icon={<UserOutlined />}
              className="rounded-full shadow-sm hover:shadow-md"
            />
          </Dropdown>
        </div>
      )}

      {/* Modal Login */}
      <Modal
        open={isOpen}
        footer={null}
        centered
        onCancel={() => setIsOpen(false)}
        destroyOnHidden
        title="Đăng nhập"
      >
        <FormLogin onLoginSuccess={handleLoginSuccess} />
      </Modal>

      {/* Modal Register */}
      <Modal
        open={isOpenRegister}
        footer={null}
        centered
        onCancel={() => setIsOpenRegister(false)}
        destroyOnHidden
        title="Đăng ký"
      >
        <RegisterForm />
      </Modal>
    </header>
  );
}
