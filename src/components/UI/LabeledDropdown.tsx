import { twJoin } from "tailwind-merge";
import Dropdown, { DropdownProps } from "./Dropdown";

type Props = {
  label: string;
} & DropdownProps;

const LabeledDropdown = ({ label, ...props }: Props) => {
  return (
    <label
      className={twJoin(
        "flex flex-col gap-1 text-base-s",
        props.error ? "text-error" : "text-graphite-bolder"
      )}
    >
      {label}
      <Dropdown {...props} />
    </label>
  );
};

export default LabeledDropdown;
