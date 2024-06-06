import { AdModel } from "@/models/Ad";
import { connectToDB } from "@/utils/connectToDB";
import { formatCurrency } from "@/utils/formayCurrency";

import { Gallery } from "@/components/gallery";
import { LocationMap } from "@/components/location-map";

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

  if (!adDoc) {
    return "Not found!";
  }

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 max-w-7xl mx-auto p-4">
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
  );
}
