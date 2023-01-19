import { addresses } from "@klimadao/lib/constants";

export const getMarketplaceAddress = (): string =>
  addresses["mainnet"].carbonmark; // testnet and mainnet have the same address, change mainnet address for GO LIVE
