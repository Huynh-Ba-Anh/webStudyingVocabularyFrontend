import { Button, Form, Input, message } from "antd";
import type { FormProps } from "antd";

type RegisterFields = {
  userName: string;
  email: string;
  password: string;
};

export default function RegisterForm() {

  const onFinish: FormProps<RegisterFields>["onFinish"] = async (values) => {
    try {
      const res = await fetch("http://localhost:9000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Đăng ký thất bại");
      }

      message.success("Đăng ký thành công!");
    } catch (error) {
      console.error(error);
      message.error((error as Error).message || "Đăng ký thất bại");}
  };

  const onFinishFailed: FormProps<RegisterFields>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="register"
      layout="vertical"
      style={{ maxWidth: 400, margin: "0 auto" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="User Name"
        name="userName"
        rules={[{ required: true, message: "Vui lòng nhập User Name!" }]}
      >
        <Input placeholder="Nhập user name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ!" },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}
