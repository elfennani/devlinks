import supabase from "../../services/supabase";

const PreviewSkeleton = ({ uuid }: { uuid: string }) => {
  return (
    <div className="md:flex flex-col items-center justify-center min-h-svh md:p-4">
      <div className="flex flex-col gap-14 p-4 md:my-32 bg-white max-md:min-h-svh md:shadow-list md:rounded-3xl md:w-[400px] px-14 py-12 max-w-full">
        <img
          src={
            supabase.storage.from("avatars").getPublicUrl(`/${uuid}`).data
              .publicUrl
          }
          className="size-28 border-4 border-primary-bold rounded-full bg-neutral-100 object-cover self-center"
        />
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-72 bg-graphite-light rounded-lg animate-pulse" />
          <div className="h-4 w-52 bg-graphite-light rounded-md"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-12 w-full bg-graphite-light rounded-lg animate-pulse" />
          <div className="h-12 w-full bg-graphite-light rounded-lg animate-pulse" />
          <div className="h-12 w-full bg-graphite-light rounded-lg animate-pulse" />
          <div className="h-12 w-full bg-graphite-light rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PreviewSkeleton;
