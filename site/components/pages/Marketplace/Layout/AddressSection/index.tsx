import { Text } from "@klimadao/lib/components";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import { useGetDomainFromAddress } from "../../hooks/useGetDomainFromAddress";
import * as styles from "./styles";

export const AddressSection = () => {
  const { address } = useWeb3();

  // collect nameserviceDomain Data if connected and domain is in URL
  const userAddressDomain = useGetDomainFromAddress(address);
  return (
    <div className={styles.address}>
      <Text t="caption">
        <Trans id="marketplace.menu.wallet_address">Your Wallet Address</Trans>:
      </Text>

      {userAddressDomain ? (
        <div className="domain-wrapper">
          <img
            src={userAddressDomain.imageUrl}
            alt="profile avatar"
            className="avatar"
          />
          <Text t="caption" color="lightest" className={"domain-name"}>
            {userAddressDomain.name}
          </Text>
        </div>
      ) : (
        <Text t="caption" color="lightest">
          {address ? (
            concatAddress(address)
          ) : (
            <Trans id="marketplace.menu.not_connected">NOT CONNECTED</Trans>
          )}
        </Text>
      )}
    </div>
  );
};
