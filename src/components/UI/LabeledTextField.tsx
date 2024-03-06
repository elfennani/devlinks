import { ForwardedRef, forwardRef } from "react";
import TextField, { TextFieldProps } from "./TextField";
import { twJoin } from "tailwind-merge";

type Props = {
  label: string;
} & TextFieldProps;

const LabeledTextField = (
  { label, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <label
      className={twJoin(
        "flex flex-col gap-1 text-base-s",
        props.error ? "text-error" : "text-graphite-bolder"
      )}
    >
      {label}
      <TextField {...props} ref={ref} />
    </label>
  );
};

export default forwardRef<HTMLInputElement, Props>(LabeledTextField);
