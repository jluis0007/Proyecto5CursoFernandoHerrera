import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "../../components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "favorites" | "heroes" | "villains"
  >("all");

  const { data: heroesResponse } = useQuery({
    queryKey: ["heroes"],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5,
  });
  //console.log({ heroesResponse });

  /* useEffect(() => {
    getHeroesByPage().then();
  }, []); */

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
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => setActiveTab("favorites")}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => setActiveTab("villains")}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {/* Character Grid Mostrar todos los personajes*/}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Character Grid Mostrar todos los personajes favoritos*/}
            <h1>Favoritos</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Character Grid Mostrar todos los personajes héroes*/}
            <h1>Héroes</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Character Grid Mostrar todos los personajes villanos*/}
            <h1>Villanos</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={8} />
      </>
    </>
  );
};
