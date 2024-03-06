import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

type Props = {};

function AuthLayout({}: Props) {
  const { data } = useUser();

  if (!!data?.data.user) return <Navigate to="/" replace />;

  return (
    <main className="bg-graphite-light min-h-dvh flex flex-col gap-16 sm:gap-14 items-start max-sm:p-8 sm:items-center sm:justify-center">
      <img
        src="/images/logo-devlinks-large.svg"
        className="h-10"
        alt="DevLinks Logo"
      />
      <div className="sm:p-10 rounded-xl max-w-full sm:bg-white w-[476px]">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
