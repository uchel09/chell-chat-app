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
// import { logout } from "@/redux/action/authAct";


// import { useRouter } from "next/navigation";
// import { setOpenModalFriends } from "@/redux/slices/componentSlice";

interface DropDownProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  onDelete :()=>void
}

const DropDownMenuConv = ({ children, side, sideOffset,onDelete }: DropDownProps) => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.auth.authLoading,
    shallowEqual
  );
 
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
          onClick={onDelete}

        >
          Hapus percakapan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuConv;
