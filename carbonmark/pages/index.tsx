import { Project } from "@klimadao/lib/types/carbonmark";
import { getCarbonmarkProjects } from "@klimadao/lib/utils";
import { Home, Props } from "components/pages/Home";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

interface HomeProps extends Props {
  projects?: Project[];
  translation: string;
  fixedThemeName: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async (ctx) => {
  const projects = await getCarbonmarkProjects();
  const translation = await loadTranslation(ctx.locale);
  return {
    props: { projects, translation, fixedThemeName: "theme-light" },
    revalidate: 600,
  };
};

export default Home;
