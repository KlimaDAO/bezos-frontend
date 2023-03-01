import { Projects } from "components/pages/Projects";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Category, Country, Project, Vintage } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

export interface ProjectsPageStaticProps {
  projects: Project[];
  categories: Category[];
  countries: Country[];
  vintages: Vintage[];
}

export const getStaticProps: GetStaticProps<ProjectsPageStaticProps> = async (
  ctx
) => {
  try {
    const projects = await fetcher<Project[]>(urls.api.projects);
    const vintages = await fetcher<string[]>(urls.api.vintages);
    const categories = await fetcher<Category[]>(urls.api.categories);
    const countries = await fetcher<Country[]>(urls.api.countries);
    console.log("loaded locale", ctx.locale);
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      console.log("no translation found", ctx.locale);
      throw new Error("No translation found");
    }

    return {
      props: {
        projects,
        vintages,
        categories,
        countries,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Projects Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export default Projects;
