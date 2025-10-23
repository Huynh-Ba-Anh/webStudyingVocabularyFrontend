import { Button, message, Modal } from "antd";
import { useState } from "react";
import DetailCard from "./DetailCard";
import { Vocabulary } from "../helpers/TypeData";
import { vocabApi } from "../apis/vocabsApi";
import { speakWord } from "./Function/speakWord";

export default function FlashCard({
  vocab,
  onUpdate,
}: {
  vocab: Vocabulary;
  onUpdate: () => void;
}) {
  const [lang, setLang] = useState<"en" | "ja">("en");
  const [flipped, setFlipped] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async (vocab: Vocabulary) => {
    try {
      await vocabApi.delete(vocab._id);
      message.success("Xóa thành công!");
      onUpdate();
    } catch (error) {
      console.error(error);
      message.error((error as Error).message || "Xóa thất bại");
    }
  };

  return (
    <>
      <div
        className="w-80 h-52 [perspective:1000px] cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLang(lang === "en" ? "ja" : "en");
            }}
            className={`absolute top-2 left-2 z-50 transition-opacity duration-300 ${flipped ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          >
            {lang === "en" ? "EN" : "JA"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              speakWord(vocab.word, lang);
            }}
            className={`absolute top-2 right-2 z-50 transition-opacity duration-300 ${flipped ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          >
            🔊
          </button>

          {/* Front */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-xl flex flex-col justify-center items-center [backface-visibility:hidden] p-4">
            <h2 className="text-2xl font-bold">{vocab.word}</h2>
            <p className="text-gray-500 italic">{vocab.phonetic}</p>
            <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              {vocab.word_type}
            </span>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-yellow-50 rounded-xl shadow-xl flex flex-col justify-center items-center [backface-visibility:hidden] [transform:rotateY(180deg)] p-4">
            <p className="text-lg font-semibold text-center">{vocab.meaning}</p>
            <p className="text-gray-600 mt-2 text-center">
              Ví dụ: {vocab.example}
            </p>

            <div className="flex gap-3 mt-4">
              <Button
                type="primary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
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
              <div> {vocab.status}</div>

            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        destroyOnHidden
      >
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
