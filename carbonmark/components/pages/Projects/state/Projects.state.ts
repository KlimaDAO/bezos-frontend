import { ProjectFilterSortValues } from "../types";

export const InitialProjectsState: ProjectsState = {
  filters: {
    sort: "recently-updated",
    countries: [],
    categories: [],
    vintages: [],
  },
};

export type ProjectsState = {
  filters: ProjectFilterSortValues;
};
