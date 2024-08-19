"use client";

import { getCroppedImg } from "@/lib/CropImage";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

interface CropPhotoProps {
  image: string;
  onCropComplete: (croppedAreaPixels: any) => void;
  setImage: (image: string) => void;
  setMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const CropPhoto: React.FC<CropPhotoProps> = ({
  image,
  onCropComplete,
  setImage,
  setMediaFiles,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [aspect, setAspect] = useState(4 / 4);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onCropCompleteInternal = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  return (
    <div className="bg-transparent flex mx-auto flex-col w-full h-full justify-center items-center">
      <div className="w-[90%] relative h-[50vh]">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteInternal}
          onZoomChange={setZoom}
        />
        <div
          className="absolute z-10 cursor-pointer bottom-[150px] left-1 p-1 bg-white rounded-full"
          onClick={() => setAspect(4 / 4)}
        >
          <span>4:4</span>
        </div>
        <div
          className="absolute z-10 cursor-pointer bottom-[100px] left-1 p-1 bg-white rounded-full"
          onClick={() => setAspect(4 / 5)}
        >
          <span>4:5</span>
        </div>
        <div
          className="absolute z-10 cursor-pointer bottom-[50px] left-1 p-1 bg-white rounded-full"
          onClick={() => setAspect(16 / 9)}
        >
          <span>16:9</span>
        </div>
      </div>
      <div>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </div>
      <div className="flex gap-5">
        <button
          className="px-4 py-2 bg-green-500 rounded-lg text-white cursor-pointer"
          onClick={() =>
            getCroppedImg(image, croppedAreaPixels).then(
              (croppedImage: File) => {
                
                setMediaFiles((prevImages) => [...prevImages, croppedImage]);
                setImage("");
              }
            )
          }
        >
          Crop
        </button>
        <button
          className="px-4 py-2 bg-white border rounded-lg text-black cursor-pointer"
          onClick={() => setImage("")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CropPhoto;
