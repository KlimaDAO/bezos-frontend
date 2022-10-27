import { NextPage } from "next";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";
import { Project } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  projects: Project[];
};

const createProjectLink = (project: Project) =>
  `/marketplace/projects/${project.key}-${project.vintage}`;

export const MarketPlaceProjects: NextPage<Props> = (props) => {
  const hasProjects = !!props.projects.length;
  return (
    <>
      <PageHead
        title="KlimaDao - Marketplace Projects"
        mediaTitle="KlimaDao - Marketplace Projects"
        metaDescription="KlimaDao - Marketplace Projects"
      />

      <MarketplaceLayout>
        <div className={styles.fullWidth}>
          <Text t="h1">All Projects</Text>
        </div>

        {hasProjects &&
          props.projects.map((project) => (
            <div className={styles.fullWidth} key={project.key}>
              <Text t="h3">Name: {project.name}</Text>
              <Text t="caption">ID: {project.id}</Text>
              <Text t="caption">ProjectAddress: {project.projectAddress}</Text>
              <Text t="caption">ProjectID: {project.projectID}</Text>
              <Text t="caption">Registry: {project.registry}</Text>
              <Text t="caption">Vintage: {project.vintage}</Text>
              <Text t="caption">Methodology: {project.methodology}</Text>
              <ButtonPrimary
                href={createProjectLink(project)}
                label="Link to Project"
                className={styles.projectLink}
              ></ButtonPrimary>
            </div>
          ))}
        {!hasProjects && (
          <div className={styles.fullWidth}>
            <Text>No projects found from Marketplace API</Text>
          </div>
        )}
      </MarketplaceLayout>
    </>
  );
};
