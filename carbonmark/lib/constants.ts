import { polygonNetworks } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

export const MINIMUM_TONNE_PRICE = 0.1; // minimum amount of tonnes per listing
export const CARBONMARK_FEE = 0.0; // 0%

export const connectErrorStrings = {
  default: t({
    message: "We had some trouble connecting. Please try again.",
    id: "connect_modal.error_message_default",
  }),
  rejected: t({
    message: "User refused connection.",
    id: "connect_modal.error_message_refused",
  }),
};

export const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
interface NetworkURLs {
  mainnet: string;
  testnet: string;
}

interface AppConfig {
  defaultNetwork: "testnet" | "mainnet";
  urls: {
    blockExplorer: NetworkURLs;
    carbonmarkApi: NetworkURLs;
    marketplaceSubgraph: NetworkURLs;
  };
}
export const carbonmarkConfig: AppConfig = {
  /** For static RPC and addresses. For transactions, always rely on the user's wallet network */
  defaultNetwork: "testnet",
  urls: {
    blockExplorer: {
      mainnet: polygonNetworks.mainnet.blockExplorerUrls[0],
      testnet: polygonNetworks.testnet.blockExplorerUrls[0],
    },
    carbonmarkApi: {
      mainnet: "https://marketplace-api-najada.vercel.app",
      testnet: "https://marketplace-api-najada.vercel.app",
    },
    marketplaceSubgraph: {
      mainnet: "https://api.thegraph.com/subgraphs/name/najada/marketplace-new",
      testnet: "https://api.thegraph.com/subgraphs/name/najada/marketplace-new",
    },
  },
};
