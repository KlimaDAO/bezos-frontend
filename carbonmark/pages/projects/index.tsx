import { Projects } from "components/pages/Projects";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Country, Project, Vintage } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

export interface ProjectsPageStaticProps {
  projects: Project[];
  countries: Country[];
  vintages: Vintage[];
}

export const getStaticProps: GetStaticProps<ProjectsPageStaticProps> = async (
  ctx
) => {
  try {
    const projects = await fetcher<Project[]>(urls.api.projects);
    const vintages = await fetcher<string[]>(urls.api.vintages);
    const countries = await fetcher<Country[]>(urls.api.countries);
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        projects,
        vintages,
        countries,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Projects Page", e);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export default Projects;
