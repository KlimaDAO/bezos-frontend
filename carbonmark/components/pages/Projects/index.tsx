import { PoolIcon } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { PROJECT_SORT_FNS } from "components/ProjectFilterModal/constants";
import { ProjectImage } from "components/ProjectImage";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { Project } from "lib/types/carbonmark";
import { emptyOrIncludes } from "lib/utils/array.utils";
import { isEmpty } from "lodash";
import { filter, pipe } from "lodash/fp";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectsPageProps } from "pages/projects";
import { useContext } from "react";
import { ProjectsContext } from "./state/Projects.context";
import { ProjectsProvider } from "./state/Projects.provider";
import * as styles from "./styles";

const Component: NextPage<ProjectsPageProps> = (props) => {
  const {
    state: { filters },
  } = useContext(ProjectsContext);

  const { locale } = useRouter();

  /** Collate the selected filters */
  const filterFn = filter(
    ({ category, vintage }: Project) =>
      emptyOrIncludes(filters.categories, category?.id) &&
      emptyOrIncludes(filters.vintages, vintage)
  );

  /** Find the correct sort function based on the chosen state */
  const sortFn = PROJECT_SORT_FNS[filters.sort];

  const projects: Project[] = pipe(filterFn, sortFn)(props.projects);

  const hasProjects = !isEmpty(projects);

  return (
    <>
      <PageHead
        title={t`Projects | Carbonmark`}
        mediaTitle={t`Browse Carbon Projects | Carbonmark`}
        metaDescription={t`Browse our massive inventory of verified carbon offset projects. Buy, sell, or offset in a few clicks.`}
      />

      <Layout fullWidth={true}>
        <div className={styles.list}>
          {projects &&
            projects.map((project, index) => (
              <Link
                key={project.key + "-" + index}
                href={createProjectLink(project)}
                passHref
              >
                <div className={styles.card}>
                  <div className={styles.cardImage}>
                    {!!project.category?.id && (
                      <ProjectImage category={project.category.id} />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <Text t="h4">
                      {formatBigToPrice(project.price, locale)}
                    </Text>
                    <Text t="h5">
                      {project.name || "! MISSING PROJECT NAME !"}
                    </Text>
                    <Text t="body1">{project.methodology}</Text>
                    <div className={styles.tags}>
                      {!!project.category?.id && (
                        <Category category={project.category.id} />
                      )}
                      {project.isPoolProject && <PoolIcon />}
                      <Vintage vintage={project.vintage} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {!hasProjects && <Text>No projects found from Carbonmark API</Text>}
        </div>
      </Layout>
    </>
  );
};

export const Projects: NextPage<ProjectsPageProps> = (props) => (
  <ProjectsProvider>
    <Component {...props} />
  </ProjectsProvider>
);
