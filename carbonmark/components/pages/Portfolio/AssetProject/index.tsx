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
      <Text t="h4">{props.assetsData.projectName}</Text>
      <Text t="caption">
        <Trans>Quantity Available:</Trans> {props.assetsData.balance}
      </Text>
    </Card>
  );
};
