import { Spinner, Text } from "@klimadao/lib/components";
import { Asset, User } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Layout } from "components/Layout";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import { Balances } from "./Balances";

import * as styles from "./styles";

export const Portfolio: NextPage = () => {
  const router = useRouter();
  const { isConnected, address } = useWeb3();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<null | User>(null);
  const [assetsData, setAssetsData] = useState<Asset[] | null>(null);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);

  const hasAssets = !!user?.assets?.length;
  const hasListings = !isLoading && !!user?.listings?.length;
  const allListings = hasListings && getAllListings(user.listings);
  const activeListings = hasListings && getActiveListings(user.listings);

  const shouldLoadUser = isConnected && address;
  const shouldRedirect = !isConnected && !isLoading;
  const showSpinner = !user || isLoadingAssets;

  useEffect(() => {
    if (!shouldLoadUser) return;

    const getUserData = async () => {
      try {
        const user = await getUser({
          type: "wallet",
          user: address,
        });
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !user && getUserData();
  }, [shouldLoadUser]);

  useEffect(() => {
    shouldRedirect && router.push(`/users/login`);
  }, [shouldRedirect]);

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
        {isLoading ||
          (showSpinner && (
            <div className={styles.fullWidth}>
              <Text>Loading your data</Text>
              <Spinner />
            </div>
          ))}

        {!isLoading && isConnected && !showSpinner && (
          <TwoColLayout>
            <Col>
              {!!assetsData &&
                assetsData.map((a) => (
                  <AssetProject
                    key={a.projectId}
                    assetsData={a}
                    onSell={() => console.log("SELL")}
                  />
                ))}
              {!assetsData && (
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
        )}
      </Layout>
    </>
  );
};
