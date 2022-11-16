import { BigNumber } from "ethers";

export interface Project {
  id: string;
  key: string;
  projectID: string;
  name: string;
  methodology: string;
  vintage: string;
  projectAddress: string;
  registry: string;
}

export interface User {
  handle: string;
  username: string;
  description: string;
  wallet: string;
  listings: Listing[];
  activities: Activity[];
}

export type Listing = {
  id: number;
  totalAmountToSell: number;
  tokenAddress: string;
  active: boolean;
  deleted: boolean;
  batches: [];
  batchPrices: [];
  singleUnitPrice: number;
  project: {
    name: string;
    category: string;
  };
};

type Activity = {
  id: number;
  amount: number;
  previousAmount: number;
  price: number;
  previousPrice: number;
  timeStamp: number;
  batchPrices: [];
  singleUnitPrice: number;
  project: {
    key: string;
  };
  seller: {
    id: string;
  };
  buyer: {
    id: string;
  };
};

export type ProjectInfo = {
  active: boolean;
  country: string;
  methodology: string;
  name: string;
  period_end: BigNumber;
  period_start: BigNumber;
  project_id: string;
  region: string | "";
  registry: "GS";
  uri: string;
};

export type Asset = {
  tokenAddress: string;
  tokenName: string;
  projectName: string;
  balance: string;
};
