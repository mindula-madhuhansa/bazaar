import { UploadResponse } from "imagekit/dist/libs/interfaces";

type Props = {
  file: UploadResponse;
  onClick?: () => void;
  className?: string;
};
/* eslint-disable @next/next/no-img-element */
export function UploadThumbnail({
  file,
  onClick,
  className = "size-24 rounded overflow-hidden cursor-pointer",
}: Props) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <img
      src={`${file.url}?tr=w-1024,h-1024,fo-auto`}
      alt={file.name}
      onClick={handleClick}
      className={className}
    />
  );
}
