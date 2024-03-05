import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

type Props = {
  value?: File | null;
  onChange: (file: File | undefined) => void;
};

const ImageUpload = ({ onChange, value: file }: Props) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(`url(${reader.result})`);
      };
      reader.readAsDataURL(file);
    } else {
      setBackgroundImage("");
    }
  }, [file]);

  return (
    <div>
      <label
        role="button"
        className="block select-none bg-primary-light bg-cover bg-center text-primary-bold rounded-xl text-heading-s"
        style={{ backgroundImage }}
      >
        <div
          className={twJoin(
            "size-48 flex items-center justify-center flex-col gap-2",
            !!file && "bg-black bg-opacity-50 rounded-xl text-white"
          )}
        >
          <Icon icon="ph:image" fontSize={40} />
          {!!file ? "Change Image" : "+ Upload Image"}
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
