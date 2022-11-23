import { FC } from "react";
import { Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { Stats as StatsType } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

interface Props {
  stats?: StatsType;
  description?: string;
}

export const Stats: FC<Props> = (props) => {
  return (
    <div className={styles.card}>
      <Text t="h4">
        <Trans id="marketplace.user.stats.title">Stats</Trans>
      </Text>
      <Text t="caption" color="lighter">
        {props.description ||
          t({
            id: "marketplace.user.stats.seller.description",
            message: "Data for this seller",
          })}
      </Text>
      <div className={styles.list}>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithIcon}>
            <StoreOutlinedIcon />
            <Trans>Tonnes sold:</Trans>
          </Text>
          <Text t="caption">{props.stats?.tonnesSold || "-"}</Text>
        </div>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithIcon}>
            <SavingsOutlinedIcon />
            <Trans>Tonnes owned:</Trans>
          </Text>
          <Text t="caption">{props.stats?.tonnesOwned || "-"}</Text>
        </div>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithIcon}>
            <SellOutlinedIcon />
            <Trans>Active listings:</Trans>
          </Text>
          <Text t="caption">{props.stats?.activeListings || "-"}</Text>
        </div>
      </div>
    </div>
  );
};