import type { Hero } from "./hero.interface";

export interface heroesResponse {
  total: number;
  pages: number;
  heroes: Hero[];
}
