import { Anchor, ButtonPrimary, Text } from "@klimadao/lib/components";
import { Asset } from "@klimadao/lib/types/carbonmark";
import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { useRouter } from "next/router";
import { FC } from "react";

import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Category } from "components/Category";
import { ProjectImage } from "components/ProjectImage";
import { Vintage } from "components/Vintage";
import { formatToTonnes } from "lib/formatNumbers";
import * as styles from "./styles";

interface Props {
  assetsData: Asset;
  onSell: () => void;
}

export const AssetProject: FC<Props> = (props) => {
  const { locale } = useRouter();
  const retireLink = `https://app.klimadao.finance/#/offset
  ?quantity=${props.assetsData.balance}
  &inputToken=${props.assetsData.tokenAddress}`;

  return (
    <Card>
      <div className={styles.tags}>
        {props.assetsData.category && (
          <Category category={props.assetsData.category} />
        )}
        <Vintage vintage={props.assetsData.vintage} />
      </div>
      <Text t="h4">{props.assetsData.projectName}</Text>
      {props.assetsData.category && (
        <div className={styles.image}>
          <ProjectImage category={props.assetsData.category} />
        </div>
      )}
      <Text t="caption">
        <Trans>Quantity Available:</Trans>{" "}
        {formatToTonnes(props.assetsData.balance, locale)}
      </Text>
      <div className={styles.buttons}>
        <ButtonPrimary
          label={<Trans>Retire</Trans>}
          href={retireLink}
          renderLink={(linkProps) => <Anchor {...linkProps} />}
        />
        <CarbonmarkButton label={<Trans>Sell</Trans>} onClick={props.onSell} />
      </div>
    </Card>
  );
};
