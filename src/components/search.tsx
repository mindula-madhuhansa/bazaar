"use client";

export function Search() {
  const handleSearch = (formData: FormData) => {
    const searchParams = new URLSearchParams();
    searchParams.append("search", (formData.get("search") as string) || "");
    const url = new URL(window.location.href);
    url.search = searchParams.toString();
    window.location.href = url.toString();
  };

  return (
    <form action={handleSearch} className="bg-white grow md:w-1/4 p-4 border-r">
      <input name="search" type="text" placeholder="Search Bazaar" />
    </form>
  );
}
