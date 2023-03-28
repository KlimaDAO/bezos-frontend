import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { LoginButton } from "components/LoginButton";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { createProjectPurchaseLink } from "lib/createUrls";
import {
  getActiveListings,
  getAllListings,
  getSortByUpdateListings,
} from "lib/listingsGetter";
import { FC } from "react";
import { Listing } from "../Listing";
import { ProfileHeader } from "../ProfileHeader";
import * as styles from "./styles";

type Props = {
  userAddress: string;
  userName: string;
};

export const SellerUnconnected: FC<Props> = (props) => {
  const { carbonmarkUser } = useFetchUser(props.userAddress); // do we need an interval here too?

  const { address, isConnected, toggleModal } = useWeb3();

  const allListings = getAllListings(carbonmarkUser?.listings ?? []);
  const activeListings = getActiveListings(carbonmarkUser?.listings ?? []);
  const hasListings = !!activeListings.length;

  const sortedListings =
    !!activeListings &&
    !!activeListings.length &&
    getSortByUpdateListings(activeListings);

  return (
    <div className={styles.container}>
      <div className={styles.userControlsRow}>
        <LoginButton className="loginButton" />
      </div>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={carbonmarkUser?.username || props.userName}
          handle={carbonmarkUser?.handle}
          isCarbonmarkUser={!!carbonmarkUser}
          description={carbonmarkUser?.description}
          profileImgUrl={carbonmarkUser?.profileImgUrl}
        />
      </div>
      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h4">
            <Trans>Listings</Trans>
          </Text>
        </div>
      </div>

      <TwoColLayout>
        <Col>
          {!!sortedListings &&
            sortedListings.map((listing) => (
              <Listing key={listing.id} listing={listing}>
                {!address && !isConnected && (
                  <ButtonPrimary
                    className={styles.buyButton}
                    label={t({
                      id: "shared.connect_to_buy",
                      message: "Sign In / Connect To Buy",
                    })}
                    onClick={toggleModal}
                  />
                )}

                {address && isConnected && (
                  <ButtonPrimary
                    label={<Trans id="seller.listing.buy">Buy</Trans>}
                    className={styles.buyButton}
                    href={createProjectPurchaseLink(
                      listing.project,
                      listing.id
                    )}
                  />
                )}
              </Listing>
            ))}
          {!hasListings && (
            <Text t="body1" color="lighter">
              <i>
                <Trans>No active listings.</Trans>
              </i>
            </Text>
          )}
        </Col>
        <Col>
          <Stats
            description={t`Data for this seller`}
            allListings={allListings || []}
            activeListings={activeListings || []}
          />
          <Activities activities={carbonmarkUser?.activities || []} />
        </Col>
      </TwoColLayout>
    </div>
  );
};
