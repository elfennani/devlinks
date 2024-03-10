import { Navigate, useParams, useSearchParams } from "react-router-dom";
import shortUUID from "short-uuid";
import supabase from "../services/supabase";
import { useQuery } from "@tanstack/react-query";
import links from "../links";
import { Icon } from "@iconify/react/dist/iconify.js";
import useUser from "../hooks/useUser";
import Button from "../components/UI/Button";
import useTitle from "../hooks/useTitle";

const PreviewPage = () => {
  const { uid } = useParams();
  const [params] = useSearchParams();
  const isPreview = params.has("preview");
  const { data: userData, isLoading: isLoadingUser } = useUser(isPreview);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile", uid],
    queryFn: async () => {
      if (!uid) throw new Error("No UUID provided");
      const uuid = shortUUID().toUUID(uid);

      await supabase.auth.initialize();
      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select()
        .eq("id", uuid);
      const { data: linksData, error: linksError } = await supabase
        .from("links")
        .select()
        .eq("user_id", uuid);

      if (profileError || linksError) {
        throw new Error(profileError?.message || linksError?.message);
      }

      return {
        links: linksData,
        profile: profileData[0],
      };
    },
    enabled: !!uid,
  });
  useTitle(
    data
      ? `${data.profile.first_name} ${data.profile.last_name}`
      : "DevLinks - Profile"
  );

  if (!uid) return <Navigate to="/" />;
  const uuid = shortUUID().toUUID(uid);

  if (isLoading || (isPreview && isLoadingUser)) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="relative md:flex flex-col items-center justify-center min-h-svh md:p-4">
      <div className="absolute top-0 left-0 -z-10 right-0 h-96 bg-primary-bold max-md:hidden rounded-b-[2rem]" />
      {isPreview && !!userData?.data.user && (
        <div className="md:absolute flex justify-between gap-4 top-6 left-6 right-6 bg-white rounded-xl p-4">
          <Button label="Back to Editor" className="max-md:flex-1" />
          <Button label="Share Link" primary className="max-md:flex-1" />
        </div>
      )}
      <div className="flex flex-col gap-14 p-4 md:my-32 bg-white max-md:min-h-svh md:shadow-list md:rounded-3xl md:w-[400px] px-14 py-12 max-w-full">
        <div className="flex flex-col items-center gap-6">
          <img
            src={
              supabase.storage.from("avatars").getPublicUrl(`/${uuid}`).data
                .publicUrl
            }
            className="size-28 border-4 border-primary-bold rounded-full bg-neutral-100 object-cover self-center"
          />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-heading-m text-center">
              {data?.profile.first_name} {data?.profile.last_name}
            </h1>
            {!!data?.profile.email && (
              <p className="text-graphite-bold">{data.profile.email}</p>
            )}
          </div>
        </div>
        <ul className="flex flex-col gap-5">
          {data?.links.map((link) => {
            const { color, icon } = links.find((l) => l.name == link.name)!!;
            return (
              <li className="w-full" key={link.name}>
                <a
                  href={link.link}
                  style={{
                    backgroundColor: color,
                  }}
                  className="p-4 w-full text-white rounded-xl text-base-m flex items-center gap-2"
                >
                  <Icon icon={icon} fontSize={20} />
                  <span className="flex-1 text-start">{link.name}</span>
                  <Icon icon="mdi:arrow-right" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PreviewPage;
