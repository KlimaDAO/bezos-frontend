import { ethers, Contract, utils, providers } from "ethers";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { formatUnits, getContract } from "@klimadao/lib/utils";
import { getMarketplaceAddress } from "./getAddresses";
import { OnStatusHandler } from "./statusMessage";
import { Asset } from "@klimadao/lib/types/marketplace";

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

    const parsedValue = utils.parseUnits(params.value, 18); // always 18 for C3 tokens

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

export const createListingTransaction = async (params: {
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const marketPlaceContract = getContract({
      contractName: "marketplace",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await marketPlaceContract.addListing(
      params.tokenAddress,
      utils.parseUnits(params.totalAmountToSell, 18), // C3 token
      utils.parseUnits(params.singleUnitPrice, 18), // Make sure to switch back to 6 when moving from Mumbai to Mainnet! https://github.com/Atmosfearful/bezos-frontend/issues/15
      [], // TODO batches
      [] // TODO batches price
    );

    params.onStatus("networkConfirmation", "");
    await listingTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const updateListingTransaction = async (params: {
  listingId: string;
  tokenAddress: string;
  totalAmountToSell: string;
  singleUnitPrice: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const marketPlaceContract = getContract({
      contractName: "marketplace",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await marketPlaceContract.updateListing(
      params.listingId,
      params.tokenAddress,
      utils.parseUnits(params.totalAmountToSell, 18), // C3 token
      utils.parseUnits(params.singleUnitPrice, 18), // Make sure to switch back to 6 when moving from Mumbai to Mainnet! https://github.com/Atmosfearful/bezos-frontend/issues/15
      [], // TODO batches
      [] // TODO batches price
    );

    params.onStatus("networkConfirmation", "");
    await listingTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const deleteListingTransaction = async (params: {
  listingId: string;
  provider: providers.JsonRpcProvider;
  onStatus: OnStatusHandler;
}) => {
  try {
    const marketPlaceContract = getContract({
      contractName: "marketplace",
      provider: params.provider.getSigner(),
    });

    params.onStatus("userConfirmation", "");

    const listingTxn = await marketPlaceContract.deleteListing(
      params.listingId
    );

    params.onStatus("networkConfirmation", "");
    await listingTxn.wait(1);
    params.onStatus("done", "Transaction confirmed");
    return;
  } catch (error: any) {
    if (error.code === 4001) {
      params.onStatus("error", "userRejected");
      throw error;
    }
    params.onStatus("error");
    throw error;
  }
};

export const getUserAssetsData = async (params: {
  assets: string[];
  provider: providers.JsonRpcProvider;
  userAddress: string;
}): Promise<Asset[]> => {
  try {
    const assetsData = await params.assets.reduce<Promise<Asset[]>>(
      async (resultPromise, asset) => {
        const resolvedAssets = await resultPromise;
        const contract = new ethers.Contract(
          asset,
          C3ProjectToken.abi,
          params.provider
        );

        const tokenName = await contract.symbol();
        const c3TokenBalance = await contract.balanceOf(params.userAddress);
        const balance = formatUnits(c3TokenBalance);
        const projectInfo = await contract.getProjectInfo();

        resolvedAssets.push({
          tokenAddress: asset,
          tokenName,
          projectName: projectInfo.name,
          balance,
        });
        return resolvedAssets;
      },
      Promise.resolve([])
    );
    return assetsData;
  } catch (e) {
    throw e;
  }
};
