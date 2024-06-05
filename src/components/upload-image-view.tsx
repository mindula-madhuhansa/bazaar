import { UploadResponse } from "imagekit/dist/libs/interfaces";

import { CustomImage } from "@/components/custom-image";

type Props = {
  image: UploadResponse;
};

export function UploadImageView({ image }: Props) {
  if (image.fileType === "image") {
    return (
      <CustomImage
        src={image.filePath}
        alt={image.name}
        width={1024}
        height={1024}
        className="w-full h-auto object-cover aspect-square"
      />
    );
  }

  return <>{image.name}</>;
}
