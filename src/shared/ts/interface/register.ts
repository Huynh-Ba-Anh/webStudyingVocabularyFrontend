export interface Account {
  userName?: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  createdAt: string;
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
