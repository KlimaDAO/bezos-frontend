/** Return true if the given array is empty*/
export const empty = <T>(arr: T[]) => !arr?.length;

/** Return true if the array is empty or it includes the given value */
export const emptyOrIncludes = <T>(arr: T[], i: T) =>
  empty(arr) || arr?.includes(i);
