import { getStaticProvider as IGetStaticProvider } from "@klimadao/lib/utils";
import { providers } from "ethers";

/** Get a static provider based on the given `chain` parameter, fallback to globalThis.userNetwork */
export const getStaticProvider = (
  params?: Parameters<typeof IGetStaticProvider>[0]
): providers.JsonRpcProvider => {
  const chain =
    params?.chain ?? globalThis.userNetwork === "testnet"
      ? "mumbai"
      : "polygon";
  return IGetStaticProvider({ ...params, chain });
};
