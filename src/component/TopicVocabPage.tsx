import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin, Empty, Drawer, Button, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

import { Vocabulary } from "../helpers/TypeData";
import FlashCard from "../component/FlashCard";
import CardAdd from "../component/CardAdd";
import ImportVocabExcel from "../component/ImportVocab/ImportVocabExcel";
import { topicApi } from "../apis/topicApi";

export default function TopicVocabPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const [topicName, setTopicName] = useState("");
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [reload, setReload] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVocabByTopic = async () => {
      setLoading(true);
      try {
        if (!topicId) return;

        const res = await topicApi.getTopicById(topicId);
        setTopicName(res.topicName || "Chủ đề");
        setVocabularies(res.vocabIds || []);
        console.log(res);
      } catch (error) {
        console.error("Lỗi khi lấy từ vựng theo topic:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVocabByTopic();
  }, [topicId, reload]);
  console.log(topicId);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
          📚 Danh sách từ vựng của chủ đề "{topicName}"
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Space>
            <Button
              icon={<UploadOutlined />}
              onClick={() => setOpenImport(true)}
              className="w-full sm:w-auto"
              style={{ borderRadius: "0.5rem" }}
            >
              Import Excel
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenAdd(true)}
              className="w-full sm:w-auto"
              style={{ borderRadius: "0.5rem" }}
            >
              Thêm từ
            </Button>
          </Space>
        </div>
      </div>

      {/* Drawer Thêm từ */}
      <Drawer
        title="Thêm từ vựng mới"
        placement="right"
        width={window.innerWidth < 640 ? "100%" : 450}
        onClose={() => setOpenAdd(false)}
        open={openAdd}
        destroyOnHidden
        styles={{ body: { padding: "1rem" } }}
      >
        <CardAdd
          topicId={topicId}
          onAdded={() => setReload((prev) => !prev)}
          onClose={() => setOpenAdd(false)}
        />
      </Drawer>

      {/* Drawer Import */}
      <Drawer
        title="Import từ Excel"
        placement="right"
        width={window.innerWidth < 640 ? "100%" : 600}
        onClose={() => setOpenImport(false)}
        open={openImport}
        destroyOnHidden
        styles={{ body: { padding: "1rem" } }}
      >
        <ImportVocabExcel
          onImported={() => setReload((prev) => !prev)}
          topicId={topicId}
        />
      </Drawer>

      {/* Danh sách từ */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-60">
          <Spin size="large" />
          <span className="mt-2 text-gray-500">Đang tải từ vựng...</span>
        </div>
      ) : vocabularies.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-60 text-gray-500">
          <Empty
            description={
              <span className="text-gray-600 text-base">
                Chưa có từ vựng nào trong chủ đề này
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
            {vocabularies.map((vocab) => (
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
  );
}
