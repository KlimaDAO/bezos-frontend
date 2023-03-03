import { t } from "@lingui/macro";
import { Accordion } from "components/Accordion";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CheckboxGroup } from "components/CheckboxGroup/CheckboxGroup";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Dropdown } from "components/Dropdown";
import { Modal, ModalProps } from "components/shared/Modal";
import { omit } from "lodash";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import useSWRImmutable from "swr/immutable";
import { getProjectFilters, PROJECT_SORT_OPTIONS } from "./constants";
import * as styles from "./styles";

type ModalFieldValues = {
  country: string[];
  category: string[];
  vintage: string[];
  sort: SortOption;
};

type ProjectFilterModalProps = Omit<ModalProps, "title" | "children">;

type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

const defaultValues: ModalFieldValues = {
  sort: "recently-updated",
  country: [],
  category: [],
  vintage: [],
};

export const ProjectFilterModal: FC<ProjectFilterModalProps> = (props) => {
  const router = useRouter();

  const { control, reset, handleSubmit } = useForm<ModalFieldValues>({
    defaultValues,
  });

  const sort = useSearchParams().get("sort");

  /**
   * Because we're prefilling these queries in getStaticProps
   * the cache will return us the server fetched values
   * We're also disabling revalidation since the data doesn't change much
   */
  const { data: vintages = [], isLoading: vintagesLoading } =
    useSWRImmutable<string[]>("/api/vintages");
  const { data: categories = [], isLoading: categoriesLoading } =
    useSWRImmutable<{ id: string }[]>("/api/categories");

  /**
   * @todo Not great. We need end to end typing to ensure that if the key values
   * change server side then our build fails
   */
  const categoryOptions = getProjectFilters().CATEGORIES.filter((cat) =>
    categories.map(({ id }) => id).includes(cat.value)
  );

  const vintageOptions: CheckboxOption[] = vintages.map((vintage) => ({
    label: vintage,
    id: vintage,
    value: vintage,
  }));

  const onSubmit = (query: ModalFieldValues) => {
    router.replace("/projects", { query }, { shallow: true });
  };

  return (
    <Modal {...props} title="Filter Results" className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dropdown
          name="sort"
          className="dropdown"
          default={sort ?? "recently-updated"}
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
            name="category"
            control={control}
          />
        </Accordion>
        <Accordion label={t`Vintage`} loading={vintagesLoading}>
          <CheckboxGroup
            options={vintageOptions}
            name="vintage"
            control={control}
          />
        </Accordion>
        <ButtonPrimary className="action" label={t`Apply`} type="submit" />
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
