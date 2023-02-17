import { getStaticProvider as IGetStaticProvider } from "@klimadao/lib/utils";
import { providers } from "ethers";
import { carbonmarkConfig } from "lib/constants";

/** Get a static provider based on the given `chain` parameter, fallback to carbonmarkConfig.defaultNetwork */
export const getStaticProvider = (
  params?: Parameters<typeof IGetStaticProvider>[0]
): providers.JsonRpcProvider => {
  const chain =
    params?.chain ?? carbonmarkConfig.defaultNetwork === "testnet"
      ? "mumbai"
      : "polygon";
  return IGetStaticProvider({ ...params, chain });
};
