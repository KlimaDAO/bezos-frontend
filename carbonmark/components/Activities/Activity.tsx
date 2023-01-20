import { Anchor, Text } from "@klimadao/lib/components";
import { ActivityType as ActivityT } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";
import { formatWalletAddress } from "lib/formatWalletAddress";
import { useRouter } from "next/router";
import { FC } from "react";
import { ACTIVITY_ACTIONS } from "./Activities.constants";
import {
  activityTime,
  isPurchaseActivity,
  isSaleActivity,
} from "./Activities.utils";
import * as styles from "./styles";

/** Represents a single activity of a user  */
export const Activity: FC<ActivityT> = (activity) => {
  const { address: connectedAddress } = useWeb3();
  const { locale } = useRouter();

  let addressA, addressB;

  /** By default the seller is the "source" of all other actions */
  addressA = activity.seller.id;

  /** Determine the order in which to display addresses based on the activity type */
  if (isPurchaseActivity(activity)) {
    addressA = activity.buyer.id;
    addressB = activity.seller.id;
  } else if (isSaleActivity(activity)) {
    addressB = activity.buyer.id;
  }

  return (
    <div key={activity.id} className={styles.activity}>
      <Text t="caption">{activity.project?.name ?? "unknown"}</Text>
      <Text t="caption" color="lighter">
        <i>
          {activityTime({
            locale: locale || "en",
            timeStamp: Number(activity.timeStamp),
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
        {ACTIVITY_ACTIONS[activity.activityType]}
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
      {!!activity.amount && activity.price && (
        <Text t="caption">
          <span className="number">
            {formatBigToTonnes(activity.amount, locale)}
            <Trans id="tonnes.short">t</Trans>
          </span>{" "}
          at
          <span className="number">
            {formatBigToPrice(activity.price, locale)}
          </span>
        </Text>
      )}
    </div>
  );
};
