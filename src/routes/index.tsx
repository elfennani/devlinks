import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import { AppLink } from "../links";
import LinkCard from "../components/LinkCard";
import { useDraftDispatch, useDraftState } from "../context/draft";
import { useMutationState } from "@tanstack/react-query";

const HomePage = () => {
  const { links } = useDraftState();
  const dispatch = useDraftDispatch();
  const pendingSavingMutations = useMutationState({
    filters: { exact: true, mutationKey: ["links", "save"], status: "pending" },
  });

  const handleLinkChange = (id: number) => (appLink: AppLink) =>
    dispatch({ type: "EDIT_LINK_LINK", payload: { id, appLink } });

  const handleValueChange = (id: number) => (value: string) =>
    dispatch({
      type: "EDIT_LINK_VALUE",
      payload: {
        id,
        value,
      },
    });

  const addLinkHandler = () => dispatch({ type: "ADD_LINK" });

  const handleRemove = (id: number) => () =>
    dispatch({ type: "REMOVE_LINK", payload: { id } });

  function checkLinkErrors(
    appLink: AppLink,
    value: string
  ): string | undefined {
    if (value.trim() == "") {
      return "Can’t be empty";
    }

    if (
      appLink.regex.length != 0 &&
      !appLink.regex.find((regex) => regex.test(value))
    ) {
      return "Pattern doesn't match";
    }
  }

  return (
    <div className="flex flex-col gap-10 min-h-full">
      <Heading
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <Button
        label="+ Add new link"
        onClick={addLinkHandler}
        disabled={pendingSavingMutations.length > 0}
      />
      {!links.length && (
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
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
      )}

      {links.map(({ appLink, value, id }) => (
        <LinkCard
          key={`${id}-${appLink.name}`}
          id={id}
          link={appLink}
          value={value}
          onChangeLink={handleLinkChange(id)}
          onChangeValue={handleValueChange(id)}
          onRemove={handleRemove(id)}
          duplicate={
            links.filter((draft) => draft.appLink.name == appLink.name).length >
            1
          }
          error={checkLinkErrors(appLink, value)}
        />
      ))}
    </div>
  );
};

export default HomePage;
