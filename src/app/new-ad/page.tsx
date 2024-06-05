"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

import { defaultLocation } from "@/constants";
import { createAd } from "@/actions/adActions";

import { SubmitButton } from "@/components/submit-button";
import { GoogleMapArea } from "@/components/google-map-area";
import { ImageUploadArea } from "@/components/image-upload-area";
import { ProductDetailsArea } from "@/components/product-details-area";

export default function NewAdPage() {
  const [files, setFiles] = useState<UploadResponse[]>([]);
  const [location, setLocation] = useState<PinLocation>(defaultLocation);

  const handleSubmit = async (formData: FormData) => {
    formData.set("location", JSON.stringify(location));
    formData.set("images", JSON.stringify(files));

    const result = await createAd(formData);
    redirect(`/ad/${result._id}`);
  };

  return (
    <form
      action={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 p-4 max-w-3xl gap-12 mx-auto mt-8 bg-white border rounded-lg shadow-md"
    >
      <div className="grow mt-4">
        <ImageUploadArea files={files} setFiles={setFiles} />

        <GoogleMapArea location={location} setLocation={setLocation} />
      </div>

      <div className="grow">
        <ProductDetailsArea />

        <SubmitButton>Publish</SubmitButton>
      </div>
    </form>
  );
}
