"use client";

import { createRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {
  location: PinLocation;
};

export function LocationMap({ location }: Props) {
  const mapRef = createRef<HTMLDivElement>();

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const map = new Map(mapRef.current as HTMLDivElement, {
      mapId: "map",
      center: location,
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
    });

    new AdvancedMarkerElement({
      map,
      position: location,
    });
  };

  return <div ref={mapRef} className="mt-2 w-full h-48"></div>;
}
