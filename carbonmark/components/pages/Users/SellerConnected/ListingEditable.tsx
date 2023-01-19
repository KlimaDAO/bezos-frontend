import { Spinner, Text } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Modal } from "components/shared/Modal";
import { FC, useState } from "react";

import { Listing } from "../Listing";
import { EditListing, FormValues } from "./Forms/EditListing";

import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Transaction } from "components/Transaction";
import {
  deleteListingTransaction,
  getC3tokenToMarketplaceAllowance,
  onApproveCarbonmarkTransaction,
  updateListingTransaction,
} from "lib/actions";
import { formatToTonnes } from "lib/formatNumbers";
import { TransactionStatusMessage, TxnStatus } from "lib/statusMessage";

import { Asset, Listing as ListingType } from "@klimadao/lib/types/carbonmark";

import * as styles from "./styles";

type Props = {
  listings: ListingType[];
  assets: Asset[];
  onFinishEditing: () => void;
};

const getBalanceForListing = (
  listing: ListingType,
  assets: Asset[]
): number => {
  const matchingBalance = assets.find(
    (a) => a.tokenAddress.toLowerCase() === listing.tokenAddress.toLowerCase()
  )?.balance;
  return Number(matchingBalance ?? 0);
};

export const ListingEditable: FC<Props> = (props) => {
  const { provider, address } = useWeb3();
  const [listingToEdit, setListingToEdit] = useState<ListingType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState<FormValues | null>(null);
  const [status, setStatus] = useState<TransactionStatusMessage | null>(null);
  const [allowanceValue, setAllowanceValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPending =
    status?.statusType === "userConfirmation" ||
    status?.statusType === "networkConfirmation";

  const showTransactionView = !!inputValues && !!allowanceValue;

  const resetLocalState = () => {
    setInputValues(null);
    setAllowanceValue(null);
    setStatus(null);
    setListingToEdit(null);
  };

  const onModalClose = !isPending ? resetLocalState : undefined;

  const onUpdateStatus = (status: TxnStatus, message?: string) => {
    setStatus({ statusType: status, message: message });
  };

  const onFormSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      if (!address || !provider) return;
      const allowance = await getC3tokenToMarketplaceAllowance({
        tokenAddress: values.tokenAddress,
        userAddress: address,
        provider,
      });
      setAllowanceValue(allowance);
      setInputValues(values);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const hasApproval = () => {
    return (
      !!allowanceValue &&
      !!inputValues &&
      Number(allowanceValue) >= Number(inputValues.totalAmountToSell)
    );
  };

  const handleApproval = async () => {
    if (!provider || !inputValues) return;

    try {
      await onApproveCarbonmarkTransaction({
        tokenAddress: inputValues.tokenAddress,
        provider,
        value: inputValues.totalAmountToSell,
        onStatus: onUpdateStatus,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateListing = async () => {
    if (!provider || !inputValues || !listingToEdit) return; // typeguards

    try {
      await updateListingTransaction({
        listingId: listingToEdit.id,
        tokenAddress: inputValues.tokenAddress,
        provider,
        totalAmountToSell: inputValues.totalAmountToSell,
        singleUnitPrice: inputValues.singleUnitPrice,
        onStatus: onUpdateStatus,
      });

      resetLocalState();
      props.onFinishEditing();
    } catch (e) {
      console.error("Error in onUpdateListing", e);
      return;
    }
  };

  const onDeleteListing = async () => {
    setIsLoading(true);
    if (!provider || !listingToEdit) return; // typeguards

    try {
      await deleteListingTransaction({
        listingId: listingToEdit.id,
        provider,
        onStatus: onUpdateStatus,
      });

      setListingToEdit(null);
      props.onFinishEditing();
    } catch (e) {
      console.error("Error in onDeleteListing", e);
      setErrorMessage(
        t({
          id: "profile.listing.delete.error",
          message: "Could not delete listing. Please try again.",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {props.listings.map((listing) => (
        <Listing key={listing.id} listing={listing}>
          <CarbonmarkButton
            label={<Trans id="profile.listing.edit">Edit</Trans>}
            className={styles.editListingButton}
            onClick={() => setListingToEdit(listing)}
          />
        </Listing>
      ))}

      <Modal
        title={t({
          id: "seller.edit_listing.title",
          message: "Edit Listing",
        })}
        showModal={!!listingToEdit}
        onToggleModal={onModalClose}
      >
        {!showTransactionView && !isLoading && listingToEdit && (
          <>
            <EditListing
              listing={listingToEdit}
              onSubmit={onFormSubmit}
              onCancel={() => setListingToEdit(null)}
              values={inputValues}
              assetBalance={formatToTonnes(
                getBalanceForListing(listingToEdit, props.assets)
              )}
            />
            <CarbonmarkButton
              label={
                <Trans id="profile.listing.edit.delete_listing">
                  Delete Listing
                </Trans>
              }
              onClick={onDeleteListing}
              className={styles.deleteListingButton}
            />
            {errorMessage && (
              <div className={styles.errorMessageWrap}>
                <Text t="caption" className={styles.errorMessage}>
                  {errorMessage}
                </Text>
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}

        {showTransactionView && !isLoading && (
          <Transaction
            hasApproval={hasApproval()}
            amount={{
              value: `${inputValues.totalAmountToSell} ${t({
                id: "tonnes.long",
                message: "tonnes",
              })}`,
            }}
            price={{
              value: inputValues.singleUnitPrice,
              token: "usdc",
            }}
            approvalText={t({
              id: "transaction.edit_listing.approval_description",
              message:
                "You are about to transfer ownership of this asset from your wallet to the KlimaDAO Carbonmark. You can remove your listing at any time until it has been sold.",
            })}
            onApproval={handleApproval}
            onSubmit={onUpdateListing}
            onCancel={resetLocalState}
            status={status}
            onResetStatus={() => setStatus(null)}
            onGoBack={() => {
              setStatus(null);
              setAllowanceValue(null); // this will hide the Transaction View and re-checks the allowance again
            }}
          />
        )}
      </Modal>
    </>
  );
};
