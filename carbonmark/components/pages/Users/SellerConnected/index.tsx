import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { Activities } from "components/Activities";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { CreateListing } from "components/CreateListing";
import { LoginButton } from "components/LoginButton";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { addProjectsToAssets } from "lib/actions";
import { getActivityIsUpdated } from "lib/getActivityIsUpdated";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import {
  getActiveListings,
  getAllListings,
  getSortByUpdateListings,
} from "lib/listingsGetter";
import { AssetForListing, User } from "lib/types/carbonmark";
import { FC, useEffect, useRef, useState } from "react";
import { ProfileButton } from "../ProfileButton";
import { ProfileHeader } from "../ProfileHeader";
import { EditProfile } from "./Forms/EditProfile";
import { ListingEditable } from "./ListingEditable";
import * as styles from "./styles";

type Props = {
  userName: string;
  userAddress: string;
};

export const SellerConnected: FC<Props> = (props) => {
  const initialUser = useRef<User | null>(null);
  const fetchIntervalTimer = useRef<NodeJS.Timeout | undefined>();

  const [interval, setInterval] = useState(0);
  const { carbonmarkUser, mutate: mutateUser } = useFetchUser(
    props.userAddress,
    {
      refreshInterval: interval,
      revalidateIfStale: true,
      keepPreviousData: true,
    }
  );

  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isCarbonmarkUser = !!carbonmarkUser;
  const hasAssets = !!carbonmarkUser?.assets?.length;
  const allListings = getAllListings(carbonmarkUser?.listings ?? []);
  const activeListings = getActiveListings(carbonmarkUser?.listings ?? []);
  const sortedListings = getSortByUpdateListings(activeListings);
  const hasListings = !!activeListings.length;

  // load Assets every time user assets changed
  useEffect(() => {
    // stop loading assets when there are no assets to load
    if (isCarbonmarkUser && !hasAssets) {
      setIsLoadingAssets(false);
    }

    if (hasAssets) {
      const getProjectData = async () => {
        try {
          setIsLoadingAssets(true);

          const assetWithProjectTokens = getAssetsWithProjectTokens(
            carbonmarkUser.assets
          );

          if (assetWithProjectTokens.length) {
            const assetsData = await addProjectsToAssets({
              assets: assetWithProjectTokens,
            });

            // TODO: filter assets with balance > 0
            // this will be unnecessary as soon as bezos switched to mainnet

            const assetsWithBalance = assetsData.filter(
              (a) => Number(a.balance) > 0
            );

            if (assetsWithBalance.length) {
              setAssetsData(assetsWithBalance);
            }
          }
        } catch (e) {
          console.error(e);
          setErrorMessage(t`There was an error loading your assets. ${e}`);
        } finally {
          setIsLoadingAssets(false);
        }
      };

      getProjectData();
    }
  }, [carbonmarkUser?.assets]);

  const onEditProfile = (data: User) => {
    setErrorMessage("");
    const newData = { ...carbonmarkUser, ...data };
    // no need to wait or backend API for this small data change, update local state only
    mutateUser(newData, false);
    setShowEditProfileModal(false);
  };

  // when carbonmark user data changed
  useEffect(() => {
    // store first data and return
    if (!initialUser.current && carbonmarkUser) {
      initialUser.current = carbonmarkUser;
      return;
    }

    // when activity data differs => reset state and update initial user
    if (
      initialUser.current &&
      carbonmarkUser &&
      getActivityIsUpdated(initialUser.current, carbonmarkUser)
    ) {
      setInterval(0);
      setIsUpdatingUser(false);
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
    setIsUpdatingUser(true);

    // Show error message after 50 seconds
    fetchIntervalTimer.current = setTimeout(() => {
      setInterval(0);
      setIsUpdatingUser(false);
      setErrorMessage(
        t`Please refresh the page. There was an error updating your data.`
      );
    }, 50000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userControlsRow}>
        <ProfileButton onClick={() => setShowEditProfileModal(true)} />
        <LoginButton className="loginButton" />
      </div>
      <div className={styles.fullWidth}>
        <ProfileHeader
          handle={carbonmarkUser?.handle}
          userName={carbonmarkUser?.username || props.userName}
          isCarbonmarkUser={isCarbonmarkUser}
          description={carbonmarkUser?.description}
          profileImgUrl={carbonmarkUser?.profileImgUrl}
        />
      </div>
      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h4">
            <Trans>Listings</Trans>
          </Text>

          {errorMessage && (
            <Text t="h5" className={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}
        </div>
        <CarbonmarkButton
          label={
            isLoadingAssets ? (
              <Spinner />
            ) : (
              <>
                <span className={styles.addListingButtonText}>
                  <Trans id="profile.create_new_listing">
                    Create New Listing
                  </Trans>
                </span>
                <span className={styles.addListingButtonIcon}>
                  <AddIcon />
                </span>
              </>
            )
          }
          disabled={
            isLoadingAssets ||
            !hasAssets ||
            isUpdatingUser ||
            !assetsData?.length
          }
          onClick={() => setShowCreateListingModal(true)}
        />
      </div>

      <TwoColLayout>
        <Col>
          {isUpdatingUser && (
            <Card>
              <SpinnerWithLabel label={t`Updating your data...`} />
            </Card>
          )}
          {!hasListings && (
            <Text t="body1" color="lighter">
              <i>
                <Trans>No active listings.</Trans>
              </i>
            </Text>
          )}
          {!!sortedListings && (
            <ListingEditable
              listings={sortedListings}
              onFinishEditing={onUpdateUser}
              assets={assetsData || []}
            />
          )}
        </Col>

        <Col>
          <Stats
            allListings={allListings || []}
            activeListings={activeListings || []}
            description={t`Your seller data`}
          />
          <Activities
            activities={carbonmarkUser?.activities || []}
            isLoading={isUpdatingUser}
          />
        </Col>
      </TwoColLayout>

      <Modal
        title={t({
          id: "profile.edit_profile.title",
          message: "Your Profile",
        })}
        showModal={showEditProfileModal}
        onToggleModal={() => setShowEditProfileModal((s) => !s)}
      >
        <EditProfile
          user={carbonmarkUser}
          onSubmit={onEditProfile}
          isCarbonmarkUser={isCarbonmarkUser}
        />
      </Modal>

      {!!assetsData?.length && (
        <CreateListing
          onModalClose={() => setShowCreateListingModal(false)}
          onSubmit={onUpdateUser}
          assets={assetsData}
          showModal={showCreateListingModal}
        />
      )}
    </div>
  );
};
