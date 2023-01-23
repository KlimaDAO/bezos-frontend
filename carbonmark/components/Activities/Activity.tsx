import { Anchor, Text } from "@klimadao/lib/components";
import { ActivityType as ActivityT } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";
import { formatWalletAddress } from "lib/formatWalletAddress";
import { getElapsedTime } from "lib/getElapsedTime";
import { useRouter } from "next/router";
import { FC } from "react";
import { ACTIVITY_ACTIONS } from "./Activities.constants";
import * as styles from "./styles";

const tonnesT = t({ id: "tonnes.short", message: "t" });

/** Represents a single activity of a user  */
export const Activity: FC<ActivityT> = (props) => {
  const { address: connectedAddress } = useWeb3();
  const { locale } = useRouter();

  let addressA, addressB;
  let amountA, amountB;
  let transactionString = "at";

  const isPurchaseActivity = props.activityType === "Purchase";
  const isSaleActivity = props.activityType === "Sold";
  const isUpdateQuantity = props.activityType === "UpdatedQuantity";
  const isUpdatePrice = props.activityType === "UpdatedPrice";

  /** By default the seller is the "source" of all actions */
  addressA = props.seller.id;

  /** By default activities are buy or sell transactions */
  amountA =
    !!props.amount && `${formatBigToTonnes(props.amount, locale)}${tonnesT}`;
  amountB = !!props.price && `${formatBigToPrice(props.price, locale)}`;

  /** Determine the order in which to display addresses based on the activity type */
  if (isPurchaseActivity) {
    addressA = props.buyer.id;
    addressB = props.seller.id;
  } else if (isSaleActivity) {
    addressB = props.buyer.id;
  }

  /** Price Labels */
  if (isUpdatePrice) {
    amountA =
      props.previousPrice && formatBigToPrice(props.previousPrice, locale);
    amountB = props.price && formatBigToPrice(props.price, locale);
  }

  /** Quantity Labels */
  if (isUpdateQuantity) {
    amountA = props.previousAmount && formatBigToTonnes(props.previousAmount);
    amountB = props.amount && formatBigToTonnes(props.amount);
  }

  /** Determine the conjunction between the labels */
  if (isPurchaseActivity || isSaleActivity) {
    transactionString = t({
      id: "props.transaction.conjunction",
      message: "for",
    });
  }
  if (isUpdatePrice || isUpdateQuantity) {
    transactionString = "->";
  }

  return (
    <div key={props.id} className={styles.activity}>
      <Text t="caption">{props.project?.name || "unknown"}</Text>
      <Text t="caption" color="lighter">
        <i>
          {getElapsedTime({
            locale: locale || "en",
            timeStamp: Number(props.timeStamp),
          })}
        </i>
      </Text>
      <Text t="caption">
        <Anchor
          className="account"
          href={`https://polygonscan.com/address/${addressA}`}
        >
          {formatWalletAddress(addressA, connectedAddress)}{" "}
        </Anchor>
        {ACTIVITY_ACTIONS[props.activityType]}
        {addressB && (
          <Anchor
            className="account"
            href={`https://polygonscan.com/address/${addressB}`}
          >
            {" "}
            {formatWalletAddress(addressB, connectedAddress)}
          </Anchor>
        )}
      </Text>
      {!!amountA && !!amountB && (
        <Text t="caption">
          <span className="number">{`${amountA}`}</span> {transactionString}
          <span className="number">{`${amountB}`}</span>
        </Text>
      )}
    </div>
  );
};
