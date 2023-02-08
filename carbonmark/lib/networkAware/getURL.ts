import { carbonmarkConfig } from "lib/constants";

/** Get url from carbonmarkConfig for provided network, fallback to globalThis.userNetwork */
export const getURL = (
  key: keyof typeof carbonmarkConfig.urls,
  network?: "mainnet" | "testnet"
): string => {
  return carbonmarkConfig.urls[key][network ?? globalThis.userNetwork];
};
