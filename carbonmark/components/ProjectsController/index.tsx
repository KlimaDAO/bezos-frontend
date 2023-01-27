import { cx } from "@emotion/css";
import { ButtonPrimary } from "@klimadao/lib/components";
import TuneIcon from "@mui/icons-material/Tune";
import { SearchInput } from "components/SearchInput";
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
    </div>
  );
};
