/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Empty,
  Button,
  Drawer,
  Input,
  message,
  Spin,
  Modal,
} from "antd";
import {
  FolderOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Topic } from "../shared/ts/interface/topic";
import { topicApi } from "../apis/topicApi";
import { useNavigate } from "react-router-dom";

export default function FolderTopic() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [editTopicId, setEditTopicId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const res = await topicApi.getTopics();
      setTopics(res);
    } catch (error) {
      message.error("Không thể tải danh sách chủ đề");
    } finally {
      setLoading(false);
    }
  };


  const openAddDrawer = () => {
    setEditTopicId(null);
    setNewTopic("");
    setOpenDrawer(true);
  };

  const openEditDrawer = (topic: Topic) => {
    setEditTopicId(topic._id || topic._id);
    setNewTopic(topic.topicName);
    setOpenDrawer(true);
  };

  const handleSaveTopic = async () => {
    if (!newTopic.trim()) {
      message.warning("Vui lòng nhập tên chủ đề");
      return;
    }

    try {
      if (editTopicId) {
        await topicApi.updateTopic(editTopicId, { topicName: newTopic.trim() });

        setTopics((prev) =>
          prev.map((topic) =>
            topic._id === editTopicId
              ? { ...topic, topicName: newTopic.trim() }
              : topic
          )
        );

        message.success("Cập nhật chủ đề thành công!");
      } else {
        const created = await topicApi.createTopic({
          topicName: newTopic.trim(),
        });

        setTopics((prev) => [...prev, created]);
        fetchTopics();
        message.success("Thêm chủ đề thành công!");
      }

      setNewTopic("");
      setEditTopicId(null);
      setOpenDrawer(false);
    } catch (error) {
      message.error("Không thể lưu chủ đề");
    }
  };

  const handleDeleteTopic = (id: string) => {
    Modal.confirm({
      title: "Xóa chủ đề",
      content: "Bạn có chắc muốn xóa chủ đề này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      async onOk() {
        try {
          await topicApi.deleteTopic(id);
          setTopics((prev) =>
            prev.filter((topic) => topic._id !== id && topic._id !== id)
          );
          message.success("Đã xóa chủ đề!");
          navigate("/");
        } catch (error) {
          message.error("Không thể xóa chủ đề");
        }
      },
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <FolderOutlined className="text-blue-600" /> Thư mục chủ đề
        </h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openAddDrawer}
          className="rounded-xl"
        >
          Thêm chủ đề
        </Button>
      </div>

      <Drawer
        title={editTopicId ? "Chỉnh sửa chủ đề" : "Thêm chủ đề mới"}
        placement="right"
        width={window.innerWidth < 640 ? "100%" : 400}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        styles={{ body: { padding: "1rem" } }}
      >
        <Input
          value={newTopic}
          placeholder="Nhập tên chủ đề..."
          onChange={(e) => setNewTopic(e.target.value)}
          className="mb-4"
        />
        <Button type="primary" block size="large" onClick={handleSaveTopic}>
          {editTopicId ? "Lưu thay đổi" : "Thêm"}
        </Button>
      </Drawer>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : topics.length === 0 ? (
        <Empty
          description={
            <span className="text-gray-600">Chưa có chủ đề nào</span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Row gutter={[24, 24]}>
          {topics.map((topic, index) => (
            <Col
              key={topic._id || topic._id || index}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  hoverable
                  onClick={() => navigate(`/topic/${topic._id}`)}
                  className="relative rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 
             transition-all duration-300 bg-gradient-to-br from-white to-blue-50 
             text-center cursor-pointer overflow-hidden"
                >
                  {topic.topicName !== "Non-Topic" && !topic.isDefault && (
                    <>
                      <Button
                        type="text"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        danger
                        size="small"
                        className="absolute top-2 right-2 hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTopic(topic._id);
                        }}
                      />
                      <Button
                        type="text"
                        shape="circle"
                        icon={<EditOutlined />}
                        size="small"
                        className="absolute top-2 right-10 text-blue-600 hover:scale-110 transition-transform"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditDrawer(topic);
                        }}
                      />
                    </>
                  )}

                  <div className="flex flex-col items-center justify-center py-6">
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-full mb-3 
                          ${topic.topicName === "Non-Topic"
                          ? "bg-gray-100 text-gray-400"
                          : "bg-blue-100 text-blue-500"}`}
                    >
                      <FolderOutlined className="text-3xl" />
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800 truncate px-2">
                      {topic.topicName.split(" of ")[0]}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {topic.vocabIds.length || 0} từ vựng
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Card>

              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
