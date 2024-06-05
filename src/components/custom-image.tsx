"use client";

import Image, { ImageProps } from "next/image";

type ImageKitLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const imageKitLoader = ({ src, width, quality }: ImageKitLoaderProps) => {
  if (src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(",");
  var urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string;
  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

export function CustomImage(props: ImageProps) {
  // eslint-disable-next-line
  return <Image loader={imageKitLoader} {...props} />;
}
