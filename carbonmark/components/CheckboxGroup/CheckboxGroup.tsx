import { Checkbox } from "components/shared/Form";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import * as styles from "./CheckboxGroup.styles";
import { CheckboxOption } from "./CheckboxGroup.types";

type Props<T extends FieldValues> = {
  options: CheckboxOption[];
  name: Path<T>;
  control: Control<T>;
};

export const CheckboxGroup = <T extends FieldValues>(props: Props<T>) => {
  const { field } = useController({
    control: props.control,
    name: props.name,
  });
  return (
    <div className={styles.main}>
      {props.options.map((option) => (
        <Checkbox
          id={`${props.name}-${option.value}`}
          key={`${props.name}-${option.value}`}
          label={option.label}
          inputProps={{
            name: props.name,
            value: option.value,
            checked: field.value.includes(option.value),
            onChange: (e) => {
              if (e.target.checked) {
                /** Add field to list of checked values */
                field.onChange([...field.value, e.target.value]);
              } else {
                /** Remove any field from list of checked values */
                field.onChange(() =>
                  field.value.filter(() => option.value !== e.target.value)
                );
              }
            },
          }}
        />
      ))}
    </div>
  );
};
