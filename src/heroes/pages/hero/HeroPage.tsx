import { useParams } from "react-router";

export const HeroPage = () => {
  const { isSlug = "" } = useParams();
  console.log({ isSlug });
  return <div>HeroPage</div>;
};
