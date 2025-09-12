import { Button, Modal, Form, Input, Select } from "antd";
import { useState } from "react";
import { Vocabulary } from "../helpers/TypeData";

const { TextArea } = Input;

export default function DetailCard({ vocab, onUpdate }: { vocab: Vocabulary, onUpdate: () => void  }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({
      word: vocab.word,
      phonetic: vocab.phonetic,
      word_type: vocab.word_type,
      meaning: vocab.meaning,
      example: vocab.example,
      inforMore: vocab.inforMore || "",
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Updated values:", values);
      // TODO: Gửi API cập nhật lên server
      await fetch(`http://localhost:9000/vocabularies/${vocab._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });
      setIsModalOpen(false);
        // Gọi hàm onUpdate để thông báo cho component cha
        onUpdate();
    } catch (error) {
      console.log("Validate failed:", error);
    }
  };

  console.log(vocab._id);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-auto bg-white rounded-xl shadow-md p-5">
      {/* Từ vựng + phiên âm */}
      <div className="mb-3">
        <h2 className="text-2xl font-bold text-gray-800">{vocab.word}</h2>
        <p className="text-gray-500 italic">{vocab.phonetic}</p>
      </div>

      {/* Loại từ */}
      <span className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
        {vocab.word_type}
      </span>

      {/* Nghĩa */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">Ý nghĩa:</p>
        <p className="text-gray-800">{vocab.meaning}</p>
      </div>

      {/* Ví dụ */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">Ví dụ:</p>
        <p className="text-gray-600">{vocab.example}</p>
      </div>

      {/* Thông tin thêm */}
      {vocab.inforMore && (
        <div className="mb-4 text-sm text-gray-500">
          Chi tiết: {vocab.inforMore}
        </div>
      )}

      <Button type="primary" onClick={showModal}>
        Chỉnh sửa
      </Button>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa từ vựng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
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
        </Form>
      </Modal>
    </div>
  );
}
