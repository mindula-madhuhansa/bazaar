"use client";

import React from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { IKUploadProps } from "imagekitio-react/dist/types/components/IKUpload/props";

export const Uploader = React.forwardRef<HTMLInputElement, IKUploadProps>(
  (props, ref) => {
    return (
      <IKContext
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        authenticator={async () => {
          const res = await fetch("/api/imagekit/auth");
          return await res.json();
        }}
      >
        <IKUpload {...props} ref={ref} className="hidden" />
      </IKContext>
    );
  }
);

Uploader.displayName = "Uploader";
