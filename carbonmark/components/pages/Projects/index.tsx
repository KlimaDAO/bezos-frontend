import { Text } from "@klimadao/lib/components";
import { Project } from "@klimadao/lib/types/carbonmark";
import { getCarbonmarkUser } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { ProjectImage } from "components/ProjectImage";
import { PageHead } from "components/shared/PageHead";
import { Vintage } from "components/Vintage";
import { createProjectLink } from "lib/createUrls";
import { formatBigToPrice } from "lib/formatNumbers";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as styles from "./styles";
type Props = {
  projects: Project[];
};

export const Projects: NextPage<Props> = (props) => {
  const { locale } = useRouter();

  const hasProjects = !!props.projects.length;
  const sortedProjects =
    hasProjects &&
    props.projects.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

  useEffect(() => {
    const getAll = async () => {
      const user = await getCarbonmarkUser({
        type: "wallet",
        user: "0xD1a3699f2098ac92C2f4914979FCb22aba86D259",
      });

      console.log("user", user);
    };
    getAll();
  }, []);

  return (
    <>
      <PageHead
        title={t`Projects | Carbonmark`}
        mediaTitle={t`Browse Carbon Projects | Carbonmark`}
        metaDescription={t`Browse our massive inventory of verified carbon offset projects. Buy, sell, or offset in a few clicks.`}
      />

      <Layout>
        <div className={styles.list}>
          {sortedProjects &&
            sortedProjects.map((project, index) => (
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
                    <Text t="caption">{project.methodology}</Text>
                    <div className={styles.tags}>
                      {!!project.category?.id && (
                        <Category category={project.category.id} />
                      )}
                      {project.isPoolProject && (
                        <SyncOutlinedIcon fontSize="large" />
                      )}
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
