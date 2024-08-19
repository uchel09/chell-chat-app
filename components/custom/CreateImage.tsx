/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, ChangeEvent } from "react";
import { GalleryVertical } from "lucide-react";
import CropPhoto from "./CropPhoto";
import { readFile } from "fs";

interface CreateMediaProps {
  setOpenCreate: (open: boolean) => void;
}

const CreateMedia: React.FC<CreateMediaProps> = ({ setOpenCreate }) => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [content, setContent] = useState("");

  const [image, setImage] = useState<string>("");

  // Helper function to read file as data URL
  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    let newMediaFiles: File[] = [];
    let newImage: string = "";
    let err = "";

    for (const file of files) {
      if (!file) {
        err = "File doesn't exist";
        continue;
      }
      if (file.size > 1024 * 1024 * 6) {
        err = "File size exceeds 6 MB";
        continue;
      }

      if (file.type.match(/video/)) {
        newMediaFiles.push(file);
      } else {
        try {
          newImage = await readFile(file);
        } catch (error) {
          err = "Failed to read the image file";
        }
      }
    }

    if (err) {
      alert(err);
    } else {
      setMediaFiles((prevFiles) => [...prevFiles, ...newMediaFiles]);
      setImage(newImage);
    }
  };
  const handleCropComplete = (croppedAreaPixels: any) => {
    return;
  };

  const deleteImage = (index: any) => {
    const newArr = [...mediaFiles];
    newArr.splice(index, 1);
    setMediaFiles(newArr);
  };

  return (
    <div className="bg-transparent flex mx-auto flex-col absolute justify-center items-center left-0 right-0 top-0 bottom-0">
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-black opacity-50 flex mx-auto flex-col justify-center items-center"></div>
      <div className="w-[60vw] h-[70vh] bg-white relative flex p-2 rounded-2xl">
        <span
          onClick={() => setOpenCreate(false)}
          className="absolute -top-3 -right-2 p-2 rounded-full bg-red-400 w-8 h-8 flex items-center justify-center text-white cursor-pointer"
        >
          X
        </span>

        <div className="w-[50%] h-full flex flex-col items-center justify-center">
          {image ? (
            <CropPhoto
              image={image}
              setMediaFiles={setMediaFiles}
              onCropComplete={handleCropComplete}
              setImage={setImage}
            />
          ) : (
            <div className="overflow-hidden relative cursor-pointer">
              <GalleryVertical size={23} className="cursor-pointer" />
              <span>Upload Gambar/video</span>
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*,video/*"
                onChange={handleChangeImage}
                className="absolute top-0 left-0 opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
        <form action="" className="w-[50%] flex flex-col">
          <div>
            <textarea
              name="content"
              id="content"
              value={content}
              placeholder={`What are you thinking now ?`}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[120px] border border-black rounded-lg px-2 py-1 focus:border-black"
            ></textarea>
          </div>
          <div className="flex flex-col w-full h-[300px] overflow-y-auto">
            <div className="flex flex-wrap mt-4">
              {mediaFiles.map((file, index) =>
                file.type.match(/video/) ? (
                  <div className="relative" key={index}>
                    <video
                      controls
                      src={URL.createObjectURL(file)}
                      className="m-2 max-w-[100px] max-h-[100px]"
                    />
                    <span
                      className="absolute cursor-pointer right-0 top-0 w-5 h-5 flex items-center justify-center rounded-full text-white bg-red-400"
                      onClick={() => deleteImage(index)}
                    >
                      x
                    </span>
                  </div>
                ) : (
                  <div className="relative" key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`media-${index}`}
                      className="m-2 max-w-[100px] max-h-[100px]"
                    />
                    <span
                      className="absolute cursor-pointer right-0 top-0 w-5 h-5 flex items-center justify-center rounded-full text-white bg-red-400"
                      onClick={() => deleteImage(index)}
                    >
                      x
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMedia;
