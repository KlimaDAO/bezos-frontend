import { t } from "@lingui/macro";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Text } from "components/Text";
import { categoryInfoMap } from "lib/getCategoryInfo";
import { Project } from "lib/types/carbonmark";
import { sortBy } from "lib/utils/array.utils";
import * as styles from "./styles";

export const PROJECT_SORT_OPTIONS = {
  "price-highest": t`Price Highest`,
  "price-lowest": t`Price Lowest`,
  "recently-updated": t`Recently Updated`,
  "vintage-newest": t`Vintage Newest`,
  "vintage-oldest": t`Vintage Oldest`,
} as const;

/** A mapping of sort option to sort functions */
export const PROJECT_SORT_FNS = {
  "price-highest": sortBy<Project>("price", "desc"),
  "price-lowest": sortBy<Project>("price"),
  "recently-updated": sortBy<Project>("updatedAt", "desc"),
  "vintage-newest": sortBy<Project>("vintage", "desc"),
  "vintage-oldest": sortBy<Project>("vintage"),
};

/**
 * @todo these will come from the API
 * see: https://github.com/Atmosfearful/bezos-frontend/pull/187
 */
export const PROJECT_FILTERS: Record<string, CheckboxOption[]> = {
  CATEGORIES: Object.values(categoryInfoMap).map((category) => ({
    label: (
      <Text className={styles.option} t="body1">
        <category.icon />
        {category.label}
      </Text>
    ),
    value: category.key,
  })),
};
