import { useEffect, useState } from "react";

const useImageFile = (file: File | null | undefined) => {
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(reader.result?.toString());
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return backgroundImage
}

export default useImageFile