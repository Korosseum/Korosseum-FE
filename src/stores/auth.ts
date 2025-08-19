import { create } from "zustand";

interface User {
  nickname: string;
  nicknameIndex: number;
  photo: string;
  email: string;
  provider: string;
}
interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logOut: () => void;
}

const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  logOut: () => set({ user: null }),
}));

export default userStore;
