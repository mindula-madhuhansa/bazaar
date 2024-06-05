"use client";

import { useEffect, useState } from "react";

import { Ad } from "@/models/Ad";
import { AdCard } from "@/components/ad-card";

export function AdsList({ searchParam }: { searchParam: string }) {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchAds(searchParam);
  }, [searchParam]);

  const fetchAds = (searchParam: string) => {
    const url = `/api/ads${searchParam ? `?phrase=${searchParam}` : ""}`;

    fetch(url)
      .then((res) => res.json())
      .then((adsDocs) => {
        setAds(adsDocs);
      });
  };

  return (
    <div className="grow md:w-3/4 p-4 bg-gray-100 h-screen">
      <h2 className="font-bold text-xl">Latest Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ads.length === 0 && (
          <p className="text-gray-500 mt-8">No products found...</p>
        )}

        {ads.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
