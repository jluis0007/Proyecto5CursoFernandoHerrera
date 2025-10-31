import { HeroGridCard } from "./HeroGridCard";

export const HeroGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {/* Hero Card 1 - Superman */}
      <HeroGridCard
        active={true}
        marca="DC"
        isHeroe={true}
        name="Clark Kent"
        alias="Superman"
        description="The Last Son of Krypton, protector of Earth and symbol of hope for all humanity."
        team="Justice League"
        firstAppeard="1938"
        powers={["Super Strength", "Flight"]}
      />
    </div>
  );
};
