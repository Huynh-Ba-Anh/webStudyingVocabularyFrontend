import { Form, Input, Select, message, Button } from "antd";
import { useState } from "react";
import { Vocabulary } from "../helpers/TypeData";
import { vocabApi } from "../apis/vocabsApi";

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
      await vocabApi.add(values);
      message.success("✅ Thêm từ vựng thành công!");
      form.resetFields();
      onAdded();
      onClose();
    } catch (error) {
      console.error("❌ Thêm từ vựng thất bại:", error);
      message.error("Thêm từ vựng thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Từ vựng"
        name="word"
        rules={[{ required: true, message: "Vui lòng nhập từ vựng" }]}
      >
        <Input placeholder="Ví dụ: 学生" />
      </Form.Item>

      <Form.Item label="Phiên âm" name="phonetic">
        <Input placeholder="Ví dụ: がくせい" />
      </Form.Item>

      <Form.Item
        label="Loại từ"
        name="word_type"
        rules={[{ required: true, message: "Vui lòng chọn loại từ" }]}
      >
        <Select placeholder="Chọn loại từ">
          <Select.Option value="danh từ">Danh từ</Select.Option>
          <Select.Option value="động từ">Động từ</Select.Option>
          <Select.Option value="tính từ い">Tính từ い</Select.Option>
          <Select.Option value="tính từ な">Tính từ な</Select.Option>
          <Select.Option value="trạng từ">Trạng từ</Select.Option>
          <Select.Option value="trợ từ">Trợ từ</Select.Option>
          <Select.Option value="trợ động từ">Trợ động từ</Select.Option>
          <Select.Option value="định từ">Định từ</Select.Option>
          <Select.Option value="liên từ">Liên từ</Select.Option>
          <Select.Option value="thán từ">Thán từ</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ý nghĩa"
        name="meaning"
        rules={[{ required: true, message: "Vui lòng nhập ý nghĩa" }]}
      >
        <TextArea rows={3} placeholder="Ví dụ: học sinh" />
      </Form.Item>

      <Form.Item label="Ví dụ" name="example">
        <TextArea rows={2} placeholder="Ví dụ: 私は学生です。" />
      </Form.Item>

      <Form.Item label="Thông tin thêm" name="inforMore">
        <TextArea rows={2} placeholder="Ghi chú bổ sung" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="mt-2"
        >
          Thêm từ vựng
        </Button>
      </Form.Item>
    </Form>
  );
}
