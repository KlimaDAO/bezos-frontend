import { Text } from "@klimadao/lib/components";
import { Asset } from "@klimadao/lib/types/carbonmark";
import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { FC } from "react";

interface Props {
  assetsData: Asset;
}

export const AssetProject: FC<Props> = (props) => {
  return (
    <Card key={props.assetsData.projectId}>
      <Text t="h4">
        <Trans id="portfolio.asset.title">{props.assetsData.projectName}</Trans>
      </Text>
      <Text t="caption">Quantity Available: {props.assetsData.balance}</Text>
    </Card>
  );
};
