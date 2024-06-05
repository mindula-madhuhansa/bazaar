import { Search } from "@/components/search";
import { AdsList } from "@/components/ads-list";

interface Props {
  searchParams: {
    search: string;
  };
}

export default async function Home({ searchParams }: Props) {
  return (
    <main className="flex flex-col md:flex-row w-full">
      <Search />
      <AdsList searchParam={searchParams.search} />
    </main>
  );
}
