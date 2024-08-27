"use client";

import { setUser } from "@/redux/slices/authSlice";
import {
  updateConversationsSocket,
} from "@/redux/slices/conversationsSlice";
import { AppDispatch, RootState } from "@/redux/store";

import { User } from "@/types/user";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const SocketClient = () => {
  const { user, token } = useSelector(
    (state: RootState) => state.auth,
    shallowEqual
  );
  const socket = useSelector(
    (state: RootState) => state.socket.socket,
    shallowEqual
  );


  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    socket?.emit("join-user", user);
  }, [socket, user]);

  // Send Request Friend update receiver
  useEffect(() => {
    socket?.on("update-receiver-toclient", (updatedUser: User) => {
      dispatch(setUser(updatedUser));
    });
  }, [dispatch, socket]);
  useEffect(() => {
    socket?.on("update-receiver-cancel-toclient", (updatedUser: User) => {
      dispatch(setUser(updatedUser));
    });
  }, [dispatch, socket]);
  useEffect(() => {
    socket?.on("update-sender-accept-toclient", (updatedUser: User) => {
      dispatch(setUser(updatedUser));
    });
  }, [dispatch, socket]);
  useEffect(() => {
    socket?.on("update-sender-reject-toclient", (updatedUser: User) => {
      dispatch(setUser(updatedUser));
    });
  }, [dispatch, socket]);
  useEffect(() => {
    socket?.on("delete-friend-toclient", (updatedUser: User) => {
      dispatch(setUser(updatedUser));
    });
  }, [dispatch, socket]);
  useEffect(() => {
    socket?.on("send-message-toclient", (message: any) => {
      if (message) {
        if (token) {
          message.token = token;
          dispatch(updateConversationsSocket(message));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, socket, token]);

  return null;
};

export default SocketClient;
