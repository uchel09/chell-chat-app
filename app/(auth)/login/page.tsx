"use client";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { login } from "@/redux/action/authAct";
import { redirect, useRouter } from "next/navigation";

export function LoginPage() {
  const {authLoading,user} = useSelector(
    (state: RootState) => state.auth,
    shallowEqual
  );

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      redirect("/chats");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result: any = await dispatch(login({ email, password }));
      if (result?.success === true) {
        setEmail("");
        setPassword("");

        router.push("/chats");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <div className="mb-12 md:mb-0 hidden md:block md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full "
              alt="Phone image" />
          </div>

          {/* <!-- Right column container with form --> */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <h1 className="font-bold text-[30px] w-full text-center mb-4">
              𝖈𝖍𝖊𝖑𝖑chats
            </h1>
            <form onSubmit={onLogin}>
              <div className="w-full flex flex-col">
                <label htmlFor="email" className="font-bold text-sm">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="w-full px-2 py-1 border-2 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
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
                  onChange={(e) => setPassword(e.target.value)} />
              </div>

              {/* <!-- Remember me checkbox --> */}
              <div className="mb-6 flex items-center justify-between">
                {/* <!-- Forgot password link --> */}
                <a href="#!" className="text-blue-500 hover:text-blue-600">
                  Forgot password?
                </a>
              </div>

              {/* <!-- Submit button --> */}
              <div className="w-full mb-5">
                dont have any account?{" "}
                <Link href="/register" className="text-blue-500">
                  Register here
                </Link>
              </div>
              <button
                disabled={authLoading}
                className={`w-full bg-black hover:shadow-lg py-2 text-white rounded-lg`}
                type="submit"
              >
                {authLoading ? "loading..." : "login"}
              </button>

              {/* <!-- Divider --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              {/* <!-- Social login buttons --> */}
              <button
                className="w-full bg-white py-1 rounded-sm hover:shadow-lg font-bold   gap-4 border-2 flex items-center justify-center"
                disabled={authLoading}
                type="button"
              >
                <Image
                  width={30}
                  height={30}
                  alt="google"
                  className="mr-4"
                  src="/google.svg" />
                <span>Continue with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
