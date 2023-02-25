import { ProjectsContext } from "@klimadao/carbonmark/components/pages/Projects/state/Projects.context";
import { ButtonPrimary } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Dropdown } from "components/Dropdown";
import { ProjectFilterSortValues } from "components/pages/Projects/types";
import { Modal, ModalProps } from "components/shared/Modal";
import { Country, Vintage } from "lib/types/carbonmark";
import { omit } from "lodash";
import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import useSWRImmutable from "swr/immutable";
import { PROJECT_FILTERS, PROJECT_SORT_OPTIONS } from "./constants";
import * as styles from "./styles";

type ProjectFilterModalProps = Omit<ModalProps, "title" | "children">;

const defaultValues: ProjectFilterSortValues = {
  sort: "recently-updated",
  countries: [],
  categories: [],
  vintages: [],
};

export const ProjectFilterModal: FC<ProjectFilterModalProps> = (props) => {
  const { control, reset, handleSubmit } = useForm<ProjectFilterSortValues>({
    defaultValues,
  });

  const { state, setFilters } = useContext(ProjectsContext);

  /**
   * Because we're prefilling these queries in getStaticProps
   * the cache will return us the server fetched values
   * We're also disabling revalidation since the data doesn't change much
   */
  const { data: vintages = [], isLoading: vintagesLoading } =
    useSWRImmutable<Vintage[]>("/api/vintages");
  const { data: categories = [], isLoading: categoriesLoading } =
    useSWRImmutable<Country[]>("/api/categories");

  /**
   * @todo Not great. We need end to end typing to ensure that if the key values
   * change server side then our build fails
   */
  const categoryOptions = PROJECT_FILTERS.CATEGORIES.filter((cat) =>
    categories.map(({ id }) => id).includes(cat.value)
  );

  const vintageOptions: CheckboxOption[] = vintages.map((vintage) => ({
    label: vintage,
    id: vintage,
    value: vintage,
  }));

  return (
    <Modal {...props} title="Filter Results" className={styles.main}>
      <form onSubmit={handleSubmit(setFilters)}>
        <Dropdown
          name="sort"
          className="dropdown"
          /** @todo This seems dodgy.. it works but possible conflicting state in two places. */
          default={state.filters.sort}
          control={control}
          options={Object.entries(PROJECT_SORT_OPTIONS).map(
            ([option, label]) => ({
              id: option,
              label: label,
              value: option,
            })
          )}
        />
        {/* Disabled until data can be provided by APIs */}
        {/* <Accordion label={t`Country`}>
          <CheckboxGroup
            options={countryOptions}
            name="countries"
            control={control}
          />
      </Accordion> */}
        <Accordion label={t`Category`} loading={categoriesLoading}>
          <CheckboxGroup
            options={categoryOptions}
            name="categories"
            control={control}
          />
        </Accordion>
        <Accordion label={t`Vintage`} loading={vintagesLoading}>
          <CheckboxGroup
            options={vintageOptions}
            name="vintages"
            control={control}
          />
        </Accordion>
        <ButtonPrimary type="submit" className="action" label={t`Apply`} />
        <ButtonPrimary
          variant="transparent"
          className="action"
          label={t`Clear Filters`}
          onClick={() => reset(omit(defaultValues, "sort"))}
        />
      </form>
    </Modal>
  );
};
