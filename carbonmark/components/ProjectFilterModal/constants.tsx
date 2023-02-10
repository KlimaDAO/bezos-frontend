import { CheckboxOption } from "@klimadao/carbonmark/components/CheckboxGroup/CheckboxGroup.types";
import { Text } from "@klimadao/lib/components";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BatterySaverOutlinedIcon from "@mui/icons-material/BatterySaverOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import LandscapeOutlinedIcon from "@mui/icons-material/LandscapeOutlined";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import * as styles from "./styles";

/**@todo these probably need to come from the API */
export const FILTERS: Record<string, CheckboxOption[]> = {
  CATEGORIES: [
    {
      label: (
        <Text className={styles.option} t="caption">
          <AgricultureIcon />
          Agriculture
        </Text>
      ),
      value: "agriculture",
    },
    {
      label: (
        <Text className={styles.option} t="caption">
          <BoltIcon />
          Energy Efficiency
        </Text>
      ),
      value: "energy",
    },
    {
      label: (
        <Text className={styles.option} t="caption">
          <ParkOutlinedIcon />
          Forestry
        </Text>
      ),
      value: "forestry",
    },
    {
      label: (
        <Text className={styles.option} t="caption">
          <PrecisionManufacturingOutlinedIcon />
          Industrial Processing
        </Text>
      ),
      value: "industrial",
    },
    {
      label: (
        <Text className={styles.option} t="caption">
          <BatterySaverOutlinedIcon />
          Renewable Energy
        </Text>
      ),
      value: "renewable",
    },
    {
      label: (
        <Text className={styles.option} t="caption">
          <LandscapeOutlinedIcon />
          Other Nature-Based
        </Text>
      ),
      value: "other-nature",
    },
    {
      label: (
        <Text className={styles.option} t="caption">
          <QuestionMarkIcon />
          Other
        </Text>
      ),
      value: "other",
    },
  ],
};
