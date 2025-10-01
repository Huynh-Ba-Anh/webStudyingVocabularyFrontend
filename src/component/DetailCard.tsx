import { Button, Form, Input, Select, message } from "antd";
import { useState } from "react";
import { Vocabulary } from "../helpers/TypeData";
import { vocabApi } from "../apis/vocabsApi";

const { TextArea } = Input;

export default function DetailCard({
  vocab,
  onUpdate,
}: {
  vocab: Vocabulary;
  onUpdate: () => void;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await vocabApi.update(vocab._id, values);
      message.success("Cập nhật từ vựng thành công!");
      onUpdate();
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        word: vocab.word,
        phonetic: vocab.phonetic,
        word_type: vocab.word_type,
        meaning: vocab.meaning,
        example: vocab.example,
        inforMore: vocab.inforMore || "",
      }}
    >
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

      <Form.Item label="Loại từ" name="word_type">
        <Select>
          <Select.Option value="danh từ">danh từ</Select.Option>
          <Select.Option value="động từ">động từ</Select.Option>
          <Select.Option value="tính từ い">tính từ い</Select.Option>
          <Select.Option value="tính từ な">tính từ な</Select.Option>
          <Select.Option value="trạng từ">trạng từ</Select.Option>
          <Select.Option value="trợ từ">trợ từ</Select.Option>
          <Select.Option value="trợ động từ">trợ động từ</Select.Option>
          <Select.Option value="định từ">định từ</Select.Option>
          <Select.Option value="liên từ">liên từ</Select.Option>
          <Select.Option value="thán từ">thán từ</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Ý nghĩa" name="meaning">
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Ví dụ" name="example">
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item label="Thông tin thêm" name="inforMore">
        <TextArea rows={2} />
      </Form.Item>

      <Button
        type="primary"
        loading={loading}
        onClick={handleSave}
        block
      >
        Lưu
      </Button>
    </Form>
  );
}
