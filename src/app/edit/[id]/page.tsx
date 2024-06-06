import { getServerSession } from "next-auth";

import { connectToDB } from "@/utils/connectToDB";
import { authOptions } from "@/utils/authOptions";

import { AdForm } from "@/components/ad-form";
import { AdModel } from "@/models/Ad";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

export default async function EditPage(args: Props) {
  const id = args.params.id;

  await connectToDB();

  const session = await getServerSession(authOptions);

  const adDoc = await AdModel.findById(id);

  if (!adDoc) {
    return <div>Ad not found</div>;
  }

  if (session && session.user?.email !== adDoc?.userEmail) {
    return <div>Access Denied</div>;
  }

  return (
    <AdForm
      id={adDoc._id}
      defaultFiles={adDoc.images}
      defaultText={adDoc}
      defaultLocation={adDoc.location}
    />
  );
}
