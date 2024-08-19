"use client";

import { Hint } from "@/components/custom/hint";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ProfilePhotoDropDown from "./ProfilPhotoDropDown";

interface ProfileProps {
  user: any;
}

export const Profile = ({ user }: ProfileProps) => {
  const [username, setUsername] = useState<string>(user?.username);
  const [bio, setBio] = useState<string>();
  const [link, setLink] = useState<string>();


  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Foto Profil */}
      <div className="w-full py-2 flex items-center justify-center bg-gray-200">
        <ProfilePhotoDropDown side="right">
          <button
            type="button"
            className="hover:bg-white hover:opacity-70 rounded-full"
          >
            <Hint side="right" label="Ganti Foto">
              <Image
                src={user?.avatar?.imageUrl}
                alt="profil-image"
                width={150}
                height={150}
                className="rounded-full cursor-pointer"
              />
            </Hint>
          </button>
        </ProfilePhotoDropDown>
      </div>
      {/* User Name */}
      <div className="w-full px-3 h-full overflow-y-auto">
        <div className="flex flex-col w-full mt-2 py-2 px-2  shadow-lg ">
          <label htmlFor="" className="font-bold">
            Username :
          </label>
          <input
            type="text"
            className="w-full py-1 px-2 border-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mt-2 py-2 px-2  shadow-lg ">
          <label htmlFor="" className="font-bold">
            Link Web :
          </label>
          <input
            type="text"
            className="w-full py-1 px-2 border-2 rounded-lg"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mt-2 py-2 px-2  shadow-lg ">
          <label htmlFor="" className="font-bold">
            {" "}
            Bio :
          </label>
          <textarea
            className="w-full py-1 px-2 border-2 rounded-lg"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
