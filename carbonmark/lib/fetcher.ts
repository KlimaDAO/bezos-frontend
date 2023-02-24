type FetchArgs = [input: RequestInfo | URL, init?: RequestInit];

/** A generic fetch function to deconstruct fetch responses. Used primarily for SWR  */
export const fetcher = <T>(...args: FetchArgs): Promise<T> =>
  fetch(...args).then((res) => res.json());
