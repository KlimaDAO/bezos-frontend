import { createContext } from "react";
import { ProjectFilterSortValues } from "../types";
import { InitialProjectsState, ProjectsState } from "./Projects.state";

export const ProjectsContext = createContext<{
  state: ProjectsState;
  setFilters: (filters: ProjectFilterSortValues) => void;
}>({
  state: InitialProjectsState,
  setFilters: () => null,
});
