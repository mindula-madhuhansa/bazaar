import Link from "next/link";
import { getServerSession } from "next-auth";
import { PencilLineIcon } from "lucide-react";

import { AdModel } from "@/models/Ad";
import { authOptions } from "@/utils/authOptions";
import { connectToDB } from "@/utils/connectToDB";
import { formatCurrency } from "@/utils/formayCurrency";

import { Gallery } from "@/components/gallery";
import { LocationMap } from "@/components/location-map";
import { DeleteButton } from "@/components/delete-button";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function SingleAdPage(args: Props) {
  await connectToDB();
  const adDoc = await AdModel.findById(args.params.id);
  const session = await getServerSession(authOptions);

  if (!adDoc) {
    return "Not found!";
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {session && session.user?.email === adDoc.userEmail && (
        <div className="flex items-center justify-end gap-x-2 mb-4">
          <Link
            href={`/edit/${adDoc._id}`}
            className="flex items-center gap-x-2 bg-blue-500 hover:bg-blue-500/90 text-white px-4 py-2 rounded-md"
          >
            <PencilLineIcon className="size-4" />
            <span>Edit</span>
          </Link>

          <DeleteButton id={adDoc._id} />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4">
        <div className="flex flex-col grow lg:w-3/5 bg-black/90 text-white ">
          <Gallery images={adDoc.images} />
        </div>

        <div className="grow lg:w-2/5 p-4 md:overflow-y-scroll">
          <h1 className="text-lg font-semibold">{adDoc.title}</h1>

          <label className="ad-label">Price</label>
          <p className="text-sm">${formatCurrency(adDoc.price)}</p>

          <label className="ad-label">Category</label>
          <p className="text-sm capitalize">{adDoc.category}</p>

          <label className="ad-label">Description</label>
          <p className="text-sm">{adDoc.description}</p>

          <label className="ad-label">Contact</label>
          <p className="text-sm">{adDoc.contact || "No Contact info found"}</p>

          <label className="ad-label">Location</label>
          <LocationMap location={adDoc.location} />
        </div>
      </div>
    </div>
  );
}
