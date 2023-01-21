import { InputField, InputFieldProps } from "components/shared/Form/InputField";
import { FC } from "react";

type SearchBarProps = InputFieldProps;

export const SearchBar: FC<SearchBarProps> = ({ ...rest }) => {
  //   const { register } = useForm();
  return (
    <InputField
      id="searchTerm"
      //   inputProps={{
      //     ...register("searchTerm"),
      //   }}
      label={"Search term"}
      hideLabel
      inputProps={rest}
    />
  );
};
