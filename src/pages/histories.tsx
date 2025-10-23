import { useEffect, useState } from "react";
import { HistoryApi } from "../apis/historyApi";
import { IHistory } from "../shared/ts/interface/history";

export default function HistoriesPage() {
  const [histories, setHistories] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIds, setOpenIds] = useState<string[]>([]); // ✅ Lưu ID nào đang mở

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const res = await HistoryApi.getHistory();
        setHistories(res);
        console.log(res)
      } catch (err) {
        console.error("Error fetching histories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistories();
  }, []);

  const toggleDetail = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (histories.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Chưa có lịch sử học nào.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Lịch sử luyện tập</h1>

      <div className="space-y-8">
        {histories.map((history) => {
          const isOpen = openIds.includes(history._id);
          return (
            <div
              key={history._id}
              className="p-5 border rounded-2xl bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-lg">
                    🕒 Ngày:{" "}
                    <span className="text-blue-600">
                      {new Date(history.createdAt).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Kết quả:{" "}
                    <span className="font-semibold text-green-600">
                      {history.correctCount}
                    </span>{" "}
                    / {history.totalCount} câu đúng
                  </p>
                </div>

                {/* ✅ Nút xem chi tiết */}
                <button
                  onClick={() => toggleDetail(history._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {isOpen ? "Ẩn chi tiết ▲" : "Xem chi tiết ▼"}
                </button>
              </div>

              {/* ✅ Phần chi tiết có thể ẩn/hiện */}
              {isOpen && (
                <div className="overflow-x-auto animate-fadeIn">
                  <table className="w-full text-left border-t">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border-b">#</th>
                        <th className="p-2 border-b">Câu hỏi</th>
                        <th className="p-2 border-b">Đáp án đúng</th>
                        <th className="p-2 border-b">Câu trả lời của bạn</th>
                        <th className="p-2 border-b text-center">Kết quả</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.exercises.map((ex, index) => (
                        <tr
                          key={index}
                          className={`${ex.correct
                            ? "bg-green-50 hover:bg-green-100"
                            : "bg-red-50 hover:bg-red-100"
                            } transition`}
                        >
                          <td className="p-2 border-b">{index + 1}</td>
                          <td className="p-2 border-b">{ex.question}</td>
                          <td className="p-2 border-b font-medium text-green-700">
                            {ex.answer}
                          </td>
                          <td
                            className={`p-2 border-b font-medium ${ex.correct ? "text-green-600" : "text-red-600"
                              }`}
                          >
                            {ex.userAnswer}
                          </td>
                          <td className="p-2 border-b text-center">
                            {ex.correct ? "✅" : "❌"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
