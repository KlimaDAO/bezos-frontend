import { Spinner } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { CreateListing } from "components/CreateListing";
import { Layout } from "components/Layout";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { addProjectsToAssets } from "lib/actions";
import { getUser } from "lib/api";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import { getActiveListings, getAllListings } from "lib/listingsGetter";
import { pollUntil } from "lib/pollUntil";
import { AssetForListing, User } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AssetProject } from "./AssetProject";
import { Balances } from "./Balances";
import * as styles from "./styles";

export const Portfolio: NextPage = () => {
  const { isConnected, address, toggleModal } = useWeb3();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);
  const [assetToSell, setAssetToSell] = useState<AssetForListing | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const hasAssets = !isLoadingAssets && !!user?.assets?.length;
  const assetWithProjectTokens =
    !!user?.assets?.length && getAssetsWithProjectTokens(user.assets);
  const hasListings = !isLoadingUser && !!user?.listings?.length;
  const allListings = hasListings && getAllListings(user.listings);
  const activeListings = hasListings && getActiveListings(user.listings);

  const isConnectedUser = isConnected && address;
  const isLoading = isLoadingUser || isLoadingAssets;

  useEffect(() => {
    if (!isConnectedUser) return;

    const getInitialUserData = async () => {
      try {
        setIsLoadingUser(true);
        const newUser = await getUser({
          type: "wallet",
          user: address,
        });
        setUser(newUser);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    !user && getInitialUserData();
  }, [isConnectedUser]);

  // load Assets every time user changed
  useEffect(() => {
    if (hasAssets && address) {
      const getAssetsData = async () => {
        try {
          setIsLoadingAssets(true);

          if (assetWithProjectTokens) {
            const assetsWithProject = await addProjectsToAssets({
              assets: assetWithProjectTokens,
            });
            // TODO: filter assets with balance > 0
            // this will be unnecessary as soon as bezos switched to mainnet

            const assetsWithBalance = assetsWithProject.filter(
              (a) => Number(a.balance) > 0
            );

            setAssetsData(assetsWithBalance);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoadingAssets(false);
        }
      };

      getAssetsData();
    }
  }, [user]);

  const onUpdateUser = async () => {
    if (!user) return; // TS typeguard

    try {
      setErrorMessage("");
      setIsLoadingUser(true);

      const fetchUser = () =>
        getUser({
          user: user.wallet,
          type: "wallet",
        });

      // API is updated when new activity exists
      const activityIsAdded = (value: User) => {
        const newActivityLength = value.activities.length;
        const currentActivityLength = user.activities.length;
        return newActivityLength > currentActivityLength;
      };

      const updatedUser = await pollUntil({
        fn: fetchUser,
        validate: activityIsAdded,
        ms: 1000,
        maxAttempts: 50,
      });

      updatedUser && setUser((prev) => ({ ...prev, ...updatedUser }));
    } catch (e) {
      console.error("LOAD USER ACTIVITY error", e);
      setErrorMessage(
        t`Please refresh the page. There was an error updating your data: ${e}.`
      );
    } finally {
      setIsLoadingUser(false);
    }
  };

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
                  <Trans>Loading your data...</Trans>
                </Text>
              </div>
            )}

            {errorMessage && (
              <Text t="h5" className={styles.errorMessage}>
                {errorMessage}
              </Text>
            )}

            {isConnectedUser &&
              !isLoading &&
              !!assetsData &&
              assetsData.map((a) => (
                <AssetProject
                  key={a.tokenAddress}
                  asset={a}
                  onSell={() => setAssetToSell(a)}
                />
              ))}

            {!!assetToSell && (
              <CreateListing
                onModalClose={() => setAssetToSell(null)}
                onSubmit={onUpdateUser}
                assets={[assetToSell]}
                showModal={!!assetToSell}
                successScreen={
                  <Text>
                    <Trans>
                      Success. Go to your{" "}
                      <Link href={`/users/${address}`}>Profile page</Link> to
                      see your new listing.
                    </Trans>
                  </Text>
                }
              />
            )}

            {isConnectedUser && !isLoading && !assetsData && (
              <Text>
                <Trans>
                  We couldn't find any C3 tokens in your connected wallet :(
                </Trans>
              </Text>
            )}
          </Col>

          <Col>
            <Balances />
            <Stats
              allListings={allListings || []}
              activeListings={activeListings || []}
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
