import { Button, Checkbox, Form, Input, message } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};
export default function FormLogin() {

    const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await fetch("http://localhost:9000/login/jwt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      delete values.password;
      // Chuyển hướng đến trang chính sau khi đăng nhập thành công
      navigate(`/${data.username}`);


      // Lưu token vào localStorage
      localStorage.setItem("token", data.token);

      console.log("Login successful:", data);

      message.success("Đăng nhập thành công!");
    } catch (error) {
      console.log("Sai tài khoản hoặc mật khẩu!", error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email Adress"
        name="email"
        rules={[{ required: true, message: "Please input your Email Adress!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
