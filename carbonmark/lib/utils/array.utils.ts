import { pipe, reverse, sortBy as _sortBy } from "lodash/fp";

/** Return true if the given array is empty*/
export const empty = <T>(arr: T[]) =>
  arr === null || arr === undefined || arr.length === 0;

/** Return true if the array is empty or it includes the given value */
export const emptyOrIncludes = <T>(arr: T[], i: T) =>
  empty(arr) || arr?.includes(i);

/** sortBy but reverse */
const reverseSortBy = <T>(key: keyof T) => pipe(_sortBy<T>(key), reverse);

/** sortBy with an order argument, by default an ascending sort */
export const sortBy = <T>(
  key: keyof T,
  order: "asc" | "desc" = "asc"
): ((arr: T[]) => T[]) => (order === "asc" ? _sortBy(key) : reverseSortBy(key));
