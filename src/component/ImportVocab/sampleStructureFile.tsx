/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Typography } from "antd";

const { Text } = Typography;

export default function SampleExcelStructure() {
  const sampleStructure: any[] = [
    {
      _key: "row-1",
      Word: "apple",
      Meaning: "quả táo",
      "Word Type": "noun",
      Phonetic: "/ˈæp.əl/",
      Example: "I eat an apple every day.",
      InforMore: "",
    },
    {
      _key: "row-2",
      Word: "run",
      Meaning: "chạy",
      "Word Type": "verb",
      Phonetic: "/rʌn/",
      Example: "He runs very fast.",
      InforMore: "",
    },
  ];

  const columns = [
    {
      title: "Word",
      dataIndex: "Word",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Meaning",
      dataIndex: "Meaning",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Word Type",
      dataIndex: "Word Type",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Phonetic",
      dataIndex: "Phonetic",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Example",
      dataIndex: "Example",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "InforMore",
      dataIndex: "InforMore",
      render: (text: string) => <Text>{text}</Text>,
    },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Cấu trúc file Excel mẫu</h3>
      <p className="mb-2 text-gray-600">
        Hãy tạo file Excel theo cấu trúc dưới đây trước khi import:
      </p>

      <Table
        dataSource={sampleStructure}
        columns={columns}
        pagination={false}
        size="small"
        rowKey={(record) => record._key}
        className="border border-gray-300 excel-like"
        bordered
      />

      <style>
        {`
          .excel-like .ant-table-cell {
            border: 1px solid #d1d5db !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            padding-top: 0.25rem !important;
            padding-bottom: 0.25rem !important;
          }
          .excel-like .ant-table-thead > tr > th {
            background-color: #f3f4f6 !important;
            border-bottom: 2px solid #d1d5db !important;
          }
        `}
      </style>
    </div>
  );
}
