import { Icon } from "@iconify/react/dist/iconify.js";
import { twJoin } from "tailwind-merge";

interface Props {
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}

const Tab = ({ active = false, icon, label, onClick = () => {} }: Props) => {
  return (
    <button
      onClick={onClick}
      className={twJoin(
        "px-7 py-3 rounded-lg text-heading-s transition flex items-center gap-2",
        active && "bg-primary-light text-primary-bold",
        !active && "text-graphite-bold hover:text-primary-bold"
      )}
    >
      <Icon icon={icon} />
      {label}
    </button>
  );
};

export default Tab;
