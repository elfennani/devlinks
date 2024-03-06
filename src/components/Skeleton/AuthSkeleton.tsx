const AuthSkeleton = () => {
  return (
    <main className="bg-graphite-light min-h-dvh flex flex-col gap-16 sm:gap-14 items-start max-sm:p-8 sm:items-center sm:justify-center">
      <div className="h-10 w-48 bg-graphite-normal rounded-lg animate-pulse" />
      <div className="sm:p-10 rounded-xl max-w-full sm:bg-white w-[476px]">
        <div className="flex flex-col gap-10">
          <header className="flex flex-col gap-2">
            <div className="h-10 w-56 bg-graphite-normal rounded-lg animate-pulse" />
            <div className="h-5 bg-graphite-normal animate-pulse w-40 rounded" />
          </header>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-graphite-normal animate-pulse w-24 rounded" />
              <div className="h-12 w-full rounded-lg bg-graphite-normal animate-pulse" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-5 bg-graphite-normal animate-pulse w-16 rounded" />
              <div className="h-12 w-full rounded-lg bg-graphite-normal animate-pulse" />
            </div>
            <div className="h-5 bg-graphite-normal animate-pulse w-48 rounded" />
            <div className="h-12 w-full rounded-lg bg-graphite-normal animate-pulse" />
            <div className="h-5 bg-graphite-normal animate-pulse w-48 rounded self-center" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthSkeleton;
