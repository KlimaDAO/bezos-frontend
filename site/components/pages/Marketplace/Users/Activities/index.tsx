import { FC } from "react";
import { BigNumber } from "ethers";
import { Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import { Activity } from "@klimadao/lib/types/marketplace";
import { useRouter } from "next/router";
import { concatAddress, formatUnits } from "@klimadao/lib/utils";

import * as styles from "./styles";

interface Props {
  activities: Activity[];
  connectedAddress?: string;
}

const getSeller = (sellerID: string, connectedAddress?: string) => {
  if (
    !!connectedAddress &&
    sellerID.toLowerCase() === connectedAddress.toLowerCase()
  ) {
    return t({ id: "marketplace.activity.you", message: "You" });
  }

  return concatAddress(sellerID);
};

const activityTime = (params: { locale: string; timeStamp: number }) => {
  const now = Date.now();
  const elapsedSeconds = Math.abs((params.timeStamp * 1000 - now) / 1000);

  const rtf = new Intl.RelativeTimeFormat(params.locale, {
    numeric: "auto",
    style: "long",
  });

  if (elapsedSeconds < 3600) {
    return rtf.format(Math.floor(-elapsedSeconds / 60), "minutes");
  } else if (elapsedSeconds < 86400) {
    return rtf.format(Number((-elapsedSeconds / 3600).toPrecision(2)), "hours");
  } else if (elapsedSeconds < 604800) {
    return rtf.format(Number((-elapsedSeconds / 86400).toPrecision(1)), "day");
  } else {
    return rtf.format(
      Number((-elapsedSeconds / 604800).toPrecision(1)),
      "week"
    );
  }
};

export const Activities: FC<Props> = (props) => {
  const { locale } = useRouter();
  const hasActivities = !!props.activities?.length;
  const sortedActivities =
    (hasActivities &&
      props.activities.sort((a, b) => b.timeStamp - a.timeStamp)) ||
    [];

  return (
    <div className={styles.card}>
      <Text t="h4">
        <Trans id="marketplace.user.activities.title">Activities</Trans>
      </Text>
      {!hasActivities && (
        <Text t="caption" color="lighter">
          <i>
            <Trans id="marketplace.user.activities.empty_state">
              No activity to show
            </Trans>
          </i>
        </Text>
      )}
      {!!sortedActivities.length &&
        sortedActivities.map((activity) => (
          <div key={activity.id} className={styles.activity}>
            <Text t="caption">{activity.project.key}</Text>
            <Text t="caption" color="lighter">
              <i>
                {activityTime({
                  locale: locale || "en",
                  timeStamp: activity.timeStamp,
                })}
              </i>
            </Text>
            <Text t="caption">
              <span className="seller">
                {getSeller(activity.seller.id, props.connectedAddress)}
              </span>
              {activity.activityType}
            </Text>
            <Text t="caption">
              <span className="number">
                {formatUnits(BigNumber.from(activity.amount))}t
              </span>{" "}
              at
              <span className="number">
                {formatUnits(BigNumber.from(activity.price))}$
              </span>
            </Text>
          </div>
        ))}
    </div>
  );
};