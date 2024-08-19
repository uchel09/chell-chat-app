import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { RootState } from "../store";

interface AuthState {
  token: string;
  user: User | null;
  authLoading: boolean;
  refreshLoading: boolean;
}

const initialState: AuthState = {
  token: "",
  user: null,
  authLoading: false,
  refreshLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
    setRefreshLoading: (state, action: PayloadAction<boolean>) => {
      state.refreshLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});
export const myToken = (state:RootState) => state.auth.token;

export const { setUser, setAuthLoading, setRefreshLoading, setToken } =
  authSlice.actions;
export default authSlice.reducer;
