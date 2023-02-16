import { GridContainer, Section } from "@klimadao/lib/components";
import { Text } from "../../shared/Text";

import { t, Trans } from "@lingui/macro";
import { NextPage } from "next";
import * as styles from "./styles";

import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/shared/Navigation";
import { ArticlesSlider } from "./FeaturedArticles/ArticlesSlider";
import { ResourcesList } from "./ResourcesList";

import { Document, FeaturedPost } from "lib/queries";

export interface Props {
  documents: Document[];
  featuredArticles: FeaturedPost[];
}

export const Resources: NextPage<Props> = (props) => {
  return (
    <GridContainer>
      <PageHead
        title={t`CarbonMark | Resources`}
        mediaTitle={t`CarbonMark News & Resources`}
        metaDescription={t`Updates, guides and more from the CarbonMark team`}
      />

      <Navigation activePage="Resources" showThemeToggle={false} />

      {!!props.featuredArticles?.length && (
        <Section variant="gray" className={styles.sectionHead}>
          <div className={styles.header}>
            <Text t="h1" align="center">
              <Trans id="resources.page.header.title">Featured Articles</Trans>
            </Text>
            <Text t="body3" align="center">
              <Trans id="resources.page.header.subline">
                Updates and thought leadership from the CarbonMark team.
              </Trans>
            </Text>
          </div>
        </Section>
      )}

      {!!props.featuredArticles?.length && (
        <Section variant="gray" style={{ padding: "unset" }}>
          <ArticlesSlider articles={props.featuredArticles} />
        </Section>
      )}

      <ResourcesList documents={props.documents} />

      <Footer />
    </GridContainer>
  );
};
