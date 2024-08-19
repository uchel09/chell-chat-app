"use client";
import {
  EllipsisVertical,
  ImagePlus,
  SendHorizontal,
  SmilePlus,
  UserPlus,
  UsersRound,
} from "lucide-react";
import Image from "next/image";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModalConversation from "./_components/ConversationList/ModalConversation";
import { Hint } from "@/components/custom/hint";
import DropDownMenu from "./_components/ConversationList/DropDownMenu";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/user";
import FriendModal from "@/components/custom/modal/FriendModal";
import FriendsList from "./_components/ConversationList/ModalItem/friendList";
import ConversationList from "./_components/ConversationList/ConversationList";
import ConversationView from "./_components/ConversationId/Conversation";

const ChatsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const { token, user } = useSelector(
    (state: RootState) => state.auth,
    shallowEqual
  );
  const { openModalFriends } = useSelector(
    (state: RootState) => state.component,
    shallowEqual
  );
  const { conversation, conversations, messages } = useSelector(
    (state: RootState) => state.conversation,
    shallowEqual
  );

  const isFriendRequestReceived =
    user?.friendRequestsReceived && user.friendRequestsReceived.length > 0;

  const handleOpenModal = (n: string) => {
    setOpenModal(true);
    setTitle(n);
  };

  return (
    <div className="flex w-full h-full">
      {/* Conversation List ================================= */}
      <div className="w-[33%] bg-white rounded-lg overflow-hidden shadow-xl border-r-2 border-[#b0b0b0] relative flex flex-col">
        <AnimatePresence>
          {openModal && (
            <ModalConversation
              user={user}
              setOpenModal={setOpenModal}
              title={title}
              setTitle={setTitle}
            />
          )}
        </AnimatePresence>
        {/* Header Conversation List  */}
        <div className="w-full bg-[#7cc6ff] h-[60px] flex justify-between items-center px-3">
          {/* profile  */}
          <Hint label="profile" sideOffset={5} side="right">
            <div
              className="w-[45px] h-[45px] rounded-full bg-green-200 cursor-pointer"
              onClick={() => handleOpenModal("Profile")}
            >
              <Image
                alt="profile-image"
                src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1707091200&semt=ais"
                width={90}
                height={90}
                className="rounded-full object-contain"
              />
            </div>
          </Hint>
          {/* right menu header  */}
          <div className="flex gap-10 mr-3 text-[#fff7f7]">
            <Hint label="Tambah Teman" sideOffset={5} side="bottom">
              <UserPlus
                className="cursor-pointer"
                onClick={() => handleOpenModal("Tambah Teman")}
              />
            </Hint>
            <Hint label="Permintaan Pertemanan" sideOffset={5} side="bottom">
              <div className="relative">
                <UsersRound
                  className="cursor-pointer"
                  onClick={() => handleOpenModal("Permintaan Pertemanan")}
                />
                <div
                  className={`absolute text-sm bg-red-500 ${
                    !isFriendRequestReceived && "hidden"
                  } w-4 h-4 justify-center items-center 
                rounded-full p-2 z-0 flex -right-1 -bottom-2`}
                >
                  {isFriendRequestReceived &&
                    user.friendRequestsReceived.length}
                </div>
              </div>
            </Hint>
            <DropDownMenu side="bottom">
              <button type="button">
                <Hint label="Menu" sideOffset={5} side="bottom">
                  <EllipsisVertical className="cursor-pointer" />
                </Hint>
              </button>
            </DropDownMenu>
          </div>
        </div>
        {/* Conversation List ---------------- */}
        <ConversationList
          token={token}
          conversation={conversation}
          conversations={conversations}

        />
      </div>
      {openModalFriends && (
        <FriendModal>
          {" "}
          <FriendsList user={user} />
        </FriendModal>
      )}
      {/* Conversation List Left section ==========================================*/}
      {/* Conversation Id  Right section ==========================================*/}
      <div className="w-[67%] bg-white relative flex flex-col h-[100%] shadow-xl">
        {!conversation ? (
          <div className="w-full h-full text-[40px] font-bold flex items-center justify-center">
            Welcome To Chell Chat
          </div>
        ) : (
          <ConversationView
            user={user}
            token={token}
            conversation={conversation}
            messages={messages}
          />
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
