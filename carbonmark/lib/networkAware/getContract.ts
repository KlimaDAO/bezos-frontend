import { getContract as IGetContract } from "@klimadao/lib/utils";
import { Contract } from "ethers";

/** Grab a contract based on the given `network` parameter, fallback to globalThis.userNetwork */
export const getContract = (
  params: Parameters<typeof IGetContract>[0]
): Contract => {
  const { network = globalThis.userNetwork } = params;
  return IGetContract({ ...params, network });
};
