"use client";
import { Hint } from "@/components/custom/hint";
import { getMessages, sendMessage } from "@/redux/action/conversationsAct";
import { AppDispatch, RootState } from "@/redux/store";
import { Conversation, IMessages } from "@/types/conversation";
import { User } from "@/types/user";
import { Item } from "@radix-ui/react-dropdown-menu";

import {
  Video,
  Phone,
  EllipsisVertical,
  SmilePlus,
  ImagePlus,
  SendHorizontal,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Emoticon from "./_emoticon/Emoticon";
import DeleteModal from "@/components/custom/modal/DeleteModal";
import DropDownMenuConv from "./DropDown/DropdownMenuConv";
interface ConversationProps {
  conversation: Conversation | null;
  token: string;
  messages: IMessages[] | null;
  user: User | null;
}

const ConversationView = ({
  conversation,
  token,
  messages,
  user,
}: ConversationProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [text, setText] = useState("");

  const recipient = conversation?.recipients.find(
    (item) => item._id !== user?._id
  );

  useEffect(() => {
    if (token) {
      dispatch(getMessages({ token, conversationId: conversation?._id || "" }));
    }
  }, [token, conversation, dispatch]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (text) {
        dispatch(
          sendMessage({
            text,
            token,
            conversationId: conversation?._id || "",
            media: [],
            call: {},
            recipient: recipient?._id || "",
          })
        );
      }
      setText("");
    } catch (error) {
      toast.error("internal server Error");
    }
  };
  const onDelete =()=>{
    console.log("delete")
  }

  return (
    <>
      <div className="w-full bg-[#7cc6ff]  h-[60px] flex justify-between items-center px-3">
        <div className="flex gap-3">
          <div className="w-[45px] h-[45px] rounded-full bg-green-200 cursor-pointer">
            <Image
              alt="profile-image"
              src={
                recipient?.avatar.imageUrl ||
                "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1707091200&semt=ais"
              }
              width={90}
              height={90}
              className="rounded-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#fff7f7]">
              {recipient?.username}
            </span>
            <span className="text-sm text-[#fff7f7]">offline</span>
          </div>
        </div>
        {/* right menu header */}
        <div className="flex text-white gap-10 mr-5">
          <Hint label="Video Call" sideOffset={5} side="bottom">
            <Video className="cursor-pointer" />
          </Hint>
          <Hint label="call" sideOffset={5} side="bottom">
            <Phone className="cursor-pointer" />
          </Hint>
          <DropDownMenuConv side="bottom" onDelete={onDelete}>
            <button type="button" className="relative">
              <Hint label="Menu" sideOffset={5} side="bottom">
                <EllipsisVertical className="cursor-pointer" />
              </Hint>
            </button>
          </DropDownMenuConv>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto gap-10   h-full w-full  "
        style={{
          backgroundImage: `url("/bg3.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex flex-col-reverse gap-5 h-full px-4 pb-[60px] pt-[20px] overflow-y-auto">
          {/* message List =========================== */}
          {messages?.map((message, index) => {
            const isUser: boolean = user?._id === message.sender;
            const createdAt = new Date(message.createdAt);
            const options: Intl.DateTimeFormatOptions = {
              weekday: "short", // Menampilkan nama hari
              hour: "2-digit",
              minute: "2-digit",
            };

            const formattedDate = createdAt.toLocaleDateString(
              "id-ID",
              options
            );
            return (
              <div
                className={`w-full flex ${!isUser && "justify-end"}`}
                key={index}
              >
                <div
                  className={`max-w-[47%] relative bg-red pt-2 pb-4 px-3 ${
                    isUser ? "bg-[#bae9ff] order-1" : "bg-[white] order-2"
                  } shadow-xl rounded-2xl`}
                >
                  {message.text}
                  <span className="text-[12px] text-gray-500 absolute bottom-0 right-2"></span>
                </div>
                <span
                  className={`text-[12px] text-gray-500 flex h-full flex-col justify-end ${
                    isUser ? "order-2" : "order-1"
                  }`}
                >
                  {formattedDate}
                </span>
              </div>
            );
          })}

          {/* terakhir */}
          <div className="w-full flex justify-center">
            <div className="py-2 px-3 cursor-pointer bg-[#bae9ff] shadow-2xl  rounded-lg">
              Muat pesan sebelumnya
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="w-full bg-transparent px-5 rounded-lg h-[60px] absolute bottom-0 flex justify-between items-center">
        <form onSubmit={onSubmit} className="w-full flex items-center gap-4">
          <div className="w-full flex items-center border-[#bae9ff] border px-3 py-1 bg-white gap-2 focus-within:border-2 focus-within:border-[#50b2fd] rounded-full">
            <Emoticon text={text} side="top" setText={setText}>
              <button type="button">
                <SmilePlus className="mr-3 cursor-pointer" color="#50b2fd" />
              </button>
            </Emoticon>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-transparent h-[35px] py-[2px] px-1 outline-none text-base"
            />
            <ImagePlus className="mr-3 cursor-pointer" color="#50b2fd" />
          </div>
          <Hint label="Send" sideOffset={5} side="top">
            <button type="submit" className="px-5 py-1 rounded-full bg-white">
              <SendHorizontal className="text-[#50b2fd]" size={30} />
            </button>
          </Hint>
        </form>
      </div>
    </>
  );
};

export default ConversationView;
