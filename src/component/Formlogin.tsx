import { Button, Checkbox, Form, Input, message, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { authApi } from "../apis/authApi";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

interface FormLoginProps {
  onLoginSuccess?: (token: string) => void;
}

export default function FormLogin({ onLoginSuccess }: FormLoginProps) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      const data = await authApi.login({
        email: values.email!,
        password: values.password!,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      if (onLoginSuccess) onLoginSuccess(data.accessToken);

      window.dispatchEvent(new Event("storage"));
      message.success("Đăng nhập thành công!");
    } catch (error) {
      console.error(error);
      message.error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.response?.data?.message || "Sai tài khoản hoặc mật khẩu!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
          <p className="text-gray-500">Đăng nhập để tiếp tục</p>
        </div>

        {/* Form */}
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Nhập email"
              size="large"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>
            <a className="text-blue-500 text-sm hover:underline" href="#">
              Quên mật khẩu?
            </a>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          Chưa có tài khoản?{" "}
          <a className="text-blue-500 hover:underline" href="/register">
            Đăng ký
          </a>
        </div>
      </Card>
    </div>
  );
}
