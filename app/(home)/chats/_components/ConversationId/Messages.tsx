import { IMessages } from "@/types/conversation";
import { User } from "@/types/user";
import React from "react";
import DropDownMessage from "./DropDown/DropDownMessage";
import { deleteMessageById } from "@/redux/action/conversationsAct";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
interface MessagesComponentProps {
  messages: IMessages[] | null;
  user: User | null;
}

const MessagesComponent = ({ messages, user }: MessagesComponentProps) => {
  const dispatch: AppDispatch = useDispatch();
  const onDelete = async (messageId: string, recipient:string) => {

    await dispatch(deleteMessageById({ messageId, recipient }));
  };
  return (
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

        const formattedDate = createdAt.toLocaleDateString("id-ID", options);
        return (
          <div
            className={`w-full flex ${!isUser && "justify-end"}`}
            key={index}
          >
            {isUser ? (
              <DropDownMessage
                onDelete={() => onDelete(message._id,message.recipient)}
                side="top"
              >
                <button
                  type="button"
                  className={`max-w-[47%] relative bg-red pt-2 pb-4 px-3 cursor-pointer ${
                    isUser ? "bg-[#bae9ff] order-1" : "bg-[white] order-2"
                  } shadow-xl rounded-2xl`}
                >
                  {message.text}
                  <span className="text-[12px] text-gray-500 absolute bottom-0 right-2"></span>
                </button>
              </DropDownMessage>
            ) : (
              <div
                className={`max-w-[47%] relative bg-red pt-2 pb-4 px-3 ${
                  isUser ? "bg-[#bae9ff] order-1" : "bg-[white] order-2"
                } shadow-xl rounded-2xl`}
              >
                {message.text}
                <span className="text-[12px] text-gray-500 absolute bottom-0 right-2"></span>
              </div>
            )}
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
  );
};

export default MessagesComponent;
