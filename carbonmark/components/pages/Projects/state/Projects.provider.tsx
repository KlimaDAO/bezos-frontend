import { FC, PropsWithChildren, useMemo, useState } from "react";
import { ProjectFilterSortValues } from "../types";
import { ProjectsContext } from "./Projects.context";
import { InitialProjectsState } from "./Projects.state";

export const ProjectsProvider: FC<PropsWithChildren> = (props) => {
  const [state, setState] = useState(InitialProjectsState);

  const setFilters = (filters: ProjectFilterSortValues) =>
    setState((state) => ({ ...state, filters }));

  /**
   *  We need to memoise this so that it does not cause unnecessary re-renders
   */
  const contextValue = useMemo(
    () => ({ state, setFilters }),
    [state, setState]
  );

  return (
    <ProjectsContext.Provider value={contextValue}>
      {props.children}
    </ProjectsContext.Provider>
  );
};
