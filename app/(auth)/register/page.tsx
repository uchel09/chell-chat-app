/* eslint-disable @next/next/no-img-element */
// app/(auth)/register/page.tsx
"use client";
import { register } from "@/redux/action/authAct";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

const RegisterPage: React.FC = () => {
  const loading = useSelector(
    (state: RootState) => state.auth.authLoading,
    shallowEqual
  );
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [selectedGender, setSelectedGender] = React.useState<string>("male");
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const loginSession = localStorage.getItem("login");
  useEffect(() => {
    if (loginSession) {
      redirect("/chats");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedGender(value);
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result: any = await dispatch(
        register({ username, email, gender: selectedGender, password })
      );
      if (result?.success === true) {
        setUsername("");
        setEmail("");
        setPassword("");
        setSelectedGender("male");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left --> */}
          <div className="mb-12 md:mb-0 hidden md:block md:w-8/12 lg:w-6/12">
            <img src="/register.svg" className="w-full " alt="Phone image" />
          </div>

          {/* <!-- Right --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <h1 className="font-bold text-[30px] w-full text-center mb-4">
              𝖈𝖍𝖊𝖑𝖑𝖌𝖗𝖆𝖒
            </h1>
            <form className="mb-12" onSubmit={onRegister}>
              <div className="w-full flex flex-col">
                <label htmlFor="username" className="font-bold text-sm">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="w-full px-2 py-1 border-2 rounded-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="email" className="font-bold text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-2 py-1 border-2 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col my-2">
                <label htmlFor="gender" className="font-bold text-sm">
                  Gender
                </label>
                <div className="flex w-full gap-5">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={selectedGender === "male"}
                      onChange={handleGenderChange}
                    />
                    Male
                  </label>
                  <br />
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={selectedGender === "female"}
                      onChange={handleGenderChange}
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col mb-5">
                <label htmlFor="password" className="font-bold text-sm">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-2 py-1 border-2 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* <!-- Submit button --> */}
              <div className="w-full mb-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500">
                  Login here
                </Link>
              </div>
              <button
                disabled={loading}
                className={`w-full bg-black hover:shadow-lg py-2 text-white rounded-lg`}
                type="submit"
              >
                Register
              </button>

              {/* <!-- Divider --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              {/* <!-- Social login buttons --> */}
              <button
                disabled={loading}
                type="button"
                className="w-full bg-white py-1 rounded-sm hover:shadow-lg font-bold gap-4 border-2 flex items-center justify-center"
              >
                <Image
                  width={30}
                  height={30}
                  alt="google"
                  className="mr-4"
                  src="/google.svg"
                />{" "}
                <span>Continue with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
