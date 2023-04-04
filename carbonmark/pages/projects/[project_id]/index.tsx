import { Project } from "components/pages/Project";
import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { loadTranslation } from "lib/i18n";
import { Project as ProjectType } from "lib/types/carbonmark";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
interface Params extends ParsedUrlQuery {
  project_id: string;
}

export interface ProjectPageStaticProps {
  project: ProjectType;
  projectID: string;
}

export const getStaticProps: GetStaticProps<
  ProjectPageStaticProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;

  if (!params || !params?.project_id) {
    throw new Error("No matching params found");
  }

  try {
    const project = await fetcher<ProjectType>(
      `${urls.api.projects}/${params.project_id}`
    );
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        project,
        projectID: params.project_id,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Carbonnmark Project Page", e);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Project;
