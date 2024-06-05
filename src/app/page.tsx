"use client";

import { useEffect, useState } from "react";

import { Ad } from "@/models/Ad";
import { AdCard } from "@/components/ad-card";
import { SearchForm } from "@/components/search-form";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = (params?: URLSearchParams) => {
    const url = `/api/ads?${params?.toString() || ""}`;

    fetch(url)
      .then((res) => res.json())
      .then((adsDocs) => {
        setAds(adsDocs);
      });
  };

  const handleSearch = (formData: FormData) => {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    fetchAds(params);
  };

  return (
    <main className="flex flex-col md:flex-row w-full">
      <SearchForm action={handleSearch} />

      <div className="grow md:w-3/4 p-4 bg-gray-100 h-screen">
        <h2 className="font-bold text-xl">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ads.length === 0 && (
            <p className="text-gray-500 mt-8">No products found...</p>
          )}

          {ads.map((ad) => (
            <AdCard key={ad._id} ad={ad} />
          ))}
        </div>
      </div>
    </main>
  );
}
