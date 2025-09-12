import { Form, Input, Select, message, Button } from "antd";
import { useState } from "react";
import { Vocabulary } from "../helpers/TypeData";

const { Option } = Select;
const { TextArea } = Input;

interface CardAddProps {
  onAdded: () => void;
  onClose: () => void;
}

export default function CardAdd({ onAdded, onClose }: CardAddProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values: Partial<Vocabulary>) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:9000/vocabularies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Server error");

      message.success("Thêm từ vựng thành công!");
      form.resetFields();
      onAdded();   // reload dữ liệu danh sách từ parent
      onClose();   // đóng card
    } catch (error) {
      console.error(error);
      message.error("Thêm từ vựng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // click vào nền mờ đóng card
    >
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-md p-5"
        onClick={(e) => e.stopPropagation()} // ngăn click vào card đóng
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Thêm từ vựng</h2>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Từ vựng"
            name="word"
            rules={[{ required: true, message: "Nhập từ vựng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Phiên âm" name="phonetic">
            <Input />
          </Form.Item>

          <Form.Item
            label="Loại từ"
            name="word_type"
            rules={[{ required: true, message: "Chọn loại từ" }]}
          >
            <Select>
              <Option value="danh từ">danh từ</Option>
              <Option value="động từ">động từ</Option>
              <Option value="tính từ い">tính từ い</Option>
              <Option value="tính từ な">tính từ な</Option>
              <Option value="trạng từ">trạng từ</Option>
              <Option value="trợ từ">trợ từ</Option>
              <Option value="trợ động từ">trợ động từ</Option>
              <Option value="định từ">định từ</Option>
              <Option value="liên từ">liên từ</Option>
              <Option value="thán từ">thán từ</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ý nghĩa"
            name="meaning"
            rules={[{ required: true, message: "Nhập nghĩa" }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Ví dụ" name="example">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item label="Thông tin thêm" name="inforMore">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Thêm từ vựng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
