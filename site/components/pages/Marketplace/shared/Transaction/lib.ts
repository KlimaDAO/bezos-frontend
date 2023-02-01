import { t } from "@lingui/macro";

import { addresses } from "@klimadao/lib/constants";
import { ethers, Contract, utils, providers } from "ethers";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { formatUnits } from "@klimadao/lib/utils";

import USDC from "public/icons/USDC.png";
import { StaticImageData } from "next/legacy/image";

export type TxnStatus =
  | "userConfirmation"
  | "networkConfirmation"
  | "done"
  | "error";

export interface TransactionStatusMessage {
  statusType: TxnStatus;
  message?: string;
}

export type OnStatusHandler = (status: TxnStatus, message?: string) => void;

export const getStatusMessage = (status: TransactionStatusMessage) => {
  const { statusType, message } = status;
  if (statusType === "error" && message) {
    if (message === "userRejected")
      return t({
        id: "marketplace.transaction.status.user_rejected",
        message: "You chose to reject the transaction",
      });
    return message;
  } else if (statusType === "error") {
    return t({
      id: "marketplace.transaction.status.error",
      message: "❌ Error: something went wrong...",
    });
  } else if (statusType === "done") {
    return t({
      id: "marketplace.transaction.status.done",
      message: "Transaction complete.",
    });
  } else if (statusType === "userConfirmation") {
    return t({
      id: "marketplace.transaction.status.user_confirmation",
      message: "Please click 'confirm' in your wallet to continue.",
    });
  } else if (statusType === "networkConfirmation") {
    return t({
      id: "marketplace.transaction.status.network_confirmation",
      message: "Transaction initiated. Waiting for network confirmation.",
    });
  }
  return null;
};

export type MarketplaceToken = "usdc"; // what are the others?

export const getMarketplaceAddress = (): string =>
  addresses["mainnet"].marketplace; // testnet and mainnet have the same address, change mainnet address for GO LIVE

type MarketplaceTokenMap = {
  [key in MarketplaceToken]: {
    key: string;
    icon: StaticImageData;
    label: Uppercase<MarketplaceToken>;
  };
};

export const marketplaceTokenInfoMap: MarketplaceTokenMap = {
  usdc: { key: "usdc", icon: USDC, label: "USDC" },
};

export const getC3tokenToMarketplaceAllowance = async (params: {
  userAdress: string;
  tokenAddress: string;
  provider: ethers.providers.Provider;
}): Promise<string> => {
  const tokenContract = new Contract(
    params.tokenAddress,
    C3ProjectToken.abi,
    params.provider
  );

  const allowance = await tokenContract.allowance(
    params.userAdress,
    getMarketplaceAddress()
  );

  return ethers.utils.formatUnits(allowance);
};

export const onApproveMarketplaceTransaction = async (params: {
  value: string;
  provider: providers.JsonRpcProvider;
  tokenAddress: string;
  onStatus: OnStatusHandler;
}): Promise<string> => {
  try {
    const tokenContract = new Contract(
      params.tokenAddress,
      C3ProjectToken.abi,
      params.provider.getSigner()
    );

    const parsedValue = utils.parseUnits(params.value, 18); // always 18 for C3 tokens ?

    params.onStatus("userConfirmation");

    const txn = await tokenContract.approve(
      getMarketplaceAddress(),
      parsedValue.toString()
    );

    params.onStatus("networkConfirmation", "");
    await txn.wait(1);

    params.onStatus("done", "Approval was successful");
    return formatUnits(parsedValue);
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    console.error(error);
    throw error;
  }
};
