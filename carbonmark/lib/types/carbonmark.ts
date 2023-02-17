import { BigNumber } from "ethers";

export interface Project {
  id: string;
  key: string;
  projectID: string;
  name: string | "";
  methodology: string;
  vintage: string;
  projectAddress: string;
  registry: string;
  category: Category | null;
  listings: Listing[] | null;
  price: BigNumber;
  country: Country | null;
  activities: ActivityType[] | null;
  updatedAt: string; // timestamp
  location?: {
    // only defined for Verra projects
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  description?: string;
  isPoolProject?: boolean;
}

export interface User {
  handle: string;
  username: string;
  description: string;
  wallet: string;
  listings: Listing[];
  activities: ActivityType[];
  assets: string[]; // token addresses
}

export type Listing = {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalAmountToSell: BigNumber;
  leftToSell: BigNumber;
  tokenAddress: string;
  active: boolean; // false when amount is "0"
  deleted: boolean; // user deleted this listing
  batches: [];
  batchPrices: [];
  singleUnitPrice: BigNumber;
  project: {
    id: string;
    key: string;
    name: string;
    category: Category;
    methodology: string;
    projectAddress: string;
    projectID: string;
    registry: string;
    vintage: string;
    country: Country;
  };
  seller?: {
    handle: string;
    username: string;
    description: string;
    id: string;
  };
};

/**
 * A type representing possible activity actions (e.g "Sold", "Purchase" etc)
 * Sourced from: https://github.com/Atmosfearful/bezos-frontend/issues/9#issuecomment-1348069483
 */
export type ActivityActionT =
  | "UpdatedQuantity"
  | "UpdatedPrice"
  | "CreatedListing"
  | "DeletedListing"
  | "Purchase"
  | "Sold";

export type ActivityType = {
  id: number;
  activityType: ActivityActionT; // CreatedListing, DeletedListing, UpdatedPrice ...
  amount: BigNumber | null;
  previousAmount: BigNumber | null;
  price: BigNumber | null;
  previousPrice: BigNumber | null;
  timeStamp: string;
  batchPrices: [];
  singleUnitPrice: BigNumber | null;
  project: {
    id: string;
    key: string;
    name: string;
    category: Category;
    methodology: string;
    projectAddress: string;
    projectID: string;
    registry: string;
    vintage: string;
  };
  seller: {
    id: string;
  };
  buyer: {
    id: string;
  } | null;
};

// data from C3 ABI function "getProjectInfo"
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
  project_type: string;
};

export type Asset = {
  tokenAddress: string;
  tokenName: string;
  balance: string;
  projectName: ProjectInfo["name"];
};

export type AssetExtended = {
  tokenAddress: string;
  tokenName: string;
  balance: string;
  projectName: ProjectInfo["name"];
  projectId: ProjectInfo["project_id"];
  projectType: ProjectInfo["project_type"];
  country: ProjectInfo["country"];
  methodology: ProjectInfo["methodology"];
  registry: ProjectInfo["registry"];
  projectUrl: ProjectInfo["uri"];
  active: ProjectInfo["active"];
  category: CategoryName;
  key: string;
  vintage: string;
};

export type Category = {
  id: CategoryNames;
};

export type Country = {
  id: string;
};

export type CategoryName =
  | "Agriculture"
  | "Energy Efficiency"
  | "Forestry"
  | "Industrial Processing"
  | "Renewable Energy"
  | "Other"
  | "Other Nature-Based";

export type CategoryNames = `${CategoryName},${CategoryName}`;

export type Purchase = {
  id: string; // TransactionHash
  amount: BigNumber;
  price: BigNumber;
  listing: Listing;
};

export type CarbonmarkToken = "usdc" | "c3" | "tc02";

export type Balance = {
  tokenName: CarbonmarkToken;
  balance: string;
};
