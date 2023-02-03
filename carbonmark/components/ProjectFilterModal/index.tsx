import { ButtonPrimary, ButtonSecondary } from "@klimadao/lib/components";
import { Dropdown } from "components/Dropdown";
import Modal from "components/Modal";
import { titleCase } from "lib/string.utils";
import * as styles from "./styles";
const SORT_OPTIONS = [
  "recently-updated",
  "price-lowest",
  "price-highest",
  "vintage-newest",
  "vintage-oldest",
] as const;

export const ProjectsFilterModal = () => (
  <Modal title="Filter Results" className={styles.main}>
    <Dropdown
      className="dropdown"
      default="recently-updated"
      onChange={console.log}
      options={SORT_OPTIONS.map((option) => ({
        id: option,
        label: titleCase(option),
        value: option,
      }))}
    />
    <ButtonPrimary className={"action"} label="Apply" />
    <ButtonSecondary className={"action"} label="Clear Filters" />
  </Modal>
);
