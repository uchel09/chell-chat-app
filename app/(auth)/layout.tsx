const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full h-[100vh] overflow-y-auto ">{children}</main>;
};

export default AuthLayout;
