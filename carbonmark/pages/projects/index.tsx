import { Projects } from "components/pages/Projects";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Category, Country, Project, Vintage } from "lib/types/carbonmark";
import { isNil } from "lodash";
import { GetServerSideProps } from "next";

export interface ProjectsPageStaticProps {
  projects: Project[];
  categories: Category[];
  countries: Country[];
  vintages: Vintage[];
}

export const getServerSideProps: GetServerSideProps<
  ProjectsPageStaticProps
> = async (ctx) => {
  try {
    const searchParams = !isNil(ctx.query.categories)
      ? `?${new URLSearchParams({ category: ctx.query.categories })}`
      : "";
    console.log(searchParams);

    // const projects = await fetcher<Project[]>(urls.api.projects);
    const projects = await fetcher<Project[]>(urls.api.projects + searchParams);

    const vintages = await fetcher<string[]>(urls.api.vintages);
    const categories = await fetcher<Category[]>(urls.api.categories);
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
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Projects Page", e);
    return {
      notFound: true,
    };
  }
};

export default Projects;
