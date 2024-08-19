"use client";
import { User } from "@/types/user";
import React, { useState } from "react";

import Image from "next/image";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { deleteFriend } from "@/redux/action/userAct";
import DeleteModal from "@/components/custom/modal/DeleteModal";
import { setOpenModalDelete } from "@/redux/slices/componentSlice";
import toast from "react-hot-toast";

interface FriendsListProps {
  user: User | null;
}
const FriendsList = ({ user }: FriendsListProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { openModalDelete } = useSelector(
    (state: RootState) => state.component,
    shallowEqual
  );
  const [friendId, setFriendId] = useState("");
  const onDelete = () => {
    try {
      dispatch(deleteFriend({ id: friendId }));
      toast.success("pertemanan telah terhapus");
      dispatch(setOpenModalDelete(false));
    } catch (error) {
      toast.error("Internal server Error");
    }
  };
  const onOpenModal = (id: string) => {
    dispatch(setOpenModalDelete(true));
    setFriendId(id);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto">
      {user?.friends.length === 0 && (
        <div className="w-full h-full flex flex-col items-center">
          {" "}
          <div>Anda Belum memiliki Teman</div>
        </div>
      )}
      {user?.friends.map((friend, index) => {
        return (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-3 border-b-2 py-2">
              <div>
                <Image
                  src={friend.avatar.imageUrl}
                  alt="profile-image"
                  width={70}
                  height={70}
                  className=""
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <div>{friend.username}</div>
                <button
                  type="button"
                  className="px-2 py-1 text-white bg-red-400 rounded-lg"
                  onClick={() => onOpenModal(friend._id)}
                >
                  Hapus Pertemanan
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {openModalDelete && (
        <DeleteModal
          onClick={onDelete}
          text="Apakah anda yakin ingin menghapus pertemanan ?"
        />
      )}
    </div>
  );
};

export default FriendsList;
