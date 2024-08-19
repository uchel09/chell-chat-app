"use client";
import {
  setOpenModalDelete,
  setOpenModalFriends,
} from "@/redux/slices/componentSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
interface FriendModalProps {
  text: string;
  onClick: () => void;
}

const DeleteModal = ({ text, onClick }: FriendModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="right-0 left-0 top-0 bottom-0 fixed  z-[200] flex items-center justify-center">
      <div className="absolute z-[2] left-0 right-0 top-0 bottom-0 bg-black opacity-25"></div>
      <div className="absolute z-[10] w-[500px] gap-3 p-2 rounded-lg flex  flex-col h-[100px]  justify-center items-center bg-white">
        <div>{text}</div>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-3 py-1 bg-[#64bcff] border-2 border-[#35a8ff] rounded-lg hover:bg-[#35a8ff] text-white"
            onClick={onClick}
          >
            Yes
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-white border-2 border-black rounded-lg hover:bg-[#2f2d2d] hover:text-white"
            onClick={() => dispatch(setOpenModalDelete(false))}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
