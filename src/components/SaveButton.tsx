import { useMutation } from "@tanstack/react-query";
import { DraftLink, useDraftState } from "../context/draft";
import supabase from "../services/supabase";
import Button from "./UI/Button";
import { Database } from "../services/types";
import useUser from "../hooks/useUser";

type LinkInsert = Database["public"]["Tables"]["links"]["Insert"];

const SaveButton = () => {
  const { draftLinks } = useDraftState();
  const { data } = useUser();
  const { mutate, isPending } = useMutation({
    mutationKey: ["links", "save"],
    mutationFn: async () => {
      if (!data) throw new Error("User not loaded in yet");
      const {
        data: { user },
      } = data;
      if (!user) throw new Error("User not logged in");

      const mapLinks: LinkInsert[] = draftLinks.map((link: DraftLink) => ({
        user_id: user.id,
        name: link.appLink.name,
        link: link.value,
      }));

      const { error } = await supabase.from("links").upsert(mapLinks);

      if (error) throw new Error(error.message);
    },
  });

  return (
    <Button
      label="Save"
      primary
      disabled={isPending}
      onClick={() => mutate()}
    />
  );
};

export default SaveButton;
