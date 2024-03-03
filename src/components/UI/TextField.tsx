import { Icon } from "@iconify/react";
import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type Props = {
  icon?: string;
  error?: string;
} & InputProps;

const TextField = (
  { icon, error, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div
      className={twMerge(
        "flex gap-3 items-center w-96 bg-white px-4 rounded-lg border-graphite-normal border focus-within:border-primary-bold focus-within:shadow-focused",
        error && "!border-error focus-within:!shadow-none"
      )}
    >
      {icon && (
        <Icon icon={icon} fontSize={16} className="text-graphite-bold" />
      )}
      <input
        ref={ref}
        className={twMerge(
          "placeholder:text-opacity-50 outline-none py-3 text-graphite-bolder text-base-m flex-1",
          error && "text-error"
        )}
        {...props}
      />
      {error && <span className="text-base-s text-error">{error}</span>}
    </div>
  );
};

export default forwardRef<HTMLInputElement, Props>(TextField);
