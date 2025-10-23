/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { speakWord } from "./Function/speakWord";
import { searchWord, WordData } from "./Function/rearchWord";

interface Props {
    onSearch: (data: WordData) => void;
}

export default function SearchWord({ onSearch }: Props) {
    const [term, setTerm] = useState("");
    const [data, setData] = useState<WordData | null>(null);
    const [loading, setLoading] = useState(false);

    const search = async () => {
        if (!term.trim()) return;
        setLoading(true);
        try {
            const result = await searchWord(term);
            setData(result);
        } catch (err) {
            console.error("Lỗi tra từ:", err);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        if (data) onSearch(data);
    };

    return (
        <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative w-full max-w-xs">
                <input
                    type="text"
                    placeholder="Nhập từ vựng..."
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
                {term && (
                    <button
                        onClick={() => speakWord(term, data?.detectedLang || "en")}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-blue-400 text-white shadow hover:bg-blue-500 transition"
                        title="Phát âm"
                    >
                        🔊
                    </button>
                )}
            </div>

            <button
                onClick={search}
                className="w-40 rounded-xl bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? "⏳ Đang tra từ..." : "🔍 Tra từ"}
            </button>

            {data && (
                <div className="mt-4 w-full max-w-md rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-md space-y-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">{data.word}</h2>
                        {data.phonetic && <span className="text-gray-500 italic">{data.phonetic}</span>}
                    </div>

                    {data.detectedLang && (
                        <p className="text-sm text-gray-500">Ngôn ngữ gốc: {data.detectedLang}</p>
                    )}

                    {data.meanings && data.meanings.length > 0 && (
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {data.meanings.map((m: any, i: number) => (
                                <li key={i}>
                                    <span className="font-semibold">{m.partOfSpeech || m.partsOfSpeech || "–"}</span>:{" "}
                                    {m.definitions?.[0]?.definition || m.english_definitions?.[0] || "–"}
                                </li>
                            ))}
                        </ul>
                    )}

                    {data.meaning_vi && (
                        <p className="rounded-md bg-blue-50 px-3 py-1 text-blue-600 font-medium flex items-center justify-between">
                            👉 {data.meaning_vi}
                            <button
                                onClick={() => speakWord(data.meaning_vi, "vi")}
                                className="ml-2 px-2 py-0.5 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                                title="Nghe nghĩa"
                            >
                                🔊
                            </button>
                        </p>
                    )}

                    {data.example && (
                        <p className="text-gray-700">
                            💡 Ví dụ: <i>{data.example}</i>
                        </p>
                    )}

                    <button
                        onClick={() => {
                            handleAdd();
                            setData(null);
                            setTerm("");
                        }}
                        className="w-full rounded-xl bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 transition"
                    >
                        Thêm từ này
                    </button>
                </div>
            )}
        </div>
    );
}
