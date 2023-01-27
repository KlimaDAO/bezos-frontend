import { SearchInput } from "components/SearchInput";
import { FC, HTMLAttributes } from "react";

type ProjectControllerProps = HTMLAttributes<HTMLDivElement>;

export const ProjectsController: FC<ProjectControllerProps> = (props) => {
  return (
    <div {...props}>
      <SearchInput
        id="projects-search-input"
        label="project search"
        placeholder="Search for a project"
      />
    </div>
  );
};
