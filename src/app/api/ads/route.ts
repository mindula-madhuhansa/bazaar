import { getServerSession } from "next-auth";
import { FilterQuery, PipelineStage } from "mongoose";

import { Ad, AdModel } from "@/models/Ad";
import { connectToDB } from "@/utils/connectToDB";
import { authOptions } from "@/utils/authOptions";

export async function GET(req: Request) {
  await connectToDB();

  const url = new URL(req.url);

  const phrase = url.searchParams.get("phrase");
  const category = url.searchParams.get("category");
  const min = url.searchParams.get("min");
  const max = url.searchParams.get("max");
  const radius = url.searchParams.get("radius");
  const center = url.searchParams.get("center");

  const filter: FilterQuery<Ad> = {};
  const aggregationStages: PipelineStage[] = [];

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

  if (radius && center) {
    const [lat, lng] = center.split(",").map((c) => parseFloat(c));

    aggregationStages.push({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lat, lng],
        },
        query: filter,
        includeLocs: "location",
        distanceField: "distance",
        maxDistance: parseInt(radius),
        spherical: true,
      },
    });
  }

  aggregationStages.push({
    $sort: {
      createdAt: -1,
    },
  });

  const adsDocs = await AdModel.aggregate(aggregationStages);
  return Response.json(adsDocs);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await connectToDB();

  const adDoc = await AdModel.findById(id);
  const session = await getServerSession(authOptions);

  if (!adDoc || adDoc.userEmail !== session?.user?.email) {
    return Response.json("Unauthorized", { status: 401 });
  }

  await AdModel.findByIdAndDelete(id);

  return Response.json("Deleted");
}
