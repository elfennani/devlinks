import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Tab from "../components/UI/Tab";
import Button from "../components/UI/Button";
import Preview from "../components/Preview";
import { DraftProvider } from "../context/draft";
import SaveButton from "../components/SaveButton";
import shortUUID from "short-uuid";

const HomeLayout = () => {
  const { data } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!data?.data?.user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <DraftProvider>
      <main className="bg-graphite-light h-dvh overflow-hidden md:p-6 grid grid-rows-[auto_1fr] gap-6">
        <header className="p-4 pl-6 bg-white rounded-xl flex justify-between items-center">
          <img
            src="/images/logo-devlinks-large.svg"
            className="h-8 hidden md:block"
            alt="DevLinks Logo"
          />
          <img
            src="/images/logo-devlinks-small.svg"
            className="h-8 max-md:block hidden"
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
          <Button
            label="Preview"
            icon="ph:eye-bold"
            onClick={() =>
              navigate(
                `/link/${shortUUID().fromUUID(data.data.user?.id!!)}?preview`
              )
            }
          />
        </header>
        <div className="lg:grid max-md:p-4 max-md:pt-0 grid-cols-[512px_1fr] gap-6">
          <div className="p-4 bg-white hidden rounded-xl h-0 min-h-full lg:flex items-center justify-center overflow-y-auto">
            <Preview />
          </div>
          <div className="grid max-lg:h-full grid-rows-[1fr_auto] bg-white rounded-xl">
            <div className="p-6 md:p-10 overflow-y-auto h-0 min-h-full">
              <DraftProvider.Consumer>
                {([{ isLoadingProfile, isLoadingLinks }]) =>
                  isLoadingProfile || isLoadingLinks ? (
                    <div className="w-full h-full rounded-xl bg-graphite-light animate-pulse" />
                  ) : (
                    <Outlet />
                  )
                }
              </DraftProvider.Consumer>
            </div>
            <hr />
            <div className="px-10 py-6 max-md:p-4 flex justify-end max-md:flex-col max-md:justify-stretch">
              <SaveButton />
            </div>
          </div>
        </div>
      </main>
    </DraftProvider>
  );
};

export default HomeLayout;
