import { AdModel } from "@/models/Ad";
import { Gallery } from "@/components/gallery";
import { connectToDB } from "@/utils/connectToDB";

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
    <div className="h-full grid grid-cols-1 md:grid-cols-5 max-w-7xl mx-auto p-4">
      <div className="col-span-1 md:col-span-3 bg-black/90 text-white flex flex-col">
        <Gallery images={adDoc.images} />
      </div>

      <div className="col-span-1 md:col-span-2 p-8">
        <h1 className="text-lg font-semibold">{adDoc.title}</h1>

        <label className="ad-label">Category</label>
        <p className="text-sm capitalize">{adDoc.category}</p>

        <label className="ad-label">Description</label>
        <p className="text-sm">{adDoc.description}</p>

        <label className="ad-label">Contact</label>
        <p className="text-sm">{adDoc.contact || "No Contact info found"}</p>
      </div>
    </div>
  );
}
