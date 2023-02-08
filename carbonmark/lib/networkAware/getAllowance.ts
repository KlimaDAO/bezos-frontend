import { getAllowance as IGetAllowance } from "@klimadao/lib/utils";

export const getAllowance = (params: Parameters<typeof IGetAllowance>[0]) => {
  const { network = globalThis.userNetwork ?? "mainnet" } = params;
  return IGetAllowance({
    ...params,
    network,
  });
};
