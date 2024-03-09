import Heading from "../components/UI/Heading";
import ImageUpload from "../components/UI/ImageUpload";
import TextField from "../components/UI/TextField";

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-10 h-full">
      <Heading
        title="Profile Details"
        subtitle="Add your details to create a personal touch to your profile."
      />
      <section className="flex rounded-xl gap-4 items-center text-base-m text-graphite-bold p-5 bg-graphite-light">
        <p className="w-60">Profile picture</p>
        <div className="flex flex-1 items-center gap-6">
          <ImageUpload onChange={() => {}} />
          <p className="flex-1 text-base-s">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </section>
      <section className="flex flex-col rounded-xl gap-3 items-center text-base-m text-graphite-bold p-5 bg-graphite-light">
        <label className="w-full flex items-center">
          <span className="block w-60">First name*</span>
          <TextField className="flex-1" type="text" placeholder="e.g. John" />
        </label>
        <label className="w-full flex items-center">
          <span className="block w-60">Last name*</span>
          <TextField
            className="flex-1"
            type="text"
            placeholder="e.g. Appleseed"
          />
        </label>
        <label className="w-full flex items-center">
          <span className="block w-60">Email</span>
          <TextField
            className="flex-1"
            type="text"
            placeholder="e.g. email@example.com"
          />
        </label>
      </section>
    </div>
  );
};

export default ProfilePage;
