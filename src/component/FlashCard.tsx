import { Button, Modal } from "antd";
import { useState } from "react";
import DetailCard from "./DetailCard";
import { Vocabulary } from "../helpers/TypeData"; // 👈 dùng chung

export default function FlashCard({
  vocab,
  onUpdate,
}: {
  vocab: Vocabulary;
  onUpdate: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async (vocab: Vocabulary) => {
    try {
      await fetch(`http://localhost:9000/vocabularies/${vocab._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onUpdate();
    } catch (error) {
      console.error("Error deleting vocabulary:", error);
    }
  };

  return (
    <>
      <div
        className="w-80 h-52 [perspective:1000px] cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-xl flex flex-col justify-center items-center [backface-visibility:hidden] p-4">
            <h2 className="text-2xl font-bold">{vocab.word}</h2>
            <p className="text-gray-500 italic">{vocab.phonetic}</p>
            <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              {vocab.word_type}
            </span>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-yellow-50 rounded-xl shadow-xl flex flex-col justify-center items-center [backface-visibility:hidden] [transform:rotateY(180deg)] p-4 transition-transform duration-500 ease-in-out">
      
      {/* Nghĩa và ví dụ */}
      <p className="text-lg font-semibold text-center">{vocab.meaning}</p>
      <p className="text-gray-600 mt-2 text-center">
        Ví dụ: {vocab.example}
      </p>

      {/* Nút Chi tiết + Xóa */}
      <div className="flex gap-3 mt-4">
        <Button
          type="primary"
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // tránh click card cha
            setOpen(true);
          }}
        >
          Chi tiết
        </Button>

        <Button
          danger
          size="small"
          onClick={() => {
            Modal.confirm({
              title: "Xác nhận xóa",
              content: `Bạn chắc chắn muốn xóa từ "${vocab.word}" không?`,
              okText: "Xóa",
              okType: "danger",
              cancelText: "Hủy",
              onOk: () => handleDelete(vocab),
            });
          }}
        >
          Xóa
        </Button>
      </div>
    </div>
        </div>
      </div>

      <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered>
        <DetailCard
          vocab={vocab}
          onUpdate={() => {
            onUpdate();
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
