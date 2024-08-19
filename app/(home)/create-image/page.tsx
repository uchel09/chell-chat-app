"use client";

import CreateMedia from "@/components/custom/CreateImage";
import React, { useState } from "react";

const ProfilePage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  return (
    <div className="w-full">
      <button
        className="px-3 py-1 bg-red-300 text-white"
        onClick={() => setOpenCreate(true)}
      >
        Create Media
      </button>
      {openCreate && <CreateMedia setOpenCreate={setOpenCreate} />}
    </div>
  );
};

export default ProfilePage;
