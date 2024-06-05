import Link from "next/link";

import { Ad } from "@/models/Ad";
import { UploadThumbnail } from "@/components/upload-thumbnail";

export function AdCard({ ad }: { ad: Ad }) {
  return (
    <Link
      key={ad._id}
      href={`/ad/${ad._id}`}
      className="mt-4 min-h-24 flex flex-col border p-2 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white"
    >
      {ad.images.length > 0 && (
        <UploadThumbnail
          file={ad.images[0]}
          className="rounded-md overflow-hidden border"
        />
      )}

      <div className="flex flex-col gap-y-1 mt-2">
        <p className="font-semibold text-gray-700">$ {ad.price}</p>
        <h3 className="text-sm font-medium line-clamp-2">{ad.title}</h3>
      </div>
    </Link>
  );
}
