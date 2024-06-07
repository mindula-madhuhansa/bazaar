import { AdCard } from "@/components/ad-card";
import { AdModel } from "@/models/Ad";
import { authOptions } from "@/utils/authOptions";
import { connectToDB } from "@/utils/connectToDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyAdsPage() {
  await connectToDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin?callbackUrl=/my-ads");
  }

  const adDocs = await AdModel.find({ userEmail: session.user?.email });

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-semibold">Your Ads</h1>

      <div className="grid grid-cols-1 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {adDocs.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
