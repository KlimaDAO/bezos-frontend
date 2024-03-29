import { cx } from "@emotion/css";
import { t, Trans } from "@lingui/macro";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { Activities } from "components/Activities";
import { Category } from "components/Category";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { Vintage } from "components/Vintage";
import { formatList, formatToPrice } from "lib/formatNumbers";
import {
  getActiveListings,
  getAllListings,
  getLowestPriceFromBuyOptions,
  sortPricesAndListingsByBestPrice,
} from "lib/listingsGetter";
import {
  CategoryName,
  PriceFlagged,
  Project as ProjectType,
  ProjectBuyOption,
} from "lib/types/carbonmark";
import { NextPage } from "next";
import { PoolPrice } from "./BuyOptions/PoolPrice";
import { SellerListing } from "./BuyOptions/SellerListing";
import { ProjectMap } from "./ProjectMap";
import * as styles from "./styles";

type Props = {
  project: ProjectType;
};

const isPoolPrice = (option: ProjectBuyOption): option is PriceFlagged =>
  (option as PriceFlagged).isPoolProject !== undefined;

export const Project: NextPage<Props> = (props) => {
  const allListings =
    Array.isArray(props.project.listings) &&
    getAllListings(props.project.listings);
  const activeListings =
    (Array.isArray(props.project.listings) &&
      getActiveListings(props.project.listings)) ||
    [];

  const category = props.project.methodologies[0].category as CategoryName;
  const allMethodologyIds =
    props.project?.methodologies?.map(({ id }) => id) || [];
  const allMethodologyNames =
    props.project?.methodologies?.map(({ name }) => name) || [];

  const poolPrices =
    (Array.isArray(props.project?.prices) &&
      // Remove pool prices if the quantity is less than 1. (leftover  token 'dust')
      props.project.prices.filter((p) => Number(p.leftToSell) > 1)) ||
    [];

  const sortedListingsAndPrices = sortPricesAndListingsByBestPrice(
    poolPrices,
    activeListings
  );

  const bestPrice =
    !!sortedListingsAndPrices.length &&
    getLowestPriceFromBuyOptions(sortedListingsAndPrices);

  const pricesOrListings =
    !!sortedListingsAndPrices.length &&
    sortedListingsAndPrices.map((option, index) => {
      if (isPoolPrice(option)) {
        return (
          <PoolPrice
            key={option.singleUnitPrice + index}
            price={option}
            project={props.project}
            isBestPrice={bestPrice === option.singleUnitPrice}
          />
        );
      }

      return (
        <SellerListing
          key={option.singleUnitPrice + index}
          project={props.project}
          listing={option}
          isBestPrice={bestPrice === option.singleUnitPrice}
        />
      );
    });

  return (
    <>
      <PageHead
        title={`${props.project.registry}-${props.project.projectID} | Carbonmark`}
        mediaTitle={`${props.project.registry}-${props.project.projectID} | ${props.project.name}`}
        metaDescription={t`View and purchase this carbon offset project on Carbonmark`}
      />

      <Layout>
        <div className={styles.projectControls}>
          <LoginButton className="desktopLogin" />
        </div>
        <div className={styles.projectHeader}>
          <ProjectImage category={category} />
          <div className={styles.imageGradient} />
          <Text t="h4" className={styles.projectHeaderText}>
            {props.project.name || "Error - No project name found"}
          </Text>
          <div className={styles.tags}>
            <Text t="h5" className={styles.projectHeaderText}>
              {props.project.registry}-{props.project.projectID}
            </Text>
            <Vintage vintage={props.project.vintage} />
            <Category category={category} />
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

          <div className={styles.methodology}>
            <Text t="h5" color="lighter" align="end">
              <Trans>Methodology</Trans>
            </Text>
            <Text t="body1" color="lighter" align="end">
              {formatList(allMethodologyIds, "narrow")}
              {props?.project?.methodologies?.length && (
                <TextInfoTooltip
                  className={styles.infoContent}
                  tooltip={formatList(allMethodologyNames, "short")}
                >
                  <InfoOutlined />
                </TextInfoTooltip>
              )}
            </Text>
          </div>
        </div>
        <div
          className={cx(styles.mapAndDescription, {
            hasMap: !!props.project.location,
          })}
        >
          {props.project.location && (
            <div className="mapColumn">
              <ProjectMap
                lat={props.project.location?.geometry.coordinates[1]}
                lng={props.project.location?.geometry.coordinates[0]}
                zoom={5}
              />
            </div>
          )}
          <div className="descriptionColumn">
            <Text t="h5" color="lighter">
              <Trans>Description</Trans>
            </Text>
            <Text t="body1">
              {props.project.description ?? "No project description found"}
            </Text>
          </div>
        </div>

        <div className={styles.listingsHeader}>
          <Text t="h4">Listings</Text>
          {sortedListingsAndPrices ? (
            <Text t="body1">
              We found <strong>{sortedListingsAndPrices.length}</strong> prices
              for this project:
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
              currentSupply={props.project.currentSupply}
              totalRetired={props.project.totalRetired}
              allListings={allListings || []}
              activeListings={activeListings || []}
            />
            <Activities
              activities={props.project.activities || []}
              showTitles={false}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};
