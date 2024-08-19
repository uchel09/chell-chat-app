"use client";

import {
  cancelFriendRequest,
  searchNewUser,
  sendFriendRequest,
} from "@/redux/action/userAct";
import { AppDispatch, RootState } from "@/redux/store";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import toast from "react-hot-toast";
import { User } from "@/types/user";

interface AddFriendProps {
  user: User | null;
}

const AddFriend = ({ user }: AddFriendProps) => {
  const [search, setSearch] = useState<string>("");
  const token = useSelector((state: RootState) => state.auth.token);
  const { users, loadingUsers } = useSelector(
    (state: RootState) => state.user,
    shallowEqual
  );
  const dispatch: AppDispatch = useDispatch();
  const [sendLoading, setSendLoading] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        dispatch(searchNewUser({ username: search, token }));
      }
    }, 1500);
    return () => {
      clearTimeout(handler);
    };
  }, [search, dispatch, token]);

  const handleSentRequest = async (
    receiverId: string,
    isRequestSent: boolean | undefined
  ) => {
    try {
      if (!isRequestSent) {
        setSendLoading(true);
        const result = await dispatch(sendFriendRequest({ id: receiverId }));
        toast.success("Perimintaan dikirim");
      } else {
        setSendLoading(true);
        const result = await dispatch(cancelFriendRequest({ id: receiverId }));
        toast.success("Perimintaan dibatalkan");
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "Something wrong");
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white px-3">
      {/* Search -============ */}
      <div className="w-full flex items-center border-[#bae9ff] my-3 border-2 px-3 py-1 bg-white gap-2 focus-within:border-2 focus-within:border-[#50b2fd] rounded-full">
        <input
          type="text"
          className="w-full bg-transparent h-[35px] py-[2px] px-1 outline-none text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="mr-3 cursor-pointer" color="#50b2fd" />
      </div>
      {/* Search -============ */}

      {/* body ============== */}
      {loadingUsers ? (
        <div className="overflow-y-auto flex-1 flex flex-col w-full h-full bg-white py-2">
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </div>
      ) : (
        <div className="overflow-y-auto flex-1 flex flex-col w-full h-full bg-white py-2">
          {users.length > 0 &&
            users.map((searchUser, index) => {
              const isRequestSent = user?.friendRequestsSent.some(
                (request) => request.receiver === searchUser?._id
              );

              const isFriend = user?.friends.some(
                (friend) => friend._id === searchUser?._id
              );

              return (
                <div
                  key={index}
                  className="w-full border-y-2 hover:border-r-4 border-r-[#36a8ff] flex gap-5 items-center"
                >
                  <Image
                    src={searchUser?.avatar?.imageUrl}
                    alt="profile-image"
                    width={70}
                    height={70}
                  />
                  <div className=" flex flex-col">
                    <span className="font-bold">{searchUser?.username}</span>
                    <button
                      disabled={sendLoading || isFriend}
                      className={`px-3 py-1 ${
                        isFriend
                          ? "bg-gray-300 text-black border-2 border-gray-400"
                          : isRequestSent
                          ? "bg-white text-black border-2 border-black"
                          : "bg-[#36a8ff] text-white border-2 border-[#36a8ff]"
                      } rounded-sm`}
                      type="button"
                      onClick={() =>
                        !isFriend &&
                        handleSentRequest(searchUser?._id, isRequestSent)
                      }
                    >
                      {isFriend
                        ? "Teman"
                        : isRequestSent
                        ? "Batalkan Permintaan"
                        : "Tambahkan Teman"}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {/* body ============== */}
    </div>
  );
};

const UserCardSkeleton = () => {
  return (
    <div className="flex w-full px-4 h-[70px] bg-white gap-10 shadow-lg items-center border-y-2 border-2">
      <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
      <div className="flex flex-col gap-2">
        <div className="w-[120px] h-[15px] animate-pulse rounded-full bg-gray-400"></div>
        <div className="w-[200px] h-[20px] rounded-full animate-pulse bg-gray-400"></div>
      </div>
    </div>
  );
};

export default AddFriend;
