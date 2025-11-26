import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../../components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginateHero } from "@/heroes/hooks/usePaginateHero";

export const HomePage = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const activeTab = searchparams.get("tab") ?? "all";
  const page = searchparams.get("page") ?? "1";
  const limit = searchparams.get("limit") ?? "6";
  const category = searchparams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: heroesResponse } = usePaginateHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        {/* Breadcrum */}
        <CustomBreadcrums currectPage="Super Héroes" />
        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  return prev;
                })
              }
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  return prev;
                })
              }
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  return prev;
                })
              }
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  return prev;
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Character Grid Mostrar todos los personajes*/}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Character Grid Mostrar todos los personajes favoritos*/}
            <h1>Favoritos</h1>
            {/* <HeroGrid heroes={heroesResponse?.heroes ?? []} /> */}
          </TabsContent>
          <TabsContent value="heroes">
            {/* Character Grid Mostrar todos los personajes héroes*/}
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Character Grid Mostrar todos los personajes villanos*/}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
