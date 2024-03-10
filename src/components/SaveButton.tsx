import { useMutation } from "@tanstack/react-query";
import { DraftLink, useDraftState } from "../context/draft";
import supabase from "../services/supabase";
import Button from "./UI/Button";
import { Database } from "../services/types";
import useUser from "../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LinkInsert = Database["public"]["Tables"]["links"]["Insert"];

const SaveButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    links,
    isLoadingLinks,
    isLoadingProfile,
    profile: { firstName, lastName, email },
    error: draftError,
    file,
    modified,
  } = useDraftState();
  const { data } = useUser();
  const { mutate, isPending } = useMutation({
    mutationKey: ["links", "save"],
    mutationFn: async () => {
      if (!data) throw new Error("User not loaded in yet");

      if (isLoadingLinks || isLoadingProfile || !!draftError) {
        throw new Error("Data not loaded in yet");
      }

      const {
        data: { user },
      } = data;
      if (!user) throw new Error("User not logged in");

      if (!firstName?.trim() || !lastName?.trim()) {
        if (location.pathname != "/profile") navigate("/profile");

        throw new Error("First name and last name are required");
      }

      links.forEach((link) => {
        const { appLink, value } = link;
        if (value.trim() == "") {
          throw new Error(`${appLink.name} link can’t be empty`);
        }
        if (
          appLink.regex.length != 0 &&
          !appLink.regex.find((regex) => regex.test(value))
        ) {
          throw new Error(`${appLink.name} link pattern doesn't match`);
        }
      });

      const mapLinks: LinkInsert[] = links.map((link: DraftLink) => ({
        user_id: user.id,
        name: link.appLink.name,
        link: link.value,
        order: link.id,
      }));

      if (!!file) {
        const { error: avatarError } = await supabase.storage
          .from("avatars")
          .upload(`/${user.id}`, file, {
            contentType: file.type,
            upsert: true,
          });

        if (avatarError) throw new Error(avatarError.message);
      }
      const { error } = await supabase.from("links").upsert(mapLinks);
      if (error) throw new Error(error.message);

      const { error: profileError } = await supabase.from("profile").upsert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        email,
      });
      if (profileError) throw new Error(profileError.message);
    },
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Saved Successfully"),
  });

  return (
    <div className="flex items-center max-md:flex-col max-md:items-stretch md:justify-end w-full gap-8">
      <Button
        label="Save"
        primary
        disabled={
          isPending ||
          isLoadingLinks ||
          isLoadingProfile ||
          !!draftError ||
          !modified
        }
        onClick={() => mutate()}
      />
    </div>
  );
};

export default SaveButton;
