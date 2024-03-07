import Button from "../components/UI/Button";
import Heading from "../components/UI/Heading";
import links, { AppLink } from "../links";
import LinkCard from "../components/LinkCard";
import { useDraftState } from "../context/draft";
import { useMutationState } from "@tanstack/react-query";

const HomePage = () => {
  const { draftLinks, setDraftLinks, isLoading } = useDraftState();
  const pendingSavings = useMutationState({
    filters: { exact: true, mutationKey: ["links", "save"], status: "pending" },
  });

  const handleLinkChange = (id: number) => (appLink: AppLink) => {
    setDraftLinks((links) => {
      return links.map((link) => {
        if (link.id == id) {
          return {
            ...link,
            appLink,
            value: link.appLink.name == appLink.name ? link.value : "",
          };
        }

        return link;
      });
    });
  };

  const handleValueChange = (id: number) => (value: string) => {
    setDraftLinks((links) => {
      return links.map((link) => {
        if (link.id == id) {
          return {
            ...link,
            value: value,
          };
        }

        return link;
      });
    });
  };

  function addLinkHandler() {
    setDraftLinks((draftLinks) => {
      const firstUnusedLink = links.find(
        (link) => !draftLinks.some(({ appLink }) => appLink.name == link.name)
      )!!;
      const id =
        draftLinks.reduce((prev, curr) => {
          return prev <= curr.id ? curr.id : prev;
        }, -1) + 1;
      console.log(id);

      return [
        ...draftLinks,
        {
          appLink: firstUnusedLink,
          id,
          value: "",
        },
      ];
    });
  }

  const handleRemove = (id: number) => () =>
    setDraftLinks((links) => {
      return links
        .filter((l) => l.id != id)
        .map((l) => ({ ...l, id: l.id <= id ? l.id : l.id - 1 }));
    });

  return (
    <div className="flex flex-col gap-10 h-full">
      <Heading
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <Button
        label="+ Add new link"
        onClick={addLinkHandler}
        disabled={isLoading || pendingSavings.length > 0}
      />
      {!draftLinks.length && (
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

      {draftLinks.map(({ appLink, value, id }) => (
        <LinkCard
          key={`${id}-${appLink.name}`}
          id={id}
          link={appLink}
          value={value}
          onChangeLink={handleLinkChange(id)}
          onChangeValue={handleValueChange(id)}
          onRemove={handleRemove(id)}
          duplicate={
            draftLinks.filter((draft) => draft.appLink.name == appLink.name)
              .length > 1
          }
        />
      ))}
    </div>
  );
};

export default HomePage;
