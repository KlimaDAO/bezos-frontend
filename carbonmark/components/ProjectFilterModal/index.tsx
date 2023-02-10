import { ButtonPrimary, ButtonSecondary } from "@klimadao/lib/components";
import { Accordion } from "components/Accordion";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { Dropdown } from "components/Dropdown";
import Modal from "components/Modal";
import { titleCase } from "lib/string.utils";
import { useForm } from "react-hook-form";
import { FILTERS } from "./constants";
import * as styles from "./styles";

const SORT_OPTIONS = [
  "recently-updated",
  "price-lowest",
  "price-highest",
  "vintage-newest",
  "vintage-oldest",
] as const;

type ModalFieldValues = {
  countries: string[];
  categories: string[];
  vintages: string[];
  sort: SortOption;
};

type SortOption = (typeof SORT_OPTIONS)[number];

export const ProjectsFilterModal = () => {
  const { control } = useForm<ModalFieldValues>({
    defaultValues: {
      sort: "recently-updated",
      countries: [],
      categories: [],
      vintages: [],
    },
  });

  return (
    <Modal title="Filter Results" className={styles.main}>
      <Dropdown<SortOption, ModalFieldValues>
        name="sort"
        className="dropdown"
        default="recently-updated"
        control={control}
        options={SORT_OPTIONS.map((option) => ({
          id: option,
          label: titleCase(option),
          value: option,
        }))}
      />

      <Accordion label="Country">
        {/* @todo Extract available countries from projects data and add here */}
      </Accordion>
      <Accordion label="Category">
        <CheckboxGroup
          options={FILTERS.CATEGORIES}
          name="categories"
          control={control}
        />
      </Accordion>
      <Accordion label="Vintage">Content</Accordion>

      <ButtonPrimary className={"action"} label="Apply" />
      <ButtonSecondary className={"action"} label="Clear Filters" />
    </Modal>
  );
};
