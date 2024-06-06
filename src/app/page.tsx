"use client";

import { useState } from "react";

import { Ad } from "@/models/Ad";
import { defaultRadius } from "@/constants";
import { AdCard } from "@/components/ad-card";
import { SearchForm } from "@/components/search-form";
import { AdSkeleton } from "@/components/ad-skeleton";

export default function Home() {
  const [ads, setAds] = useState<Ad[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAds = (params?: URLSearchParams) => {
    if (!params) {
      params = new URLSearchParams();
    }

    if (!params.get("center")) return;

    if (!params.has("radius")) {
      params.set("radius", defaultRadius.toString());
    }

    const url = `/api/ads?${params?.toString() || ""}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
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
    <main className="flex flex-col md:flex-row w-full bg-gray-100">
      <SearchForm action={handleSearch} />

      <div className="grow md:w-2/3 lg:w-3/4 p-4 bg-gray-100 h-full">
        <h2 className="font-bold text-xl">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ads && ads.map((ad) => <AdCard key={ad._id} ad={ad} />)}

          {loading && (
            <>
              <AdSkeleton />
              <AdSkeleton />
              <AdSkeleton />
              <AdSkeleton />
            </>
          )}

          {ads === null && !loading && (
            <p className="text-gray-500 mt-8">No products found...</p>
          )}
        </div>
      </div>
    </main>
  );
}
