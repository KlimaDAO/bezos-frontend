import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import { Text } from "@klimadao/lib/components";
import { Listing as ListingType } from "@klimadao/lib/types/marketplace";

import { Card } from "components/pages/Marketplace/shared/Card";
import { Category } from "components/pages/Marketplace/shared/Category";
import { ProjectImage } from "components/pages/Marketplace/shared/ProjectImage";
import { Vintage } from "components/pages/Marketplace/shared/Vintage";

import {
  formatBigToPrice,
  formatBigToTonnes,
} from "components/pages/Marketplace/lib/formatNumbers";

import * as styles from "./styles";

type Props = {
  listing: ListingType;
  children: ReactNode;
};

export const Listing: FC<Props> = (props) => {
  const { locale } = useRouter();
  return (
    <Card>
      <div className={styles.tags}>
        <Category category={props.listing.project.category.id} />
        <Vintage vintage={props.listing.project.vintage} />
      </div>
      <Text>{props.listing.project.name}</Text>
      <div className={styles.image}>
        <ProjectImage category={props.listing.project.category.id} />
      </div>
      <div className={styles.amounts}>
        <Text t="body4">
          {formatBigToPrice(props.listing.singleUnitPrice, locale)}
        </Text>
        <Text t="body6">
          <Trans id="marketplace.seller.listing.quantity_available">
            Quantity Available:
          </Trans>{" "}
          {formatBigToTonnes(props.listing.leftToSell, locale)}
        </Text>
      </div>
      {props.children}
    </Card>
  );
};
