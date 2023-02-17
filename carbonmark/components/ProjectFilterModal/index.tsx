import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { Dropdown } from "components/Dropdown";
import { Modal, ModalProps } from "components/shared/Modal";
// import Modal from "components/Modal";
import { titleCase } from "lib/string.utils";
import { omit } from "lodash";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FILTERS, SORT_OPTIONS } from "./constants";
import * as styles from "./styles";

type ModalFieldValues = {
  countries: string[];
  categories: string[];
  vintages: string[];
  sort: SortOption;
};

type ProjectFilterModalProps = Omit<ModalProps, "title" | "children">;

type SortOption = (typeof SORT_OPTIONS)[number];

const defaultValues: ModalFieldValues = {
  sort: "recently-updated",
  countries: [],
  categories: [],
  vintages: [],
};

export const ProjectsFilterModal: FC<ProjectFilterModalProps> = (props) => {
  const { control, reset } = useForm<ModalFieldValues>({
    defaultValues,
  });

  return (
    <Modal {...props} title="Filter Results" className={styles.main}>
      <Dropdown<SortOption, ModalFieldValues>
        name="sort"
        className="dropdown"
        default="recently-updated"
        control={control}
        options={SORT_OPTIONS.map((option) => ({
          id: option,
          label: t({
            id: `projects.filter.${option}`,
            message: titleCase(option),
          }),
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

      <ButtonPrimary className="action" label="Apply" />
      <ButtonPrimary
        variant="transparent"
        className="action"
        label="Clear Filters"
        onClick={() => reset(omit(defaultValues, "sort"))}
      />
    </Modal>
  );
};
