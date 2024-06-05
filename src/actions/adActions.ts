"use server";

import { AdModel } from "@/models/Ad";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { connectToDB } from "@/utils/connectToDB";

export async function createAd(formData: FormData) {
  const session = await getServerSession(authOptions);
  const { images, location, ...data } = Object.fromEntries(formData);

  await connectToDB();

  const newAdData = {
    ...data,
    images: JSON.parse(images as string),
    location: JSON.parse(location as string),
    userEmail: session?.user?.email,
  };

  const newAdDoc = await AdModel.create(newAdData);

  return JSON.parse(JSON.stringify(newAdDoc));
}
