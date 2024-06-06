"use server";

import { AdModel } from "@/models/Ad";
import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import { connectToDB } from "@/utils/connectToDB";
import { revalidatePath } from "next/cache";

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

export async function updateAd(formData: FormData) {
  const { _id, images, location, ...data } = Object.fromEntries(formData);

  await connectToDB();
  const session = await getServerSession(authOptions);

  const adDoc = await AdModel.findById(_id);

  if (!adDoc) {
    throw new Error("Ad not found");
  }

  if (adDoc?.userEmail !== session?.user?.email) {
    throw new Error("Access Denied");
  }

  const adData = {
    ...data,
    images: JSON.parse(images as string),
    location: JSON.parse(location as string),
  };

  const updatedAdDoc = await AdModel.findByIdAndUpdate(_id, adData);

  revalidatePath(`/ad/${_id}`);

  return JSON.parse(JSON.stringify(updatedAdDoc));
}
