import { Icon } from "@iconify/react/dist/iconify.js";
import links, { AppLink } from "../links";
import LabeledTextField from "./UI/LabeledTextField";
import LabeledDropdown from "./UI/LabeledDropdown";
import Dropdown from "./UI/Dropdown";

type Props = {
  onChangeValue: (value: string) => void;
  onChangeLink: (link: AppLink) => void;
  onRemove: () => void;
  value: string;
  link: AppLink;
  id: number;
  duplicate?: boolean;
  error?: string;
};

const LinkCard = ({
  link,
  onChangeLink,
  onChangeValue,
  onRemove,
  value,
  id,
  duplicate = false,
  error,
}: Props) => {
  return (
    <section className="p-5 bg-graphite-light rounded-xl flex flex-col gap-3">
      <div className="flex justify-between items-center text-graphite-bold">
        <div className="flex gap-4 items-center text-heading-s font-bold">
          <Icon icon="material-symbols-light:drag-handle" fontSize={24} />
          Link #{id + 1}
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
        autoFocus
      />
    </section>
  );
};

export default LinkCard;
