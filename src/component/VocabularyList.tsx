import { useState } from "react";
import { Card, Row, Col, Empty } from "antd";
import { Vocabulary } from "../shared/ts/interface/vocabulary";

interface Props {
  vocabularies: Vocabulary[];
}

export default function VocabularyListUI({ vocabularies }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (vocabularies.length === 0) {
    return <Empty description="Chưa có từ vựng nào" />;
  }

  return (
    <div className="mt-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Ẩn danh sách từ vựng" : "Xem danh sách từ vựng"}
      </button>

      <input type="text" placeholder="Nhập từ vựng..." />

      {expanded && (
        <Row gutter={[16, 16]}>
          {vocabularies.map((vocab, idx) => (
            <Col key={idx} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={vocab.word}
                className="rounded-lg shadow-sm"
                hoverable
              >
                <p>{vocab.meaning}</p>
                {vocab.example && (
                  <p className="text-gray-500 text-sm">"{vocab.example}"</p>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
