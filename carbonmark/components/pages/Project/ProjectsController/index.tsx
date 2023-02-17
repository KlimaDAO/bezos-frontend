import { cx } from "@emotion/css";
import { ButtonPrimary } from "@klimadao/lib/components";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import TuneIcon from "@mui/icons-material/Tune";
import { ProjectsFilterModal } from "components/ProjectFilterModal";
import { SearchInput } from "components/SearchInput";
import { Toggle } from "components/Toggle";
import { useResponsive } from "hooks/useResponsive";
import { FC, HTMLAttributes, useState } from "react";
import * as styles from "./styles";

type ProjectControllerProps = HTMLAttributes<HTMLDivElement>;

const TOGGLE_OPTIONS = [
  { content: <GridViewIcon />, value: "grid" },
  { content: <ListIcon />, value: "list" },
];

export const ProjectsController: FC<ProjectControllerProps> = (props) => {
  const { isDesktop } = useResponsive();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((prev) => !prev);
  return (
    <div {...props} className={cx(styles.main, props.className)}>
      <SearchInput
        className={styles.search}
        id="projects-search-input"
        label="project search"
        placeholder="Search for a project"
      />
      <ButtonPrimary
        className={styles.filterButton}
        icon={<TuneIcon />}
        onClick={toggleModal}
        label={<span>Filters</span>}
      />
      {isDesktop && <Toggle onChange={console.log} options={TOGGLE_OPTIONS} />}
      <ProjectsFilterModal
        showModal={modalOpen}
        onToggleModal={toggleModal}
        closeOnBackgroundClick
      />
    </div>
  );
};
