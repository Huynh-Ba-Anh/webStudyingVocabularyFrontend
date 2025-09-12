// src/types/index.ts

// User type
export interface User {
  _id: string;
  userName: string;
  email: string;
  password?: string; // không nên trả về password trong API
  role: "user" | "admin";
}

// Vocabulary type
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
  created_at: string; // từ backend trả về Date dạng string
  userId: string; // tham chiếu đến User._id
}

// Progress type
export interface Progress {
  _id: string;
  user_id: string; // tham chiếu User
  vocabulary_id: string; // tham chiếu Vocabulary
  status: "new" | "learning" | "forgotten" | "mastered";
  correct_count: number;
  wrong_count: number;
  last_studied: string;
  updated_at: string;
}
