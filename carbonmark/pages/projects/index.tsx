import { Projects } from "components/pages/Projects";
import { getCarbonmarkProjects } from "lib/carbonmark";
import { loadTranslation } from "lib/i18n";
import { Project } from "lib/types/carbonmark";
import { GetStaticProps } from "next";

interface PageProps {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  try {
    const projects = await getCarbonmarkProjects();
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        projects,
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
