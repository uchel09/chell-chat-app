"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ChatsLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const loginSession = localStorage.getItem("login");
      if (!loginSession) {
        router.push("/login");
      }
    }
  }, [isClient, router]);

  if (!isClient) {
    return null; // Or you can return a loading indicator here
  }

  return (
    <main className="w-full h-[100vh] bg-gradient-to-b bg-[#50b2fd] to-white flex items-center justify-center">
      <div className="w-[98%] h-[94vh] bg-white rounded-lg">{children}</div>
    </main>
  );
};

export default ChatsLayout;
