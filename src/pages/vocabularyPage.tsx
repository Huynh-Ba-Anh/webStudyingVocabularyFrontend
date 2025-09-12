import { useEffect, useState } from "react";
import { useDecodedToken } from "../component/DecodedToken";
import { Vocabulary } from "../helpers/TypeData";
import FlashCard from "../component/FlashCard";
import { Button, Select } from "antd";
import CardAdd from "../component/CardAdd";

export default function VocabularyPage() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const decoded = useDecodedToken();
  const [reload, setReload] = useState(false);
  const [selected, setSelected] = useState<CategoryKey>("all");
  const [open, setOpen] = useState(false);

  type CategoryKey = "new" | "learning" | "forgotten" | "mastered" | "all";

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "all", label: "Tất cả từ vựng" },
    { key: "new", label: "Mới" },
    { key: "learning", label: "Đang học" },
    { key: "forgotten", label: "Quên" },
    { key: "mastered", label: "Thành thạo" },
  ];

  useEffect(() => {
    const fetchVocab = async () => {
      try {
        const res = await fetch(
          `http://localhost:9000/vocabularies/${decoded?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch vocabularies");
        const data: Vocabulary[] = await res.json();
        setVocabularies(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchVocab();
  }, [reload]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-bold">📚 Danh sách từ vựng</span>
        <div className="flex items-center space-x-4">
          <Select
            value={selected}
            onChange={(value) => setSelected(value)}
            options={categories.map((cat) => ({ value: cat.key, label: cat.label }))}
            style={{ width: 180 }}
          />
          <Button onClick={() => setOpen(true)}>Thêm từ vựng</Button>
        </div>
      </div>
      {open && (
        <CardAdd
          onAdded={() => setReload((prev) => !prev)}
          onClose={() => setOpen(false)}
        />
      )}

      {vocabularies.length === 0 ? (
        <p className="text-gray-600">Chưa có từ vựng nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vocabularies.map((vocab, idx) => (
            <FlashCard
              key={idx}
              vocab={vocab}
              onUpdate={() => setReload((prev) => !prev)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
