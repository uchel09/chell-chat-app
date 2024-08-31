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

interface DropDownMessageProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  onDelete: () => void;
}

const DropDownMessage = ({
  children,
  side,
  sideOffset,
  onDelete,
}: DropDownMessageProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60"
      >
        <DropdownMenuItem className="cursor-pointer" onClick={onDelete}>
          Hapus Pesan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMessage;
