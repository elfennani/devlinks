import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";

interface Props {
  label: string;
  icon: string;
  active?: boolean;
  href: string;
}

const Tab = ({ active = false, icon, label, href }: Props) => {
  return (
    <Link
      to={href}
      className={twJoin(
        "px-7 py-3 rounded-lg text-heading-s transition flex items-center gap-2",
        active && "bg-primary-light text-primary-bold",
        !active && "text-graphite-bold hover:text-primary-bold"
      )}
    >
      <Icon icon={icon} fontSize={20} />
      <span className="max-md:hidden">{label}</span>
    </Link>
  );
};

export default Tab;
