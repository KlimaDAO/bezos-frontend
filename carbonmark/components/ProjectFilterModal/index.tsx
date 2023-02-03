import { ButtonPrimary, ButtonSecondary } from "@klimadao/lib/components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Modal from "components/Modal";

type SortOptions =
  | "updated"
  | "price-low"
  | "price-high"
  | "vintage-new"
  | "vintage-old";

export const ProjectsFilterModal = () => (
  <Modal>
    <Select
      id="projects-sort-by-select"
      value={10}
      label="Sort Projects By"
      onChange={console.log}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    <ButtonPrimary label="Apply" />
    <ButtonSecondary label="Clear Filters" />
  </Modal>
);
