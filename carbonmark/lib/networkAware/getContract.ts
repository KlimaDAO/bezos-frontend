import { getContract as IGetContract } from "@klimadao/lib/utils";
import { Contract } from "ethers";
import { carbonmarkConfig } from "lib/constants";

/** Grab a contract based on the given `network` parameter, fallback to carbonmarkConfig.defaultNetwork */
export const getContract = (
  params: Parameters<typeof IGetContract>[0]
): Contract => {
  const { network = carbonmarkConfig.defaultNetwork } = params;
  return IGetContract({ ...params, network });
};
