import { Layout, Menu, Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import FormLogin from "../component/Formlogin";
import RegisterForm from "../component/RegisterForm";

const { Header } = Layout;

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const token = localStorage.getItem("token");
  const userMenu = (
    <Menu
      items={[
        { key: "profile", label: "Hồ sơ" },
        {
          key: "logout",
          label: "Đăng xuất",
          onClick: () => setIsLoggedIn(false),
        },
      ]}
    />
  );

  return (
    <Header className="flex justify-between items-center bg-white shadow px-6">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">VocabStudy</div>

      {/* Menu */}
      {!isLoggedIn ? (
        <>
          <div className={`${token ? "hidden" : "flex"} space-x-3`}>
            <Button
              onClick={() =>
                isOpen
                  ? setIsOpen(false)
                  : (setIsOpen(true), setIsOpenRegister(false))
              }
            >
              Đăng nhập
            </Button>
            <div
              className={`${
                isOpen ? "flex" : "hidden"
              } p-4 border rounded shadow-lg bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <FormLogin />
            </div>
            <Button
              type="primary"
              onClick={() =>
                isOpenRegister
                  ? setIsOpenRegister(false)
                  : (setIsOpenRegister(true), setIsOpen(false))
              }
            >
              Đăng ký
            </Button>
            <div
              className={`${
                isOpenRegister ? "flex" : "hidden"
              } p-4 border rounded shadow-lg bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <RegisterForm />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-6">
          <Menu
            mode="horizontal"
            items={[
              { key: "study", label: "Học từ vựng" },
              { key: "practice", label: "Luyện tập" },
              { key: "stats", label: "Thống kê" },
            ]}
          />
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Button icon={<UserOutlined />} />
          </Dropdown>
        </div>
      )}
    </Header>
  );
}
