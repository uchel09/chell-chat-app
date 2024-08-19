"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/action/authAct";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

interface ProfilePhotoDropDownProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

const ProfilePhotoDropDown = ({ children, side, sideOffset }: ProfilePhotoDropDownProps) => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.auth.authLoading,
    shallowEqual
  );
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result: any = await dispatch(logout(""));
      if (result?.success === true) {
        toast.success("Logout success");
        router.push("/login");
      }
    } catch (error) {
      toast.error("something wrong");
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem>Lihat Foto</DropdownMenuItem>
        <DropdownMenuItem>Unggah Foto</DropdownMenuItem>
        <DropdownMenuItem>Hapus Foto</DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilePhotoDropDown;
