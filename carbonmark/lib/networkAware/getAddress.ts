import { addresses } from "@klimadao/lib/constants";

/** Grab an address based on the given `network` parameter, fallback to globalThis.userNetwork */
export const getAddress = (
  name: keyof typeof addresses.mainnet,
  network?: "testnet" | "mainnet"
): string => {
  return addresses[network ?? globalThis.userNetwork][name];
};
