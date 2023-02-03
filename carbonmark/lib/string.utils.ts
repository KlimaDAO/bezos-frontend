/** Capitalize the first char in a string */
export const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Converts the given string to Title Case
 * @param str the string to convert
 * @returns a string with the first character of all words capitalized
 */
export const titleCase = (str: string) =>
  str.split("-").map(capitalizeFirst).join(" ");
