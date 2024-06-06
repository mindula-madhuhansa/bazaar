import { Loader } from "@googlemaps/js-api-loader";
import { createRef, useEffect, useState } from "react";

type Props = {
  location: PinLocation;
  setLocation: (location: PinLocation) => void;
};

export function LocationPicker({ location, setLocation }: Props) {
  const mapRef = createRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map>();
  const [pin, setPin] = useState<google.maps.marker.AdvancedMarkerElement>();

  const loadMap = async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");

    const map = new Map(mapRef.current as HTMLDivElement, {
      mapId: "map",
      center: location,
      zoom: 10,
      mapTypeControl: false,
      streetViewControl: false,
    });
    setMap(map);

    const pin = new AdvancedMarkerElement({
      map,
      position: location,
    });
    setPin(pin);

    map.addListener("click", (ev: any) => {
      pin.position = ev.latLng;
      const lat = ev.latLng.lat();
      const lng = ev.latLng.lng();
      setLocation({ lat, lng });
    });
  };

  useEffect(() => {
    loadMap();
  }, []);

  useEffect(() => {
    if (map && pin) {
      map.setCenter(location as PinLocation);
      pin.position = location;
    }
  }, [location, map, pin]);

  return <div ref={mapRef} className="w-full h-[200px]"></div>;
}
