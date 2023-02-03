import { cx } from "@emotion/css";
import { t } from "@lingui/macro";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Tippy from "@tippyjs/react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import * as styles from "./styles";

type Props<T> = {
  onChange: (value: Option<T> | undefined) => void;
  default: string;
  options: Option<T>[];
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

type Option<T> = { id: string; value: T; label: string };

export function Dropdown<T>(props: Props<T>) {
  const defaultOption = props.options.find(({ id }) => id === props.default);
  const [value, setValue] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((current) => !current);
  const close = () => setIsOpen(false);

  // always close dropdown if label changed
  useEffect(() => {
    props.onChange(value);
    close();
  }, [value]);

  return (
    <div className={cx(styles.tippyContainer, props.className)}>
      <Tippy
        content={
          <div className={styles.dropDownMenu}>
            {props.options.map((option) => (
              <DropdownButton
                key={option.id}
                label={option.label}
                onClick={() => setValue(option)}
                active={value === option.value}
              />
            ))}
          </div>
        }
        interactive={true}
        onClickOutside={toggle}
        visible={isOpen}
        placement="bottom-end"
        popperOptions={{
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                rootBoundary: "document",
              },
            },
          ],
        }}
      >
        <button
          onClick={toggle}
          role="button"
          className={styles.dropdownHeader}
          aria-label={t({
            id: "resources.list.select.sort_by.toggle",
            message: "Toggle Sorted by menu",
          })}
        >
          {`Sort By: ${value?.label}`}
          {isOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )}
        </button>
      </Tippy>
    </div>
  );
}

type DropdownButtonProps = {
  label: string;
  onClick: () => void;
  active: boolean;
};

const DropdownButton: FC<DropdownButtonProps> = (props) => (
  <button
    className={styles.sortbyButton}
    onClick={props.onClick}
    role="button"
    aria-label={props.label}
    data-active={props.active}
  >
    {props.label}
  </button>
);
