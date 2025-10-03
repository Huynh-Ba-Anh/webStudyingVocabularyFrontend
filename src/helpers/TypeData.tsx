export interface User {
  _id: string;
  userName: string;
  email: string;
  password?: string;
  role: "user" | "admin";
}

export interface Vocabulary {
  _id: string;
  word: string;
  meaning: string;
  word_type:
    | "danh từ"
    | "động từ"
    | "tính từ い"
    | "tính từ な"
    | "trạng từ"
    | "trợ từ"
    | "trợ động từ"
    | "định từ"
    | "liên từ"
    | "thán từ";
  phonetic: string;
  example: string;
  status: "new";
  inforMore: string;
  created_at: string;
  userId: string;
}

export interface Progress {
  _id: string;
  user_id: string;
  vocabulary_id: string;
  status: "new" | "learning" | "forgotten" | "mastered";
  correct_count: number;
  wrong_count: number;
  last_studied: string;
  updated_at: string;
}
