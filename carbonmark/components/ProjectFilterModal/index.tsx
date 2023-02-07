import { ButtonPrimary, ButtonSecondary } from "@klimadao/lib/components";
import { Accordion } from "components/Accordion";
import { Dropdown } from "components/Dropdown";
import Modal from "components/Modal";
import { CheckboxGroup } from "components/pages/Resources/ResourcesFilters/CheckboxGroup";
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

    <Accordion label="Country">
      <CheckboxGroup
        options={subTags}
        formName="tags"
        control={props.control}
      />
    </Accordion>
    <Accordion label="Category">Content</Accordion>
    <Accordion label="Vintage">Content</Accordion>

    <ButtonPrimary className={"action"} label="Apply" />
    <ButtonSecondary className={"action"} label="Clear Filters" />
  </Modal>
);
