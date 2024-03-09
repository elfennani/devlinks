import { Icon } from "@iconify/react/dist/iconify.js";
import { useMemo } from "react";
import { twJoin } from "tailwind-merge";
import useImageFile from "../../hooks/useImageFile";

type Props = {
  value?: File | null;
  onChange: (file: File | undefined) => void;
  initialBackgroundUrl?: string;
};

const ImageUpload = ({
  onChange,
  value: file,
  initialBackgroundUrl,
}: Props) => {
  const backgroundImage = useImageFile(file);

  let background = `url(${backgroundImage})`;
  const random = useMemo(() => Math.round(Math.random() * 8), []);

  if (!backgroundImage && initialBackgroundUrl)
    background = `url(${initialBackgroundUrl}?${random})`;

  return (
    <div>
      <label
        role="button"
        className="block select-none bg-primary-light bg-cover bg-center text-primary-bold rounded-xl text-heading-s"
        style={{ backgroundImage: background }}
      >
        <div
          className={twJoin(
            "size-48 flex items-center justify-center flex-col gap-2",
            (!!file || !!initialBackgroundUrl) &&
              "bg-black bg-opacity-50 rounded-xl text-white"
          )}
        >
          <Icon icon="ph:image" fontSize={40} />
          {!!file || !!initialBackgroundUrl ? "Change Image" : "+ Upload Image"}
        </div>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onChange(e.target.files?.[0])}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
