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
};

export const ProjectsFilterModal = () => {
  const { control } = useForm<ModalFieldValues>({
    defaultValues: {
      countries: [],
      categories: [],
      vintages: [],
    },
  });

  return (
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
        {/* <CheckboxGroup
          options={[
            { label: "Another test", value: "another" },
            { label: "Test", value: "test" },
          ]}
          name="countries"
          control={control}
        /> */}
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
