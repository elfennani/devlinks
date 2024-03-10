import { ChangeEvent } from "react";
import Heading from "../components/UI/Heading";
import ImageUpload from "../components/UI/ImageUpload";
import TextField from "../components/UI/TextField";
import { Profile, useDraftDispatch, useDraftState } from "../context/draft";
import supabase from "../services/supabase";
import useUser from "../hooks/useUser";

const ProfilePage = () => {
  const { data } = useUser();
  const dispatch = useDraftDispatch();
  const {
    profile: { firstName, lastName, email },
    file,
  } = useDraftState();

  const handleChange =
    (key: keyof Profile) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "EDIT_PROFILE",
        payload: { key, value: e.target.value },
      });
    };

  return (
    <div className="flex flex-col gap-10 min-h-full max-md:gap-6">
      <Heading
        title="Profile Details"
        subtitle="Add your details to create a personal touch to your profile."
      />
      <section className="flex max-md:flex-col rounded-xl gap-4 items-center text-base-m text-graphite-bold p-5 bg-graphite-light">
        <p className="w-60 max-md:w-full">Profile picture</p>
        <div className="flex flex-1 items-center gap-6 max-md:flex-col max-md:items-start">
          <ImageUpload
            onChange={(file) =>
              dispatch({ type: "SELECT_FILE", payload: file })
            }
            value={file}
            initialBackgroundUrl={
              supabase.storage
                .from("avatars")
                .getPublicUrl(`/${data?.data.user?.id}`).data.publicUrl
            }
          />
          <p className="flex-1 text-base-s">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </section>
      <section className="flex flex-col rounded-xl gap-3 items-center text-base-m text-graphite-bold p-5 bg-graphite-light">
        <label className="w-full flex items-center max-md:flex-col">
          <span className="block max-md:w-full w-60">First name*</span>
          <TextField
            onChange={handleChange("firstName")}
            className="flex-1 w-full"
            type="text"
            placeholder="e.g. John"
            value={firstName}
            error={!firstName?.trim() && "Can't be empty"}
          />
        </label>
        <label className="w-full flex items-center max-md:flex-col">
          <span className="block max-md:w-full w-60">Last name*</span>
          <TextField
            onChange={handleChange("lastName")}
            className="flex-1 w-full"
            type="text"
            placeholder="e.g. Appleseed"
            value={lastName}
            error={!lastName?.trim() && "Can't be empty"}
          />
        </label>
        <label className="w-full flex items-center max-md:flex-col">
          <span className="block max-md:w-full w-60">Email</span>
          <TextField
            onChange={handleChange("email")}
            className="flex-1 w-full"
            type="text"
            value={email || ""}
            placeholder="e.g. email@example.com"
          />
        </label>
      </section>
    </div>
  );
};

export default ProfilePage;
