import { urls } from "@klimadao/lib/constants";
import { Project } from "lib/types/carbonmark";

type ProjectData = {
  key: Project["key"];
  vintage: Project["vintage"];
};
export const createProjectLink = (project: ProjectData) =>
  `/projects/${project.key}-${project.vintage}`;

export const createProjectPurchaseLink = (
  project: ProjectData,
  listingId: string
) => `${createProjectLink(project)}/purchase/${listingId}`;

export const createSellerLink = (handle: string) => `/users/${handle}`;

export const createRetireLink = (params: {
  quantity: string;
  retirementToken: string;
}) =>
  `${urls.offset}
?${
    params.quantity &&
    `quantity=${params.quantity}
&`
  }${params.retirementToken && `retirementToken=${params.retirementToken}`}`;

export const createRedeemLink = (params: {
  poolName: string;
  projectTokenAddress: string;
}) =>
  params.poolName && params.projectTokenAddress
    ? `${urls.redeem}?${
        params.projectTokenAddress &&
        `projectTokenAddress=${params.projectTokenAddress}&`
      }${params.poolName && `pool=${params.poolName}`}`
    : urls.redeem;
