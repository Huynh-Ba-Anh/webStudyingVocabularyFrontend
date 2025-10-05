/* eslint-disable @typescript-eslint/no-explicit-any */

export interface WordData {
    word: string;
    phonetic?: string;
    meanings?: any[];
    meaning_vi: string;
    example?: string;
}

export const searchWord = async (text: string, target = "vi"): Promise<WordData> => {
    try {
        const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
        const dictData = await dictRes.json();

        let phonetic = "";
        let meanings: any[] = [];
        let example = "";

        if (Array.isArray(dictData) && dictData.length > 0) {
            phonetic = dictData[0].phonetics?.[0]?.text || "";
            meanings = dictData[0].meanings || [];
            example = meanings?.[0]?.definitions?.[0]?.example || "";
        }

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const translateData: any = await res.json();
        const meaning_vi = translateData[0].map((item: any) => item[0]).join("");
        return {
            word: text,
            phonetic,
            meanings,
            meaning_vi,
            example,
        };
    } catch (err) {
        console.error("Lỗi searchWord:", err);
        return {
            word: text,
            phonetic: "",
            meanings: [],
            meaning_vi: text,
            example: "",
        };
    }
};
