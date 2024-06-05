import ImageKit from "imagekit";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      status: 401,
      body: { error: "Unauthorized" },
    };
  }

  const ik = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  });

  if (!ik) {
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  }

  return Response.json(ik.getAuthenticationParameters());
};
