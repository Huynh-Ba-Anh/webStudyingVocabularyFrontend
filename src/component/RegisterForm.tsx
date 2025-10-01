import { Button, Card, Form, Input, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { authApi } from "../apis/authApi";

const { Title, Text } = Typography;

type RegisterFields = {
  userName: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const onFinish = async (values: RegisterFields) => {
    try {
      await authApi.register(values);
      message.success("🎉 Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
    } catch (error: unknown) {
      console.error("Lỗi đăng ký:", error);
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Đăng ký thất bại!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="shadow-xl w-full max-w-md rounded-2xl border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <Title level={3} className="!mb-2 !text-gray-800">
            Đăng ký tài khoản
          </Title>
          <Text type="secondary">Điền thông tin để tạo tài khoản mới</Text>
        </div>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" size="large">
          {/* User Name */}
          <Form.Item
            label={<span className="font-medium text-gray-700">User Name</span>}
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập User Name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập user name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={<span className="font-medium text-gray-700">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Nhập email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={<span className="font-medium text-gray-700">Mật khẩu</span>}
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="!h-11 rounded-lg font-semibold shadow-md hover:shadow-lg"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <div className="text-center mt-4">
          <Text type="secondary">Đã có tài khoản?</Text>{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Đăng nhập ngay
          </a>
        </div>
      </Card>
    </div>
  );
}
