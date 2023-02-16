import { Text } from "@klimadao/lib/components";
import { Project } from "@klimadao/lib/types/carbonmark";
import { trimWithLocale } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  currentSupply: Project["currentSupply"];
  totalRetired: Project["totalRetired"];
}

export const StatsPoolProject: FC<Props> = (props) => {
  const { locale } = useRouter();

  const retired = Number(props.totalRetired ?? 0);
  const remaining = Number(props.currentSupply ?? 0);
  const full = retired + remaining;
  const retirementPercent = Math.round((retired / full) * 100);

  return (
    <Card>
      <Text t="h4">
        <Trans>Stats</Trans>
      </Text>
      <Text t="caption" color="lighter">
        <Trans>Data for this project and vintage</Trans>
      </Text>
      <div
        className={styles.bar}
        style={{ "--percent": retirementPercent } as React.CSSProperties}
      />
      <div className={styles.list}>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithColor}>
            <span className="first">
              <Trans>Total Retirements:</Trans>
            </span>
          </Text>
          <Text t="caption">{trimWithLocale(retired || 0, 2, locale)}</Text>
        </div>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithColor}>
            <span>
              <Trans>Remaining Supply:</Trans>{" "}
            </span>
          </Text>
          <Text t="caption">{trimWithLocale(remaining || 0, 2, locale)}</Text>
        </div>
      </div>
    </Card>
  );
};
