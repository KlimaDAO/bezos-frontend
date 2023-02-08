/* eslint-disable no-var */
import { carbonmarkConfig } from "lib/constants";

/**
 * Import on server root and browser root context.
 * This way, the web3modal logic can override this, and endpoints know which webservice to use.
 */
declare global {
  var userNetwork: "mainnet" | "testnet"; // must be var, not `let`
}

/** Init with defaults, mainnet */
globalThis.userNetwork = carbonmarkConfig.defaultNetwork;
