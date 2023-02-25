import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";

type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

export type ProjectFilterSortValues = {
  countries: string[];
  categories: string[];
  vintages: string[];
  sort: SortOption;
};
