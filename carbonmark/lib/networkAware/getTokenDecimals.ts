import { getTokenDecimals as IGetTokenDecimals } from "@klimadao/lib/utils";

/** Get decimals based on the given `network` parameter, fallback to globalThis.userNetwork */
export const getTokenDecimals = (
  tkn: string,
  network?: "testnet" | "mainnet"
): 9 | 6 | 18 => {
  return IGetTokenDecimals(tkn, network ?? globalThis.userNetwork);
};
