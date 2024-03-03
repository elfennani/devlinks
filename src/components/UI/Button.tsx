import { twJoin } from "tailwind-merge";

type Props = {
  label: string;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ label, primary, ...props }: Props) => {
  return (
    <button
      className={twJoin(
        "py-3 px-7 transition-colors rounded-lg text-heading-s disabled:opacity-25 select-none",
        primary &&
          "text-white bg-primary-bold enabled:active:bg-primary-normal",
        !primary &&
          "bg-transparent border text-primary-bold border-primary-bold enabled:active:bg-primary-light"
      )}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
