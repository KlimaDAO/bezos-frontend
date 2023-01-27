import { cx } from "@emotion/css";
import { ButtonPrimary } from "@klimadao/lib/components";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import TuneIcon from "@mui/icons-material/Tune";
import { SearchInput } from "components/SearchInput";
import { Toggle } from "components/Toggle";
import { FC, HTMLAttributes } from "react";
import * as styles from "./styles";

type ProjectControllerProps = HTMLAttributes<HTMLDivElement>;

export const ProjectsController: FC<ProjectControllerProps> = (props) => {
  return (
    <div {...props} className={cx(styles.main, props.className)}>
      <SearchInput
        id="projects-search-input"
        label="project search"
        placeholder="Search for a project"
      />
      <ButtonPrimary
        className={styles.filterButton}
        icon={<TuneIcon />}
        label="Filters"
      />
      <Toggle
        onChange={console.log}
        options={[
          { content: <GridViewIcon />, value: "grid" },
          { content: <ListIcon />, value: "list" },
        ]}
      />
    </div>
  );
};
