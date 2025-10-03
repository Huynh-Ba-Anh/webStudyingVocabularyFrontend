import { useEffect, useState } from "react";
import { Me } from "../shared/ts/interface/me";
import { meApi } from "../apis/me";
import { Spin, Button, Input, message, Tooltip } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

export default function Profile() {
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    email: "",
    role: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await meApi.getMe();
        setUser(res);
        setFormData({
          userId: res._id,
          userName: res.userName,
          email: res.email,
          role: res.role,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        message.error("Bạn phải nhập mật khẩu hiện tại để đổi mật khẩu!");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        message.error("Mật khẩu mới và xác nhận không khớp!");
        return;
      }
    }

    try {
      setSaving(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {
        userName: formData.userName,
        email: formData.email,
      };
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.password = formData.newPassword;
      }

      await meApi.updateMe(formData.userId, updateData);
      setUser({ ...user!, ...updateData });
      message.success("Cập nhật thành công!");
      setEditing(false);
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-100 to-purple-100 text-gray-700">
        Không thể tải thông tin user
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
        {/* Avatar */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-4xl text-white font-bold">
            {user.userName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* User info */}
        {editing ? (
          <>
            <Input
              className="mb-3"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="Tên người dùng"
            />
            <Tooltip title="Bạn không thể thay đổi email" placement="top">
              <Input
                className="mb-3 cursor-not-allowed select-none"
                value={formData.email}
                placeholder="Email"
                readOnly
              />
            </Tooltip>

            {/* Password fields */}
            <Input.Password
              className="mb-3"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              placeholder="Mật khẩu hiện tại"
            />
            <Input.Password
              className="mb-3"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="Mật khẩu mới"
            />
            <Input.Password
              className="mb-3"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Xác nhận mật khẩu mới"
            />
            <p className="text-gray-400 mb-6 capitalize">{formData.role}</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">{user.userName}</h2>
            <p className="text-gray-500 mb-1">{user.email}</p>
            <p className="text-gray-400 mb-6 capitalize">{user.role}</p>
          </>
        )}

        {/* Action button */}
        <div className="flex justify-center gap-4">
          {editing ? (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              className="rounded-full px-6 py-2 bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
              onClick={handleUpdate}
              loading={saving}
            >
              Update
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="rounded-full px-6 py-2 bg-indigo-500 border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
