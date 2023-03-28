import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { CreateListing } from "components/CreateListing";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { Col } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { addProjectsToAssets } from "lib/actions";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import { getActiveListings, getAllListings } from "lib/listingsGetter";
import { AssetForListing, User } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AssetProject } from "./AssetProject";
import { Balances } from "./Balances";
import * as styles from "./styles";

// API is updated when new activity exists
const activityWasAdded = (oldUser: User, newUser: User) => {
  const formerActivityLength = oldUser?.activities?.length || 0;
  const newActivityLength = newUser?.activities?.length || 0;
  return newActivityLength > formerActivityLength;
};

export const Portfolio: NextPage = () => {
  const { isConnected, address, toggleModal } = useWeb3();
  const initialUser = useRef<User | null>(null);
  const fetchIntervalTimer = useRef<NodeJS.Timeout | undefined>();

  const [interval, setInterval] = useState(0);
  const { carbonmarkUser } = useFetchUser(address, {
    revalidateOnMount: true,
    refreshInterval: interval,
    revalidateIfStale: true,
    keepPreviousData: true,
  });

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);
  const [assetToSell, setAssetToSell] = useState<AssetForListing | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const assetWithProjectTokens =
    !!carbonmarkUser?.assets?.length &&
    getAssetsWithProjectTokens(carbonmarkUser.assets);
  const hasListings = !isLoadingUser && !!carbonmarkUser?.listings?.length;
  const allListings = hasListings && getAllListings(carbonmarkUser.listings);
  const activeListings =
    hasListings && getActiveListings(carbonmarkUser.listings);

  const isConnectedUser = isConnected && address;
  const isLoading = isLoadingUser || isLoadingAssets;

  const hasAssets = !isLoadingAssets && !!assetWithProjectTokens;

  // load Assets every time assets changed
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
  }, [carbonmarkUser?.assets]);

  // when carbonmark user data changed
  useEffect(() => {
    // store first data and return
    if (!initialUser.current && carbonmarkUser) {
      initialUser.current = carbonmarkUser;
      setIsLoadingUser(false);
      return;
    }

    // when activity data differs => reset state and update initial user
    if (
      initialUser.current &&
      carbonmarkUser &&
      activityWasAdded(initialUser.current, carbonmarkUser)
    ) {
      setInterval(0);
      setIsLoadingUser(false);
      initialUser.current = carbonmarkUser;
      fetchIntervalTimer.current && clearTimeout(fetchIntervalTimer.current);
    }
  }, [carbonmarkUser]);

  // on unmount
  useEffect(() => {
    return () => {
      fetchIntervalTimer.current && clearTimeout(fetchIntervalTimer.current);
    };
  }, []);

  const onUpdateUser = async () => {
    // increase fetch interval
    // the useEffect above will take care of updated carbonmark user data
    setInterval(1000);
    setIsLoadingUser(true);

    // Show error message after 50 seconds
    fetchIntervalTimer.current = setTimeout(() => {
      setInterval(0);
      setIsLoadingUser(false);
      setErrorMessage(
        t`Please refresh the page. There was an error updating your data.`
      );
    }, 50000);
  };

  return (
    <>
      <PageHead
        title={t`Portfolio | Carbonmark`}
        mediaTitle={t`Portfolio | Carbonmark`}
        metaDescription={t`Manage your digital carbon assets and listings.`}
      />

      <Layout>
        <div className={styles.portfolioControls}>
          <LoginButton />
        </div>
        <div className={styles.portfolioContent}>
          <Col>
            {!isConnectedUser && (
              <LoginCard isLoading={isLoadingUser} onLogin={toggleModal} />
            )}

            {isConnectedUser && isLoading && <SpinnerWithLabel />}

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

            {isConnectedUser && !isLoading && !hasAssets && (
              <>
                <Text>
                  <Trans>No listable assets found.</Trans>
                </Text>
              </>
            )}
            {isConnectedUser && !isLoading && !carbonmarkUser && (
              <Text>
                <Trans>
                  Have you already created your Carbonmark{" "}
                  <Link href={`/users/${address}`}>Profile</Link>?
                </Trans>
              </Text>
            )}
          </Col>

          <Col className="statsColumn">
            <Balances />
            <Stats
              allListings={allListings || []}
              activeListings={activeListings || []}
              description={t`Your seller data`}
            />
            <Activities activities={carbonmarkUser?.activities || []} />
          </Col>
        </div>
      </Layout>
    </>
  );
};
