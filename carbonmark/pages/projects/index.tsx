import { Projects } from "components/pages/Projects";
import { sanitizeCategory } from "hooks/useFetchProjects";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Country, Project, Vintage } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

export interface ProjectsPageStaticProps {
  projects: Project[];
  /**@todo fix the Category type and remove CategoryName */
  categories: { id: string }[];
  countries: Country[];
  vintages: Vintage[];
}

export const getStaticProps: GetStaticProps<ProjectsPageStaticProps> = async (
  ctx
) => {
  try {
    const projects = await fetcher<Project[]>(urls.api.projects);
    const vintages = await fetcher<string[]>(urls.api.vintages);
    let categories = await fetcher<{ id: string }[]>(urls.api.categories);
    /** @note because the API is returning trailing empty spaces on some categories, trim them here */
    categories = categories.map(sanitizeCategory);
    const countries = await fetcher<Country[]>(urls.api.countries);
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
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
