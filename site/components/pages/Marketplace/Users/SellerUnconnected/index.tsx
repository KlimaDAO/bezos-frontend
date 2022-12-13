import React, { FC } from "react";
import { User } from "@klimadao/lib/types/marketplace";
import { Trans } from "@lingui/macro";
import { Text } from "@klimadao/lib/components";
import { Activities } from "../Activities";
import { Stats } from "../Stats";
import { ProfileHeader } from "../ProfileHeader";
import { Listing } from "../Listing";
import {
  TwoColLayout,
  Col,
} from "components/pages/Marketplace/shared/TwoColLayout";
import { getTotalAmountSold, getTotalAmountToSell } from "../utils";

import * as styles from "./styles";

type Props = {
  marketplaceUser: User | null;
  userName: string;
};

export const SellerUnconnected: FC<Props> = (props) => {
  const userData = props.marketplaceUser;

  const hasListings = !!userData?.listings?.length;

  return (
    <>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={userData?.username || props.userName}
          isMarketplaceUser={!!userData}
          description={userData?.description}
        />
      </div>
      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h3">
            <Trans>Listings</Trans>
          </Text>

          {!hasListings && (
            <Text t="caption" color="lighter">
              <i>
                <Trans id="marketplace.profile.listings.empty_state">
                  No listings to show.
                </Trans>
              </i>
            </Text>
          )}
        </div>
      </div>

      <TwoColLayout>
        <Col>
          {hasListings &&
            userData.listings.map((listing) => (
              <Listing key={listing.id} listing={listing} />
            ))}
        </Col>
        <Col>
          <Stats
            stats={{
              tonnesSold:
                (hasListings && getTotalAmountSold(userData.listings)) || 0,
              tonnesOwned:
                (hasListings && getTotalAmountToSell(userData.listings)) || 0,
              activeListings:
                userData?.listings.filter((l) => l.active).length || 0,
            }}
          />
          <Activities activities={userData?.activities || []} />
        </Col>
      </TwoColLayout>
    </>
  );
};