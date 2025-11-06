import { useParams } from "react-router";

export const HeroPage = () => {
  const { isSlug = "" } = useParams();
  return <div>HeroPage</div>;
};
