import { Icon } from "@iconify/react/dist/iconify.js";
import links, { AppLink } from "../links";
import LabeledTextField from "./UI/LabeledTextField";
import LabeledDropdown from "./UI/LabeledDropdown";
import Dropdown from "./UI/Dropdown";
import { forwardRef } from "react";

type SectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

type Props = SectionProps & {
  onChangeValue: (value: string) => void;
  onChangeLink: (link: AppLink) => void;
  onRemove: () => void;
  value: string;
  link: AppLink;
  linkId: number;
  duplicate?: boolean;
  error?: string;
};

const LinkCard = forwardRef(
  (
    {
      link,
      onChangeLink,
      onChangeValue,
      onRemove,
      value,
      linkId,
      duplicate = false,
      error,
      ...props
    }: Props,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    return (
      <section
        {...props}
        ref={ref}
        className={`p-5 bg-graphite-light rounded-xl flex flex-col gap-3 mb-10 ${props.className}`}
      >
        <div className="flex justify-between items-center text-graphite-bold">
          <div className="flex gap-4 items-center text-heading-s font-bold">
            <Icon icon="material-symbols-light:drag-handle" fontSize={24} />
            Link #{linkId + 1}
          </div>
          <button
            onClick={onRemove}
            className="text-base-m select-none hover:underline"
          >
            Remove
          </button>
        </div>
        <LabeledDropdown
          label="Platform"
          onChange={(name) =>
            onChangeLink(links.find((link) => link.name == name)!!)
          }
          error={duplicate ? "duplicate" : undefined}
        >
          {links.map(({ name, icon }) => (
            <Dropdown.Option
              key={name}
              label={name}
              icon={icon}
              default={name == link.name}
            />
          ))}
        </LabeledDropdown>
        <LabeledTextField
          label="Link"
          icon="ph:link-bold"
          placeholder="e.g. https://www.github.com/johnappleseed"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
          error={error}
        />
      </section>
    );
  }
);

export default LinkCard;
