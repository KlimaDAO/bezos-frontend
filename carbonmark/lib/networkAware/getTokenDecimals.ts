import { getTokenDecimals as IGetTokenDecimals } from "@klimadao/lib/utils";
import { carbonmarkConfig } from "lib/constants";

/** Get decimals based on the given `network` parameter, fallback to carbonmarkConfig.defaultNetwork */
export const getTokenDecimals = (
  tkn: string,
  network?: "testnet" | "mainnet"
): 9 | 6 | 18 => {
  return IGetTokenDecimals(tkn, network ?? carbonmarkConfig.defaultNetwork);
};
