import ImageKit from "imagekit";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ik = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  });

  if (!ik) {
    return NextResponse.json(
      { error: "ImageKit initialization failed" },
      { status: 500 }
    );
  }

  return Response.json(ik.getAuthenticationParameters());
};
