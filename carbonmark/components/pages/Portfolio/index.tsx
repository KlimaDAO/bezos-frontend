import { Spinner, Text } from "@klimadao/lib/components";
import { Asset, User } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Layout } from "components/Layout";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/shared/PageHead";
import { Stats } from "components/Stats";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { getUserAssetsData } from "lib/actions";
import { getUser } from "lib/api";
import {
  getActiveListings,
  getAllListings,
  getAmountLeftToSell,
  getTotalAmountSold,
} from "lib/listingsGetter";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import { Balances } from "./Balances";
import * as styles from "./styles";

export const Portfolio: NextPage = () => {
  const { isConnected, address, toggleModal } = useWeb3();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<Asset[] | null>(null);

  const hasAssets = !isLoadingAssets && !!user?.assets?.length;
  const hasListings = !isLoadingUser && !!user?.listings?.length;
  const allListings = hasListings && getAllListings(user.listings);
  const activeListings = hasListings && getActiveListings(user.listings);

  const isConnectedUser = isConnected && address;
  const isLoading = isLoadingUser || isLoadingAssets;

  useEffect(() => {
    if (!isConnectedUser) return;

    const getUserData = async () => {
      try {
        setIsLoadingUser(true);
        const user = await getUser({
          type: "wallet",
          user: address,
        });
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    !user && getUserData();
  }, [isConnectedUser]);

  // load Assets every time user changed
  useEffect(() => {
    if (hasAssets && address) {
      const getAssetsData = async () => {
        try {
          setIsLoadingAssets(true);
          const assetsData = await getUserAssetsData({
            assets: user.assets,
            userAddress: address,
          });

          // TODO: filter assets with balance > 0
          // this will be unnecessary as soon as bezos switched to mainnet

          const assetsWithBalance = assetsData.filter(
            (a) => Number(a.balance) > 0
          );

          setAssetsData(assetsWithBalance);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoadingAssets(false);
        }
      };

      getAssetsData();
    }
  }, [user]);

  return (
    <>
      <PageHead
        title="Carbonmark - Portfolio"
        mediaTitle="Carbonmark - Portfolio"
        metaDescription="Carbonmark - Portfolio"
      />

      <Layout>
        <TwoColLayout>
          <Col>
            {!isConnectedUser && (
              <LoginCard isLoading={isLoadingUser} onLogin={toggleModal} />
            )}

            {isConnectedUser && isLoading && (
              <div className={styles.fullWidth}>
                <Spinner />
                <Text className={styles.isLoading}>
                  <Trans>Loading...</Trans>
                </Text>
              </div>
            )}

            {isConnectedUser &&
              !isLoading &&
              !!assetsData &&
              assetsData.map((a) => (
                <AssetProject
                  key={a.projectId}
                  assetsData={a}
                  onSell={() => console.log("SELL")}
                />
              ))}

            {isConnectedUser && !isLoading && !assetsData && (
              <Text>
                <Trans>
                  We couldn't find any C3 tokens in your connected wallet :(
                </Trans>
              </Text>
            )}
          </Col>

          <Col>
            <Balances assetsData={assetsData} />
            <Stats
              stats={{
                tonnesSold:
                  (!!allListings && getTotalAmountSold(allListings)) || 0,
                tonnesOwned:
                  (!!activeListings && getAmountLeftToSell(activeListings)) ||
                  0,
                activeListings:
                  (!!activeListings && activeListings.length) || 0,
              }}
              description={t({
                id: "user.stats.your_seller_data.description",
                message: "Your seller data",
              })}
            />
            <Activities activities={user?.activities || []} />
          </Col>
        </TwoColLayout>
      </Layout>
    </>
  );
};
