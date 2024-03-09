import { Icon } from "@iconify/react";
import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TextFieldProps = {
  icon?: string;
  error?: string | null | false;
} & InputProps;

const TextField = (
  { icon, error, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div
      className={twMerge(
        "flex gap-3 items-center overflow-hidden bg-white px-4 rounded-lg border-graphite-normal border focus-within:border-primary-bold focus-within:shadow-focused",
        error && "!border-error focus-within:!shadow-none",
        props.className
      )}
    >
      {icon && (
        <Icon icon={icon} fontSize={16} className="text-graphite-bold" />
      )}
      <input
        ref={ref}
        {...props}
        className={twMerge(
          "placeholder:text-opacity-50 placeholder:text-base-m outline-none py-3 w-full min-w-32 !text-graphite-bolder text-base-m flex-1",
          error && "text-error text-base-m"
        )}
      />
      {error && <p className="text-base-s text-error line-clamp-2">{error}</p>}
    </div>
  );
};

export default forwardRef<HTMLInputElement, TextFieldProps>(TextField);

//placeholder:text-opacity-50 placeholder:text-base-m outline-none py-3 w-full min-w-32 text-base-m flex-1
//placeholder:text-opacity-50 placeholder:text-base-m outline-none py-3 w-full min-w-32 flex-1 text-error
