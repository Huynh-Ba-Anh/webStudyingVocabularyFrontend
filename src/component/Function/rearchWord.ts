/* eslint-disable @typescript-eslint/no-explicit-any */

export interface WordData {
    word: string;
    detectedLang: string;
    phonetic?: string;
    meanings?: any[];
    meaning_vi: string;
    example?: string;
}

export const searchWord = async (text: string, target = "vi"): Promise<WordData> => {
    try {
        const transUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(transUrl);
        const translateData: any = await res.json();
        const meaning_vi = translateData[0].map((item: any) => item[0]).join("");
        const detectedLang = translateData[2] || "auto";

        let phonetic = "";
        let meanings: any[] = [];
        let example = "";

        if (detectedLang === "en") {
            try {
                const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
                const dictData = await dictRes.json();
                if (Array.isArray(dictData) && dictData.length > 0) {
                    phonetic = dictData[0].phonetics?.[0]?.text || "";
                    meanings = dictData[0].meanings || [];
                    example = meanings?.[0]?.definitions?.[0]?.example || "";
                }
            } catch (err) {
                console.warn("DictionaryAPI lỗi:", err);
            }
        }

        else if (detectedLang === "ja") {
            try {
                const jishoRes = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(text)}`);
                const jishoData = await jishoRes.json();
                if (Array.isArray(jishoData.data) && jishoData.data.length > 0) {
                    const entry = jishoData.data[0];
                    phonetic = entry.japanese?.[0]?.reading || "";
                    meanings = entry.senses || [];
                    example = entry.senses?.[0]?.english_definitions?.[0] || "";
                }
            } catch (err) {
                console.warn("Jisho API lỗi:", err);
            }
        }

        return {
            word: text,
            detectedLang,
            phonetic,
            meanings,
            meaning_vi,
            example,
        };
    } catch (err) {
        console.error("Lỗi searchWord:", err);
        return {
            word: text,
            detectedLang: "unknown",
            phonetic: "",
            meanings: [],
            meaning_vi: text,
            example: "",
        };
    }
};
