import { useState } from "react";

import { Domain } from "@klimadao/lib/types/domains";
import { getENSProfile, getKNSProfile, useWeb3 } from "@klimadao/lib/utils";
import { getInfuraUrlPolygon } from "lib/getInfuraUrl";
import { useEffect } from "react";
export const useProfileData = () => {
  const { address } = useWeb3();
  const [profileData, setProfileData] = useState<Domain>();

  // collect nameserviceDomain Data if connected and domain is in URL
  useEffect(() => {
    if (!props.userDomain || !address) return;

    const setProfile = async () => {
      const kns = await getKNSProfile({
        address: address,
        providerUrl: getInfuraUrlPolygon(),
      });

      if (kns) return setProfileData(kns);

      const ens = await getENSProfile({ address: address });
      if (ens) return setProfileData(ens);
    };

    setProfile();
  }, [props.userDomain, address]);

  return profileData;
};
