// interfaces/auth.ts

// dữ liệu gửi lên khi đăng ký / đăng nhập
export interface Account {
    userName?: string
    email: string
    password: string
}

// dữ liệu backend trả về khi đăng ký
export interface RegisterResponse {
  id: string
  email: string
  createdAt: string
}

export interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

