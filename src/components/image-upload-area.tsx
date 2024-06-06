import { useRef, useState } from "react";
import { ImageIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

import { Uploader } from "@/components/uploader";
import { UploadThumbnail } from "@/components/upload-thumbnail";

type Props = {
  files: UploadResponse[];
  setFiles: React.Dispatch<React.SetStateAction<UploadResponse[]>>;
};

export function ImageUploadArea({ files, setFiles }: Props) {
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="bg-gray-100 p-4 rounded flex flex-col items-center gap-y-2">
      <h2 className="text-lg font-bold text-gray-400">
        Add Photos of your Product
      </h2>

      <ImageIcon className="size-24 text-gray-400" />
      <div className="flex flex-wrap w-full gap-2 mt-4">
        {files.map((file) => (
          <UploadThumbnail key={file.fileId} file={file} />
        ))}
      </div>

      <Uploader
        ref={uploaderRef}
        onUploadStart={() => setIsUploading(true)}
        onSuccess={(file) => {
          setFiles((prev) => [...prev, file]);
          setIsUploading(false);
        }}
      />

      <button
        type="button"
        disabled={isUploading}
        onClick={() => {
          if (uploaderRef.current) {
            uploaderRef.current.click();
          }
        }}
        className="flex items-center justify-center gap-x-2 border border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded w-full disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400"
      >
        {!isUploading ? (
          <>
            <PlusIcon className="size-5" />
            <span>Add Photos</span>
          </>
        ) : (
          <span className="animate-pulse">Uploading...</span>
        )}
        {isUploading && (
          <span className="animate-pulse">
            <Loader2Icon className="size-5 animate-spin" />
          </span>
        )}
      </button>
    </div>
  );
}
