"use client";
import { GetConversations } from "@/redux/action/conversationsAct";
import { AppDispatch, RootState } from "@/redux/store";
import { User } from "@/types/user";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  setConversation,
  updateConversations,
} from "@/redux/slices/conversationsSlice";
import { Conversation } from "@/types/conversation";
import { Root } from "postcss";

interface ConversationListProps {
  conversation: Conversation | null;
  conversations: Conversation[] | null;
  token: string;
}

const ConversationList = ({
  conversation,
  conversations,
  token,
}: ConversationListProps) => {
  const [searchChat, setSearchChat] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (token) {
        dispatch(GetConversations({ q: searchChat, token }));
      }
    }, 1500);
    return () => {
      clearTimeout(handler);
    };
  }, [dispatch, searchChat, token]);
  const handleClickConversation = (conversation: Conversation) => {
    let newConversation: Conversation = {
      ...conversation,
      unreadMessagesCount: 0,
    };
    newConversation.unreadMessagesCount = 0;
    dispatch(setConversation(conversation));

    dispatch(updateConversations(newConversation));
  };

  return (
    <div className="flex flex-col  w-full h-full ">
      <h1 className="text-xl font-bold px-4">Chats</h1>
      {/* Search -============ */}
      <div className="px-3">
        <div className="w-full  flex items-center border-[#bae9ff] my-3 border-2 px-3 py-1 bg-white gap-2 focus-within:border-2 focus-within:border-[#50b2fd] rounded-full">
          <input
            type="text"
            placeholder="Cari Chat..."
            className="w-full bg-transparent h-[35px] py-[2px] px-1 outline-none text-base"
            value={searchChat}
            onChange={(e) => setSearchChat(e.target.value)}
          />
          <Search className="mr-3 cursor-pointer" color="#50b2fd" />
        </div>
      </div>
      <div className="flex-1 flex flex-col w-full h-full bg-white overflow-y-auto ">
        {conversations?.map((item, index) => {
          const recipient = item.recipients.find(
            (recipient) => recipient._id !== user?._id
          );
          const truncatedMessage = (message: string) => {
            return message.length > 15
              ? `${message.substring(0, 15)}...`
              : message;
          };

          return (
            <div
              key={index}
              className={`flex py-2 items-center px-2 border-y-2 gap-3 relative
              ${item._id === conversation?._id && "bg-[#bae9ff]"}
              cursor-pointer hover:bg-[#bae9ff]`}
              onClick={() => handleClickConversation(item)}
            >
              <div>
                <Image
                  src={
                    recipient?.avatar.imageUrl ??
                    "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1707091200&semt=ais"
                  }
                  alt="profile-image"
                  width={70}
                  height={70}
                  className="rounded-full border-2 border-black w-[70px] h-[70px] object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 items-center h-full">
                <div className="font-bold">{recipient?.username}</div>
                <div className="font-medium text-gray-400 text-sm ">
                  {truncatedMessage(item.lastMessage)}
                </div>
              </div>
              <div
                className={`absolute right-2 bottom-2 ${
                  item.unreadMessagesCount && "bg-[#50b2fd]"
                }  text-sm text-white w-6 h-6 rounded-full flex items-center justify-center`}
              >
                {item.unreadMessagesCount || ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;
