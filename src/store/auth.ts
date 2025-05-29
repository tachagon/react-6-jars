import { atom } from "recoil"

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    user: null,
    token: null,
  }
})
