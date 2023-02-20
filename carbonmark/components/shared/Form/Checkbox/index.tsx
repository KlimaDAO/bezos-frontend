import { cx } from "@emotion/css";
import React, { InputHTMLAttributes, ReactElement } from "react";

import { Text } from "../../Text";

import * as styles from "./styles";

interface Props {
  id: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string | ReactElement;
  errorMessage?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const inputStyles = cx(
      styles.baseStyles,
      {
        [styles.errorStyles]: !!props.errorMessage,
      },
      props.inputProps.className
    );

    return (
      <div className={styles.checkboxContainer}>
        <input
          id={props.id}
          ref={ref}
          aria-invalid={!!props.errorMessage}
          {...props.inputProps}
          type="checkbox"
          className={inputStyles}
        />
        <label htmlFor={props.id} className={styles.label}>
          {typeof props.label === "string" ? (
            <Text t="caption">{props.label}</Text>
          ) : (
            props.label
          )}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
