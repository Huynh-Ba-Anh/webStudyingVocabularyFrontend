/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form, Input, Select, message, Button } from "antd";
import { Vocabulary } from "../helpers/TypeData";
import { vocabApi } from "../apis/vocabsApi";

const { TextArea } = Input;

interface CardAddProps {
  topicId: string | undefined;
  dataSearch?: any;
  onAdded: () => void;
  onClose: () => void;
}

export default function CardAdd({ onAdded, onClose, topicId, dataSearch }: CardAddProps) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataSearch) {
      form.setFieldsValue({
        word: dataSearch.word || "",
        phonetic: dataSearch.phonetic || "",
        word_type: dataSearch.meanings?.[0]?.partOfSpeech || "",
        meaning:
          dataSearch.meaning_vi || "",
        example: dataSearch.example || "",
      });
    }
  }, [dataSearch, form]);

  const handleFinish = async (values: Partial<Vocabulary>) => {
    try {
      setLoading(true);
      await vocabApi.add(topicId, values);
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
    <Form form={form} layout="vertical" onFinish={handleFinish} autoComplete="off">
      <Form.Item label="Từ vựng" name="word" rules={[{ required: true }]}>
        <Input placeholder="Ví dụ: 学生" />
      </Form.Item>

      <Form.Item label="Phiên âm" name="phonetic">
        <Input placeholder="Ví dụ: がくせい" />
      </Form.Item>

      <Form.Item label="Loại từ" name="word_type" rules={[{ required: true }]}>
        <Select placeholder="Chọn loại từ">
          <Select.Option value="noun">Danh từ</Select.Option>
          <Select.Option value="verb">Động từ</Select.Option>
          <Select.Option value="adjective">Tính từ</Select.Option>
          <Select.Option value="adverb">Trạng từ</Select.Option>
          <Select.Option value="interjection">Thán từ</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Ý nghĩa" name="meaning" rules={[{ required: true }]}>
        <TextArea rows={3} placeholder="Ví dụ: học sinh" />
      </Form.Item>

      <Form.Item label="Ví dụ" name="example">
        <TextArea rows={2} placeholder="Ví dụ: 私は学生です。" />
      </Form.Item>

      <Form.Item label="Thông tin thêm" name="inforMore">
        <TextArea rows={2} placeholder="Ghi chú bổ sung" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        Thêm từ vựng
      </Button>
    </Form>
  );
}
