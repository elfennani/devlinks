import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";
import Tab from "../components/UI/Tab";
import Button from "../components/UI/Button";
import Preview from "../components/Preview";

const HomeLayout = () => {
  const { data } = useUser();
  const { pathname } = useLocation();

  if (!data?.data?.user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <main className="bg-graphite-light h-dvh overflow-hidden p-6 grid grid-rows-[auto_1fr] gap-6">
      <header className="p-4 pl-6 bg-white rounded-xl flex justify-between items-center">
        <img
          src="/images/logo-devlinks-large.svg"
          className="h-8"
          alt="DevLinks Logo"
        />
        <div className="flex gap-4">
          <Tab
            href="/"
            label="Links"
            icon="ph:link-bold"
            active={pathname == "/"}
          />
          <Tab
            href="/profile"
            label="Profile Details"
            icon="ph:user-circle-bold"
            active={pathname == "/profile"}
          />
        </div>
        <Button label="Preview" />
      </header>
      <div className="grid grid-cols-[512px_1fr] gap-6">
        <div className="p-4 bg-white rounded-xl h-0 min-h-full flex items-center justify-center overflow-y-auto">
          <Preview />
        </div>
        <div className="grid grid-rows-[1fr_auto] bg-white rounded-xl">
          <div className="p-10 overflow-y-auto h-0 min-h-full">
            <Outlet />
          </div>
          <hr />
          <div className="px-10 py-6 flex justify-end">
            <Button label="Save" primary />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeLayout;
