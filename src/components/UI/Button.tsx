import { Icon } from "@iconify/react/dist/iconify.js";
import { twJoin } from "tailwind-merge";

type Props = {
  label: string;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  icon?: string;
  className?: string;
};

const Button = ({ label, primary, icon, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={twJoin(
        "py-3 px-7 max-md:px-4 transition-colors rounded-lg text-heading-s disabled:opacity-25 select-none",
        primary &&
          "text-white bg-primary-bold enabled:active:bg-primary-normal",
        !primary &&
          "bg-transparent border text-primary-bold border-primary-bold enabled:active:bg-primary-light",
        className
      )}
    >
      <span className={icon && "max-md:hidden"}>{label}</span>
      {icon && <Icon icon={icon} className="md:hidden" fontSize={20} />}
    </button>
  );
};

export default Button;
