/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Upload, Button, Table, message, Space } from "antd";
import { UploadOutlined, ImportOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { vocabApi } from "../apis/vocabsApi";

export default function ImportVocabExcel({
  onImported,
}: {
  onImported: () => void;
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Xử lý khi chọn file Excel
  const handleUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const bstr = e.target?.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      setData(jsonData);
      message.success("Đọc file thành công!");
    };

    reader.readAsBinaryString(file);
    return false; // chặn upload mặc định của AntD
  };

  // Import dữ liệu vào backend
  const handleImport = async () => {
    if (data.length === 0) {
      return message.warning("Vui lòng chọn file trước!");
    }

    try {
      setLoading(true);
      const res = await vocabApi.addImport(data);

      message.success(
        `Import thành công ${res.data.successCount}, lỗi ${res.data.errorCount}`
      );
      if (res.data.errors.length > 0) {
        console.warn("Lỗi:", res.data.errors);
      }
      onImported();
      setData([]); // reset sau khi import
    } catch (err) {
      console.error(err);
      message.error("Import thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Word", dataIndex: "Word" },
    { title: "Meaning", dataIndex: "Meaning" },
    { title: "Word Type", dataIndex: "Word Type" },
    { title: "Phonetic", dataIndex: "Phonetic" },
    { title: "Example", dataIndex: "Example" },
  ];

  return (
    <div>
      <Space>
        <Upload
          beforeUpload={handleUpload}
          accept=".xlsx,.xls"
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Chọn file Excel</Button>
        </Upload>

        <Button
          type="primary"
          icon={<ImportOutlined />}
          onClick={handleImport}
          loading={loading}
          disabled={data.length === 0}
        >
          Import vào hệ thống
        </Button>
      </Space>

      {data.length > 0 && (
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(_record, index) =>
            index !== undefined ? index.toString() : Math.random().toString()
          }
          pagination={{ pageSize: 5 }}
          className="mt-4"
        />
      )}
    </div>
  );
}
