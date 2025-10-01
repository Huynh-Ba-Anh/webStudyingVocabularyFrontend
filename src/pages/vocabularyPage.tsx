import { useEffect, useState } from "react";
import { useDecodedToken } from "../component/DecodedToken";
import { Vocabulary } from "../helpers/TypeData";
import FlashCard from "../component/FlashCard";
import { Button, Select, Card, Spin, Empty, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CardAdd from "../component/CardAdd";
import { vocabApi } from "../apis/vocabsApi";
import { motion, AnimatePresence } from "framer-motion";

type CategoryKey = "new" | "learning" | "forgotten" | "mastered" | "all";

const categories = [
  { key: "all", label: "Tất cả từ vựng" },
  { key: "new", label: "Mới" },
  { key: "learning", label: "Đang học" },
  { key: "forgotten", label: "Quên" },
  { key: "mastered", label: "Thành thạo" },
] as const;

export default function VocabularyPage() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const decoded = useDecodedToken();
  const [reload, setReload] = useState(false);
  const [selected, setSelected] = useState<CategoryKey>("all");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVocab = async () => {
      setLoading(true);
      try {
        if (decoded?.role === "admin") {
          console.warn("Admin không có quyền xem vocabulary");
          setVocabularies([]);
          return;
        }
        const res = await vocabApi.getAll();
        setVocabularies(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setVocabularies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVocab();
  }, [reload, decoded?.role]);

  const filteredVocabularies =
    selected === "all"
      ? vocabularies
      : vocabularies.filter((vocab) => vocab.status === selected);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Card className="shadow-lg sticky top-14 z-20 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            📚 Danh sách từ vựng
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Select
              value={selected}
              onChange={(value) => setSelected(value)}
              options={categories.map(({ key, label }) => ({
                value: key,
                label,
              }))}
              className="w-full sm:w-52"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto"
              style={{ borderRadius: "0.5rem" }}
            >
              Thêm từ
            </Button>
          </div>
        </div>
      </Card>

      {/* Drawer thêm từ vựng */}
      <Drawer
        title="Thêm từ vựng mới"
        placement="right"
        width={window.innerWidth < 640 ? "100%" : 450}
        onClose={() => setOpen(false)}
        open={open}
        destroyOnHidden
        bodyStyle={{ padding: "1rem" }}
      >
        <CardAdd
          onAdded={() => setReload((prev) => !prev)}
          onClose={() => setOpen(false)}
        />
      </Drawer>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-60">
            <Spin size="large" />
            <span className="mt-2 text-gray-500">Đang tải từ vựng...</span>
          </div>
        ) : filteredVocabularies.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-60 text-gray-500">
            <Empty
              description={
                <span className="text-gray-600 text-base">
                  Chưa có từ vựng nào
                </span>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <p className="mt-3 text-sm text-gray-500">
              Hãy thêm từ mới để bắt đầu học 📖
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredVocabularies.map((vocab) => (
                <motion.div
                  key={vocab._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  whileHover={{ scale: 1.03 }}
                >
                  <FlashCard
                    vocab={vocab}
                    onUpdate={() => setReload((prev) => !prev)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
