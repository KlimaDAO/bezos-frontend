import { addresses } from "@klimadao/lib/constants";
import { carbonmarkConfig } from "lib/constants";

/** Grab an address based on the given `network` parameter, fallback to carbonmarkConfig.defaultNetwork */
export const getAddress = (
  name: keyof typeof addresses.mainnet,
  network?: "testnet" | "mainnet"
): string => {
  return addresses[network ?? carbonmarkConfig.defaultNetwork][name];
};
