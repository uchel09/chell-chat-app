import { deleteDataAPI, getDataAPI, postDataAPI } from "@/lib/api";
import { setLoadingUsers, setUsers } from "../slices/userSlice";
import { AppThunk } from "../store";
import { setUser } from "../slices/authSlice";

interface searchNewUserPayload {
  username: string;
  token: string;
}
interface FriendRequestPayload {
  id: string;
}
export const searchNewUser =
  ({ username, token }: searchNewUserPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoadingUsers(true));
      const res = await getDataAPI(`users/${username}`, token);
      dispatch(setUsers(res.data.users));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingUsers(false));
    }
  };

export const sendFriendRequest =
  ({ id }: FriendRequestPayload): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const socket = getState().socket.socket;
      const res = await postDataAPI(
        "friend-request/send-request",
        {
          receiverId: id,
        },
        token
      );
      if (socket) {
        socket.emit("update-receiver", res.data.receiver);
      }

      dispatch(setUser(res.data.sender));
      return res.data;
    } catch (error) {
      throw error;
    }
  };
export const cancelFriendRequest =
  ({ id }: FriendRequestPayload): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const socket = getState().socket.socket;
      const res = await deleteDataAPI(
        `friend-request/cancel-request/${id}`,

        token
      );
      if (socket) {
        socket.emit("update-receiver-cancel", res.data.receiver);
      }

      dispatch(setUser(res.data.sender));
      return res.data;
    } catch (error) {
      throw error;
    }
  };

export const acceptFriendRequest =
  ({ id }: FriendRequestPayload): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const socket = getState().socket.socket;
      const res = await postDataAPI(
        "friend-request/accept",
        {
          requestId: id,
        },
        token
      );
      if (socket) {
        socket.emit("update-sender-accept", res.data.sender);
      }

      dispatch(setUser(res.data.receiver));
      return res.data;
    } catch (error) {
      throw error;
    }
  };
export const rejectFriendRequest =
  ({ id }: FriendRequestPayload): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const socket = getState().socket.socket;
      const res = await deleteDataAPI(
        `friend-request/reject/${id}`,

        token
      );
      if (socket) {
        socket.emit("update-sender-reject", res.data.sender);
      }

      dispatch(setUser(res.data.receiver));
      return res.data;
    } catch (error) {
      throw error;
    }
  };
export const deleteFriend =
  ({ id }: FriendRequestPayload): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const socket = getState().socket.socket;
      const res = await deleteDataAPI(
        `friend-request/friend/${id}`,

        token
      );
      if (socket) {
        socket.emit("delete-friend", res.data.receiver);
      }

      dispatch(setUser(res.data.sender));
      return res.data;
    } catch (error) {
      throw error;
    }
  };
