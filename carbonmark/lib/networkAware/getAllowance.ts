import { getAllowance as IGetAllowance } from "@klimadao/lib/utils";
import { carbonmarkConfig } from "lib/constants";

/** Fetch an allowance based on the given `network` parameter, fallback to carbonmarkConfig.defaultNetwork */
export const getAllowance = (params: Parameters<typeof IGetAllowance>[0]) => {
  const { network = carbonmarkConfig.defaultNetwork } = params;
  return IGetAllowance({
    ...params,
    network,
  });
};
