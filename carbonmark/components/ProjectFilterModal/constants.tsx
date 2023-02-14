import { CheckboxOption } from "@klimadao/carbonmark/components/CheckboxGroup/CheckboxGroup.types";
import { Text } from "@klimadao/lib/components";
import { categoryInfoMap } from "lib/getCategoryInfo";
import * as styles from "./styles";

export const SORT_OPTIONS = [
  "recently-updated",
  "price-lowest",
  "price-highest",
  "vintage-newest",
  "vintage-oldest",
] as const;

/**
 * @todo these will come from the API
 * see: https://github.com/Atmosfearful/bezos-frontend/pull/187
 */
export const FILTERS: Record<string, CheckboxOption[]> = {
  CATEGORIES: Object.values(categoryInfoMap).map((category) => ({
    label: (
      <Text className={styles.option} t="caption">
        <category.icon />
        {category.label}
      </Text>
    ),
    value: category.key,
  })),
};
