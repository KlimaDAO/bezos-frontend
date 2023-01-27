import { cx } from "@emotion/css";
import { ButtonPrimary } from "@klimadao/lib/components";
import SearchIcon from "@mui/icons-material/Search";
import { InputField, InputFieldProps } from "components/shared/Form/InputField";
import { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import * as styles from "./styles";

type SearchInputProps = HTMLAttributes<HTMLInputElement> &
  Pick<InputFieldProps, "id" | "label">;

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { register } = useForm();
  return (
    <div className={styles.main}>
      <InputField
        id={props.id}
        inputProps={{
          ...register(props.id),
          className: styles.input,
          placeholder: props.placeholder,
        }}
        label={props.label}
        hideLabel
      />
      <ButtonPrimary
        className={cx(styles.button, { dark, light })}
        icon={<SearchIcon width={24} height={24} />}
      />

      {/* <input {...props} className={cx(styles.inputStyles, props.className)} />
      <button > */}
    </div>
  );
};
