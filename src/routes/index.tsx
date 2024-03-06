import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-10 h-full">
      <Heading
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <Button label="+ Add new link" />
      <div className="flex gap-10 flex-col items-center justify-center p-5 rounded-xl flex-1 min-h-fit bg-graphite-light">
        <img
          src="/images/illustration-empty.svg"
          alt="Illustration Empty"
          className="h-40"
        />
        <div className="flex flex-col gap-6">
          <h2 className="text-heading-m text-center text-graphite-bolder">
            Let’s get you started
          </h2>
          <p className="text-base-m text-graphite-bold w-[488px] max-w-full text-center">
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We’re here to help you
            share your profiles with everyone!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
