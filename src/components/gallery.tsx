"use client";

import { useState } from "react";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { UploadImageView } from "@/components/upload-image-view";
import { UploadThumbnail } from "@/components/upload-thumbnail";

type Props = {
  images: UploadResponse[];
};

export function Gallery({ images }: Props) {
  const [activeImage, setActiveImage] = useState<UploadResponse | null>(
    images?.[0] || null
  );

  const handleChangeNextImage = () => {
    const activeImageIndex = images.findIndex(
      (image) => image.fileId === activeImage?.fileId
    );

    const nextImageIndex =
      activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;

    setActiveImage(images[nextImageIndex]);
  };

  const handleChangePreviousImage = () => {
    const activeImageIndex = images.findIndex(
      (image) => image.fileId === activeImage?.fileId
    );

    const previousImageIndex =
      activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;

    setActiveImage(images[previousImageIndex]);
  };

  return (
    <>
      <div className="grow flex items-center relative p-4 pb-0">
        {activeImage && (
          <>
            <UploadImageView image={activeImage} />

            <div className="absolute inset-6 flex justify-between">
              <button onClick={handleChangePreviousImage}>
                <ChevronLeftIcon className="bg-gray-400/60 hover:bg-gray-400/40 p-2 size-10 rounded-full transition" />
              </button>
              <button onClick={handleChangeNextImage}>
                <ChevronRightIcon className="bg-gray-400/60 hover:bg-gray-400/40 p-2 size-10 rounded-full transition" />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex items-center justify-center gap-4">
        {images.map((image) => (
          <div key={image.fileId} className="">
            <UploadThumbnail
              file={image}
              onClick={() => setActiveImage(image)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
