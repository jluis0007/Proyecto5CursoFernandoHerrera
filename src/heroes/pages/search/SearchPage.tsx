import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-hero.action";
import { useQuery } from "@tanstack/react-query";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const team = searchParams.get("team") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const universe = searchParams.get("universe") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;
  /* const activeTab = searchparams.get("tab") ?? "all";
  const limit = searchparams.get("limit") ?? "6";
  const category = searchparams.get("category") ?? "all";
    const { data: heroesResponse } = usePaginateHero(+page, +limit, category);
    
    
    export const usePaginateHero = (
      page: number,
      limit: number,
      category: string = "all"
    ) => {
      return useQuery({
        queryKey: ["heroes", { page, limit, category }],
        queryFn: () => getHeroesByPageAction(+page, +limit, category),
        staleTime: 1000 * 60 * 5,
      });
    };
    */

  const { data: heroes = [] } = useQuery({
    queryKey: ["heroes", { name, team, category, status, strength }],
    queryFn: () =>
      searchHeroesAction({ name, team, category, universe, status, strength }),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />
      {/* Breadcrum */}
      <CustomBreadcrums
        currectPage="Buscador de héroes"
        /* breadcrums={[
          { label: "Home1", to: "/" },
          { label: "Home2", to: "/" },
          { label: "Home3", to: "/" },
        ]} */
      />
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      {/* */}
      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
