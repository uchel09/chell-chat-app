import { AppThunk } from "../store";
import {
  setAuthLoading,
  setRefreshLoading,
  setToken,
  setUser,
} from "../slices/authSlice";
import toast from "react-hot-toast";
import { AuthApi, refreshApi } from "@/lib/api";
import { User } from "@/types/user";

interface RegisterPayload {
  username: string;
  email: string;
  gender: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const register =
  ({ username, email, gender, password }: RegisterPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAuthLoading(true));
      const res = await AuthApi("register", {
        username,
        email,
        gender,
        password,
      });

      toast.success(res.data.message);
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
export const login =
  ({ email, password }: LoginPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAuthLoading(true));
      const res = await AuthApi("login", { email, password });

      const token = res.data.accessToken;
      const user: User = res.data.user;

      dispatch(setToken(token));
      dispatch(setUser(user));

      localStorage.setItem("login", "true");
      toast.success("login success");
      return res.data;
    } catch (error) {
      toast.error("login failed");
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
export const logout =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setAuthLoading(true));
      dispatch(setToken(""));
      dispatch(setUser(null));
      const res = await AuthApi("logout", {});
      localStorage.clear();
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };
export const generateNewToken = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setRefreshLoading(true));
    const res = await refreshApi();

    const token = res.data.accessToken;
    const user: User = res.data.user;

    dispatch(setToken(token));
    dispatch(setUser(user));
    return res.data;
  } catch (error) {
    throw error;
  } finally {
    dispatch(setRefreshLoading(false));
  }
};
