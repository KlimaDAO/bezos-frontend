import { cx } from "@emotion/css";
import { fetcher } from "@klimadao/carbonmark/lib/fetcher";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { Vintage } from "components/Vintage";
import { useFetchProject } from "hooks/useFetchProject";
import { formatToPrice } from "lib/formatNumbers";
import {
  getActiveListings,
  getAllListings,
  getLowestPriceFromBuyOptions,
  sortPricesAndListingsByBestPrice,
} from "lib/listingsGetter";
import { PriceFlagged, ProjectBuyOption } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { ProjectPageStaticProps } from "pages/projects/[project_id]";
import { SWRConfig } from "swr";
import { PoolPrice } from "./BuyOptions/PoolPrice";
import { SellerListing } from "./BuyOptions/SellerListing";
import { ProjectMap } from "./ProjectMap";
import * as styles from "./styles";

const isPoolPrice = (option: ProjectBuyOption): option is PriceFlagged =>
  (option as PriceFlagged).isPoolProject !== undefined;

const Page: NextPage<ProjectPageStaticProps> = (props) => {
  const { project } = useFetchProject(props.projectID, {
    // https://swr.vercel.app/docs/api
    revalidateOnMount: true,
    refreshInterval: 10000,
  });

  const allListings =
    project &&
    Array.isArray(project?.listings) &&
    getAllListings(project?.listings);
  const activeListings =
    (project &&
      Array.isArray(project?.listings) &&
      getActiveListings(project.listings)) ||
    [];
  const poolPrices =
    (project &&
      Array.isArray(project?.prices) &&
      // Remove pool prices if the quantity is less than 1. (leftover  token 'dust')
      project.prices.filter((p) => Number(p.leftToSell) > 1)) ||
    [];

  const sortedListingsAndPrices = sortPricesAndListingsByBestPrice(
    poolPrices,
    activeListings
  );

  const bestPrice =
    !!sortedListingsAndPrices.length &&
    getLowestPriceFromBuyOptions(sortedListingsAndPrices);

  const pricesOrListings =
    project &&
    !!sortedListingsAndPrices.length &&
    sortedListingsAndPrices.map((option, index) => {
      if (isPoolPrice(option)) {
        return (
          <PoolPrice
            key={option.singleUnitPrice + index}
            price={option}
            project={project}
            isBestPrice={bestPrice === option.singleUnitPrice}
          />
        );
      }

      return (
        <SellerListing
          key={option.singleUnitPrice + index}
          project={project}
          listing={option}
          isBestPrice={bestPrice === option.singleUnitPrice}
        />
      );
    });

  return (
    <>
      <PageHead
        title={`${props.project.registry}-${props.projectID} | Carbonmark`}
        mediaTitle={`${props.project.registry}-${props.projectID} | ${props.project.name}`}
        metaDescription={t`View and purchase this carbon offset project on Carbonmark`}
      />

      <Layout>
        <div className={styles.projectControls}>
          <LoginButton className="desktopLogin" />
        </div>

        {!project && (
          <div className={styles.projectHeader}>
            <Text>
              <Trans>Sorry, we could not find any data for the project:</Trans>{" "}
              {props.projectID}
            </Text>
            <Text>
              <Link href="/projects">
                <Trans>Go back to all projects</Trans>
              </Link>
            </Text>
          </div>
        )}

        {project && (
          <>
            <div className={styles.projectHeader}>
              {!!project.category?.id && (
                <ProjectImage category={project.category.id} />
              )}
              <div className={styles.imageGradient} />
              <Text t="h4" className={styles.projectHeaderText}>
                {project.name || "Error - No project name found"}
              </Text>
              <div className={styles.tags}>
                <Text t="h5" className={styles.projectHeaderText}>
                  {project.registry}-{project.projectID}
                </Text>
                <Vintage vintage={project.vintage} />
                {!!project.category?.id && (
                  <Category category={project.category.id} />
                )}
              </div>
            </div>

            <div className={styles.meta}>
              <div className="best-price">
                {bestPrice && (
                  <>
                    <Text t="h5" className="best-price-badge">
                      {formatToPrice(bestPrice)}
                    </Text>
                    <Text t="h5" color="lighter">
                      <Trans>Best Price</Trans>
                    </Text>
                  </>
                )}
              </div>

              <div className="methodology">
                <Text t="h5" color="lighter">
                  <Trans>Methodology</Trans>
                </Text>
                <Text t="body1" color="lighter" align="end">
                  {project.registry}-{project.projectID}
                </Text>
              </div>
            </div>
            <div
              className={cx(styles.mapAndDescription, {
                hasMap: !!project.location,
              })}
            >
              {project.location && (
                <div className="mapColumn">
                  <ProjectMap
                    lat={project.location?.geometry.coordinates[1]}
                    lng={project.location?.geometry.coordinates[0]}
                    zoom={5}
                  />
                </div>
              )}
              <div className="descriptionColumn">
                <Text t="h5" color="lighter">
                  <Trans>Description</Trans>
                </Text>
                <Text t="body1">
                  {project.description ?? "No project description found"}
                </Text>
              </div>
            </div>

            <div className={styles.listingsHeader}>
              <Text t="h4">Listings</Text>
              {sortedListingsAndPrices ? (
                <Text t="body1">
                  We found <strong>{sortedListingsAndPrices.length}</strong>{" "}
                  prices for this project:
                </Text>
              ) : (
                <Text t="body1" color="default">
                  <i>
                    <Trans>No listings found for this project.</Trans>
                  </i>
                </Text>
              )}
            </div>

            <div className={styles.listingsAndStats}>
              <div className="listingsColumn">{pricesOrListings || null}</div>
              <div className="statsColumn">
                <Stats
                  description={t`Data for this project and vintage`}
                  currentSupply={project.currentSupply}
                  totalRetired={project.totalRetired}
                  allListings={allListings || []}
                  activeListings={activeListings || []}
                />
                <Activities
                  activities={project.activities || []}
                  showTitles={false}
                />
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export const Project: NextPage<ProjectPageStaticProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      fallback: {
        [`/api/projects/${props.projectID}`]: props.project,
      },
    }}
  >
    <Page {...props} />
  </SWRConfig>
);
