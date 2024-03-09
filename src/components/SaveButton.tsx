import { useMutation } from "@tanstack/react-query";
import { DraftLink, useDraftState } from "../context/draft";
import supabase from "../services/supabase";
import Button from "./UI/Button";
import { Database } from "../services/types";
import useUser from "../hooks/useUser";

type LinkInsert = Database["public"]["Tables"]["links"]["Insert"];

const SaveButton = () => {
  const { draftLinks, isLoading, isError: isDraftStateError } = useDraftState();
  const { data } = useUser();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["links", "save"],
    mutationFn: async () => {
      if (!data) throw new Error("User not loaded in yet");

      if (isLoading || isDraftStateError) {
        throw new Error("Data not loaded in yet");
      }

      const {
        data: { user },
      } = data;
      if (!user) throw new Error("User not logged in");

      draftLinks.forEach((link) => {
        const { appLink, value } = link;
        if (value.trim() == "") {
          throw new Error(`${appLink.name} link can’t be empty`);
        }
        if (!appLink.regex.find((regex) => regex.test(value))) {
          throw new Error(`${appLink.name} link pattern doesn't match`);
        }
      });

      const mapLinks: LinkInsert[] = draftLinks.map((link: DraftLink) => ({
        user_id: user.id,
        name: link.appLink.name,
        link: link.value,
        order: link.id,
      }));

      const { error } = await supabase.from("links").upsert(mapLinks);

      if (error) throw new Error(error.message);
    },
  });

  return (
    <div className="flex items-center gap-8">
      {isError && <p className="text-base-m text-error">{error.message}</p>}
      {isSuccess && <p className="text-base-m text-green-500">Saved!</p>}
      <Button
        label="Save"
        primary
        disabled={isPending || isLoading || isDraftStateError}
        onClick={() => mutate()}
      />
    </div>
  );
};

export default SaveButton;
