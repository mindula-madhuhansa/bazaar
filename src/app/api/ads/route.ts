import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";

import { Ad, AdModel } from "@/models/Ad";
import { connectToDB } from "@/utils/connectToDB";

export async function GET(req: Request, res: Response) {
  await connectToDB();

  const url = new URL(req.url);
  const phrase = url.searchParams.get("phrase") || null;
  const filter: FilterQuery<Ad> = {};
  if (phrase) {
    filter.title = { $regex: ".*" + phrase + ".*", $options: "i" };
  }

  const adsDocs = await AdModel.find(filter, null, {
    sort: {
      createdAt: -1,
    },
  });

  return NextResponse.json(adsDocs);
}
