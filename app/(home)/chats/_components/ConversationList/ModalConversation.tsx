import { motion } from "framer-motion";
import { ArrowLeftFromLine } from "lucide-react";
import { Profile } from "./ModalItem/Profile";
import AddFriend from "./ModalItem/AddFriend";
import FriendRequest from "./ModalItem/FriendRequest";
import { User } from "@/types/user";

interface ModalConversationProps {
  setOpenModal: (openProfile: boolean) => void;
  title: string;
  setTitle: (n: string) => void;
  user: User | null;
}

const ModalConversation = ({
  setOpenModal,
  title,
  setTitle,
  user,
}: ModalConversationProps) => {
  const handleClose = () => {
    setOpenModal(false);
    setTitle("");
  };

  return (
    <motion.div
      className="w-full h-full bg-white absolute z-[10]"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      {/* header  */}
      <div className="w-full h-[100px] bg-[#36a8ff] relative">
        <ArrowLeftFromLine
          size={30}
          color="white"
          className="absolute top-1 left-1 cursor-pointer"
          onClick={handleClose}
        />
        <span className="absolute bottom-1 flex w-full justify-center text-xl font-medium text-white">
          {title}
        </span>
      </div>
      {/* body section  */}
      {title === "Profile" && <Profile user={user} />}
      {title === "Tambah Teman" && <AddFriend user={user} />}
      {title === "Permintaan Pertemanan" && <FriendRequest user={user} />}
    </motion.div>
  );
};

export default ModalConversation;
