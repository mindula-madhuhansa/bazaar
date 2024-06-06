import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {
  onChange: ({
    center,
    radius,
  }: {
    center: PinLocation;
    radius: number;
  }) => void;
  defaultRadius: number;
};

export function DistancePicker({ onChange, defaultRadius }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(defaultRadius);
  const [center, setCenter] = useState<PinLocation | null>(null);
  const [zoom, setZoom] = useState<number>(10);
  const [error, setError] = useState("");

  useEffect(() => {
    if (center) {
      loadMap();

      if (window && window.localStorage) {
        window.localStorage.setItem("center", JSON.stringify(center));
      }
    }
    if (!center) {
      if (window && window.localStorage) {
        const center = window.localStorage.getItem("center");
        if (center) {
          setCenter(JSON.parse(center));
        }
      }
    }
  }, [center]);

  useEffect(() => {
    if (center && radius) {
      onChange({ center, radius });
    }
  }, [radius, center]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (ev) => {
        const { latitude, longitude } = ev.coords;
        setCenter({ lat: latitude, lng: longitude });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  const loadMap = async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    const { Map, Circle } = await loader.importLibrary("maps");

    const map = new Map(mapRef.current as HTMLDivElement, {
      mapId: "map",
      center,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
    });

    const circle = new Circle({
      map,
      center,
      radius,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      editable: true,
    });

    circle.addListener("radius_changed", () => {
      const radius = circle.getRadius();
      setRadius(radius);

      if (radius > 1500000) map.setZoom(1);
      else if (radius > 800000) map.setZoom(2);
      else if (radius > 400000) map.setZoom(3);
      else if (radius > 180000) map.setZoom(4);
      else if (radius > 100000) map.setZoom(5);
      else if (radius > 50000) map.setZoom(6);
      else if (radius > 25000) map.setZoom(7);
      else if (radius > 11000) map.setZoom(8);
      else if (radius > 5000) map.setZoom(9);
      else if (radius <= 10000) map.setZoom(10);
      setZoom(map.getZoom() as number);
    });

    circle.addListener("center_changed", () => {
      const center = circle.getCenter()?.toJSON();

      if (center) {
        setCenter(center as PinLocation);
        map.setCenter(center);
      }
    });
  };

  return (
    <div>
      <label className="uppercase">Distance</label>
      {center && !error && (
        <div ref={mapRef} className="w-full h-48 bg-gray-200"></div>
      )}

      {error && (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!center && !error && (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center animate-pulse"></div>
      )}
    </div>
  );
}
