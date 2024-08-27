"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
interface EmoticonProps {
  text: string;
  setText: (text: string) => void;

  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}
 

const Emoticon = ({
  text,
  setText,

  children,
  side,
  sideOffset,
}: EmoticonProps) => {
  const emoticons: string[] = [
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🥸",
    "🤩",
    "👋",
    "🤚",
    "🖐",
    "✋",
    "🖖",
    "👌",
    "🤌",
    "🤏",
    "✌️",
    "🤞",
    "😡",
    "🤬",
    "👻",
    "💀",
    "☠️",
    "😩",
    "🥺",
    "😢",
  ];

   const handleClick = (item:string) => {
     // Misalnya, tambahkan emoticon pada teks
     const newText = text + item;
     setText(newText); // Panggil setText dengan teks yang diperbarui
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
        {emoticons.map((item, index) => (
          <span key={index} className="cursor-pointer" onClick={()=>handleClick(item)} >{item}</span>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Emoticon;
