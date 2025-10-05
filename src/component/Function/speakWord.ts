export function speakWord(word: string, lang: string) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(word);

    if (lang === "en") utterance.lang = "en-US";
    else if (lang === "vi") utterance.lang = "vi-VN";
    else if (lang === "ja") utterance.lang = "ja-JP";

    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Trình duyệt không hỗ trợ Speech Synthesis");
  }
}
