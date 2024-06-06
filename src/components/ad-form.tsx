"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

import { createAd, updateAd } from "@/actions/adActions";
import { SubmitButton } from "@/components/submit-button";
import { GoogleMapArea } from "@/components/google-map-area";
import { ImageUploadArea } from "@/components/image-upload-area";
import { ProductDetailsArea } from "@/components/product-details-area";
import { revalidatePath } from "next/cache";

type Props = {
  id?: string | null;
  defaultFiles?: UploadResponse[];
  defaultText?: FieldTypes;
  defaultLocation: PinLocation | null;
};

export function AdForm({
  id = null,
  defaultFiles = [],
  defaultText = {},
  defaultLocation,
}: Props) {
  const [files, setFiles] = useState<UploadResponse[]>(defaultFiles);
  const [location, setLocation] = useState<PinLocation | null>(defaultLocation);

  useEffect(() => {
    !defaultLocation &&
      navigator.geolocation.getCurrentPosition(
        (ev) => {
          const { latitude, longitude } = ev.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error(err.message);
        }
      );
  }, [defaultLocation]);

  const handleSubmit = async (formData: FormData) => {
    formData.set("location", JSON.stringify(location));
    formData.set("images", JSON.stringify(files));

    if (id) {
      formData.set("_id", id);
    }

    const result = id ? await updateAd(formData) : await createAd(formData);

    redirect(`/ad/${result._id}`);
  };

  return (
    <form
      action={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 p-4 max-w-3xl gap-12 mx-auto mt-8 bg-white border rounded-lg shadow-md"
    >
      <div className="grow mt-4">
        <ImageUploadArea files={files} setFiles={setFiles} />

        {location && (
          <GoogleMapArea location={location} setLocation={setLocation} />
        )}
      </div>

      <div className="grow">
        <ProductDetailsArea defaultValues={defaultText} />

        <SubmitButton>{id ? "Save" : "Publish"}</SubmitButton>
      </div>
    </form>
  );
}
