import { LocateFixedIcon } from "lucide-react";

import { LocationPicker } from "@/components/location-picker";

type Props = {
  location: PinLocation;
  setLocation: React.Dispatch<React.SetStateAction<PinLocation>>;
};

export function GoogleMapArea({ location, setLocation }: Props) {
  const handlePickCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((ev) => {
      setLocation({
        lat: ev.coords.latitude,
        lng: ev.coords.longitude,
      });
    }, console.error);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <label className="mt-0 mb-0">Product Location</label>
        <button
          type="button"
          onClick={handlePickCurrentLocation}
          className="p-0.5 border text-gray-600 font-semibold rounded"
        >
          <LocateFixedIcon className="size-4" />
        </button>
      </div>

      <div className="mt-2 bg-gray-100 min-h-12 rounded overflow-hidden text-gray-400">
        <LocationPicker location={location} setLocation={setLocation} />
      </div>
    </div>
  );
}
