import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";

import { Ad, AdModel } from "@/models/Ad";
import { connectToDB } from "@/utils/connectToDB";

export async function GET(req: Request, res: Response) {
  await connectToDB();

  const url = new URL(req.url);

  const phrase = url.searchParams.get("phrase");
  const category = url.searchParams.get("category");
  const min = url.searchParams.get("min");
  const max = url.searchParams.get("max");

  const filter: FilterQuery<Ad> = {};

  if (phrase) {
    filter.title = {
      $regex: ".*" + phrase + ".*",
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  if (min && !max) {
    filter.price = {
      $gte: parseInt(min),
    };
  }

  if (max && !min) {
    filter.price = {
      ...filter.price,
      $lte: parseInt(max),
    };
  }

  if (min && max) {
    filter.price = {
      $gte: parseInt(min),
      $lte: parseInt(max),
    };
  }

  const adsDocs = await AdModel.find(filter, null, {
    sort: {
      createdAt: -1,
    },
  });

  return NextResponse.json(adsDocs);
}
