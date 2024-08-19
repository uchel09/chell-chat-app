import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/redux/action/userAct";
import { AppDispatch } from "@/redux/store";
import { requestFriends } from "@/static/requestData";
import { User } from "@/types/user";
import Image from "next/image";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface FriendRequestProps {
  user: User | null;
}

const FriendRequest = ({ user }: FriendRequestProps) => {
  const dispatch: AppDispatch = useDispatch();

  const onConfirm = async (requestId: string) => {
    try {
      await dispatch(acceptFriendRequest({ id: requestId }));
      toast.success("Sekarang kalian berteman");
    } catch (error) {
      toast.error("Internal server error");
    }
  };
  const onReject = async (requestId: string) => {
    await dispatch(rejectFriendRequest({ id: requestId }));
  };
  return (
    <div className="w-full h-full flex flex-col py-2 ">
      {user?.friendRequestsReceived.map((request, index) => (
        <div
          key={index}
          className="flex w-full py-2 gap-7 border-b-2 items-center"
        >
          <div className="border-2 rounded-full">
            <Image
              src={request.sender.avatar.imageUrl}
              alt="profile-image"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>{request.sender.username}</p>
            <div className="flex gap-2">
              <button
                onClick={() => onConfirm(request._id)}
                type="button"
                className="px-3 py-1 bg-[#36a8ff] border-[#36a8ff] text-white hover:shadow-lg active:px-2 active:mx-1  rounded-lg border-2"
              >
                Konfirmasi
              </button>
              <button
                onClick={() => onReject(request._id)}
                type="button"
                className="px-3 py-1  rounded-lg border-2 border-black hover:shadow-lg active:px-2 active:mx-1"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
