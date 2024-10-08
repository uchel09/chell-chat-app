"use client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";


const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        {children}
      </Provider>
    </>
  );
};

export default ClientProvider;
