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
import { setOpenModalFriends } from "@/redux/slices/componentSlice";

interface DropDownProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

const DropDownMenu = ({ children, side, sideOffset }: DropDownProps) => {
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
  const onOpenModalFriends: any = () => {
    dispatch(setOpenModalFriends(true));
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={onOpenModalFriends}
        >
          Lihat Daftar Teman
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Pengaturan
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
          onClick={handleLogout}
          disabled={loading}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;
