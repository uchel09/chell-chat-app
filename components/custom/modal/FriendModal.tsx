"use client";
import { setOpenModalFriends } from "@/redux/slices/componentSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
interface FriendModalProps {
  children: React.ReactNode;
}

const FriendModal = ({ children }: FriendModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="w-full h-[100vh] fixed  z-[100] flex items-center justify-center">
      <div
        className="absolute z-[2] left-0 right-0 top-0 bottom-0 bg-black opacity-25"
        onClick={() => dispatch(setOpenModalFriends(false))}
      ></div>
      <div className="absolute z-[10] w-[500px] top-[10%] bottom-[12%] bg-white rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default FriendModal;
