import { Projects } from "components/pages/Projects";
import { getCarbonmarkProjects } from "lib/carbonmark";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Category, Country, Project } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

export interface ProjectsPageProps {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async (
  ctx
) => {
  try {
    const projects = await getCarbonmarkProjects();
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
        translation,
        fixedThemeName: "theme-light",
        /**
         * Prefill our API responses with server side fetched data
         * see: https://swr.vercel.app/docs/with-nextjs#pre-rendering-with-default-data
         */
        fallback: {
          "/api/vintages": vintages,
          "/api/categories": categories,
          "/api/countries": countries,
        },
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
