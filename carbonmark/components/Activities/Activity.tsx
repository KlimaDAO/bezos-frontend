import { Text } from "@klimadao/lib/components";
import { ActivityType as ActivityT } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { formatBigToPrice, formatBigToTonnes } from "lib/formatNumbers";
import { getSellerAddress } from "lib/sellerGetter";
import { useRouter } from "next/router";
import { FC } from "react";
import { activityTime } from "./Activities.utils";
import * as styles from "./styles";

/** Represents an single user's activityactivity  */
export const Activity: FC<ActivityT> = (activity) => {
  const { address } = useWeb3();
  const { locale } = useRouter();
  return (
    <div key={activity.id} className={styles.activity}>
      <Text t="caption">{activity.project?.name || "unknown"}</Text>
      <Text t="caption" color="lighter">
        <i>
          {activityTime({
            locale: locale || "en",
            timeStamp: Number(activity.timeStamp),
          })}
        </i>
      </Text>
      <Text t="caption">
        <span className="seller">
          {getSellerAddress(activity.seller.id, address)}
        </span>
        {activity.activityType}
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
