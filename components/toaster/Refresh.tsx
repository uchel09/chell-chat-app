"use client";

import { generateNewToken, logout } from "@/redux/action/authAct";
import { setSocket } from "@/redux/slices/socketSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

const UseRefresh = () => {
  const dispatch: AppDispatch = useDispatch();
  const login =
    typeof window !== "undefined" ? localStorage.getItem("login") : null;

  useEffect(() => {
    const socket: Socket = io(process.env.SERVER || "http://localhost:8000");

    const refreshToken = async () => {
      try {
        if (!login) {
          return;
        }
        await dispatch(generateNewToken());
      } catch (error) {
        dispatch(logout(""));
      }
    };

    refreshToken();
    dispatch(setSocket(socket));

    // Cleanup function
    return () => {
      socket.off("message");
      socket.disconnect(); // Disconnect the socket when the component unmounts
      dispatch(setSocket(null));
    };
  }, [dispatch, login]);

  return null;
};

export default UseRefresh;
