import { Icon } from "@iconify/react/dist/iconify.js";
import { useDraftState } from "../context/draft";
import supabase from "../services/supabase";
import useUser from "../hooks/useUser";
import useImageFile from "../hooks/useImageFile";

type Props = {};

const Preview = (_props: Props) => {
  const {
    links,
    profile: { firstName, lastName, email },
    file,
  } = useDraftState();
  const { data } = useUser();
  const avatar = useImageFile(file);

  const placeholders = () => {
    const elements = [];
    for (let i = 0; i < 5 - links.length; i++) {
      elements.push(
        <div key={i} className="h-10 w-full bg-neutral-100 rounded-lg" />
      );
    }

    return elements;
  };

  return (
    <div className="w-72 max-w-full max-h-full">
      <div className="relative z-20 pt-[205%] h-0 overflow-hidden rounded">
        <img
          className="absolute -z-10 top-0 left-0 right-0 bottom-0"
          src="/images/preview-section.svg"
        />
        <div className="absolute px-8 py-16 top-0 left-0 right-0 bottom-0 flex flex-col items-stretch gap-10 overflow-hidden">
          <div className="flex flex-col gap-6 items-center">
            <img
              src={
                avatar ||
                supabase.storage
                  .from("avatars")
                  .getPublicUrl(`/${data?.data.user?.id}`).data.publicUrl
              }
              className="size-24 rounded-full bg-neutral-100 object-cover border-2 border-primary-bold"
            />
            <div className="flex flex-col gap-1 w-full items-center text-base-s">
              <div className="flex w-full items-center justify-center gap-2 text-heading-s text-xl">
                {firstName || (
                  <div className="w-2/5 h-4 rounded-full bg-neutral-100" />
                )}{" "}
                {lastName || (
                  <div className="w-1/3 h-4 rounded-full bg-neutral-100" />
                )}
              </div>
              {!!email && <span className="text-graphite-bold">{email}</span>}
              {!email && (
                <div className="w-2/5 h-2 rounded-full bg-neutral-100" />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {links.slice(0, 5).map(({ appLink }) => (
              <div
                className="h-10 w-full rounded-lg text-white flex justify-between items-center px-3"
                style={{ backgroundColor: appLink.color }}
                key={appLink.name}
              >
                <div className="flex items-center gap-2 text-base-s">
                  <Icon icon={appLink.icon} fontSize={16} />
                  {appLink.name}
                </div>
                <Icon icon="mdi:arrow-right" fontSize={16} />
              </div>
            ))}
            {links.length > 5 && (
              <p className="text-center text-base-s opacity-50">
                + {links.length - 5} Links
              </p>
            )}
            {placeholders()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
