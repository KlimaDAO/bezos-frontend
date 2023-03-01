import { cx } from "@emotion/css";
import { categoryInfoMap, getFirstCategory } from "lib/getCategoryInfo";
import { CategoryName, CategoryNames } from "lib/types/carbonmark";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  category: CategoryNames | CategoryName;
};

export const Category: FC<Props> = (props) => {
  // there are more than one category if coming from a pool!
  // quick fix: take the first one
  const firstCategory = getFirstCategory(props.category);
  const category = categoryInfoMap[firstCategory];
  console.log("infoMap is", categoryInfoMap["Renewable Energy"]);

  if (!category) {
    return <div className={styles.category}>??</div>;
  }

  const Icon = category.icon;

  const other = category.key === "Other";
  return (
    <div
      className={cx(styles.category, { other })}
      style={{ backgroundColor: category.color }}
    >
      <Icon /> {category.label}
    </div>
  );
};
