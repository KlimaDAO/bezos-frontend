import { Trans } from "@lingui/macro";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { Listing, Project } from "lib/types/carbonmark";
import { FC } from "react";
import { StatsBar } from "./StatsBar";
import { StatsListings } from "./StatsListings";

interface Props {
  allListings?: Listing[];
  activeListings?: Listing[];
  currentSupply?: Project["currentSupply"];
  totalRetired?: Project["totalRetired"];
  description: string;
}

export const Stats: FC<Props> = (props) => {
  return (
    <Card>
      <Text t="h4">
        <Trans>Stats</Trans>
      </Text>
      <Text t="body1" color="lighter">
        {props.description}
      </Text>

      {!!props.currentSupply && !!props.totalRetired ? (
        <StatsBar
          currentSupply={props.currentSupply}
          totalRetired={props.totalRetired}
        />
      ) : (
        <StatsListings
          activeListings={props.activeListings}
          allListings={props.allListings}
        />
      )}
    </Card>
  );
};
