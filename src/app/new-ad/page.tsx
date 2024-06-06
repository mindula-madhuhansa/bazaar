"use client";

import { AdForm } from "@/components/ad-form";
import { useEffect, useState } from "react";

export default function NewAdPage() {
  const [location, setLocation] = useState<PinLocation | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (ev) => {
        const { latitude, longitude } = ev.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error(err.message);
      }
    );
  }, []);

  return <AdForm defaultLocation={location} />;
}
