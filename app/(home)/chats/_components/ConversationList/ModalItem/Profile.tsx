"use client";

import { Hint } from "@/components/custom/hint";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { updateProfile } from "@/redux/action/userAct";

interface ProfileProps {
  user: any;
}

export const Profile = ({ user }: ProfileProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState<string>(user?.avatar?.imageUrl);
  const [username, setUsername] = useState<string>(user?.username);
  const [bio, setBio] = useState<string>(user?.bio);
  const [link, setLink] = useState<string>(user?.link);
  const [avatar, setAvatar] = useState<File>();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImgUrl(URL.createObjectURL(file));
      setAvatar(file);
    }
  };

  const editProfile = async () => {
    let res;
    setLoading(true);
    if (avatar) {
      [res] = await uploadToCloudinary([avatar]);
    }
    dispatch(
      updateProfile({
        link,
        bio,
        avatar: { imageUrl: res?.imageUrl, publicId: res?.publicId },
      })
    );
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Foto Profil */}
      <div className="w-full py-2 flex items-center justify-center bg-gray-200">
        <button
          type="button"
          className="hover:bg-white hover:opacity-70 rounded-full"
          onClick={() => document.getElementById("fileInput")?.click()}
          disabled={loading}
        >
          <Hint side="right" label="Ganti Foto">
            <Image
              src={imgUrl}
              alt="profil-image"
              width={150}
              height={150}
              className="object-cover rounded-full cursor-pointer w-[120px] h-[120px]"
            />
          </Hint>
        </button>

        {/* Hidden File Input */}
        <input
          id="fileInput"
          type="file"
          className="hidden" // Hide the input
          onChange={(e) => handleFileChange(e)} // Handle file selection
        />
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
        <button
          disabled={loading}
          type="button"
          onClick={editProfile}
          className="bg-blue-400 hover:bg-blue-500 w-full py-2 mt-2  rounded-xl text-white"
        >
          {loading ? "Loading..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};
