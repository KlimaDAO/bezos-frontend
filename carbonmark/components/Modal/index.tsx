import { Text } from "@klimadao/lib/components";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames";
import { useModal } from "providers/ModalProvider";
import { ButtonHTMLAttributes, FC, HTMLAttributes, ReactElement } from "react";
import * as styles from "./styles";

export type ModalActionConfig = {
  [K in "primary" | "secondary" | "cancel"]?: {
    label: string;
    onClick?: () => void;
    "data-testid"?: string;
  } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children">;
};

export type ModalProps = {
  overlay?: boolean;
  title?: string;
  actions?: ModalActionConfig;
  icon?: ReactElement;
  onClose?: () => void;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Modal component
 * @param {boolean} overlay Whether to show a background overlay while the modal is open
 * @param {string} title The title for the modal
 * @param {ModalActionConfig} actions Definitions for each of the possible buttons
 * @param {ReactElement} Icon Icon for the top left corner of the Modal
 * @param {string} onClose onClose action callback
 */
const Modal: FC<ModalProps> = (props) => {
  const { closeModal } = useModal();
  const { overlay = true, title, children, actions } = props;
  return (
    <div>
      {/* If the overlay has been specified render it first */}
      {overlay ? (
        <div className={styles.overlay} data-testid="modal-overlay" />
      ) : null}
      <div className={classNames([styles.modal, props.className])} {...props}>
        <div className={classNames([styles.heading, "modalHeading"])}>
          {title && (
            <Text t="h4" className="title">
              {title}
            </Text>
          )}
          <button
            onClick={() => {
              props.onClose?.();
              closeModal();
            }}
            className={styles.closeButton}
          >
            <CloseIcon />
          </button>
        </div>
        <div
          className={classNames({ [styles.content]: !!title }, "modalContent")}
        >
          {children}
        </div>
        {/* {actions && (
          <div className={classNames([styles.actions, "modalActions"])}>
            {Object.entries(actions || {}).map(
              ([key, { label, onClick}]) => {
                const ButtonComponent = key === "primary" ? ButtonPrimary : ButtonSecondary;
                return <ButtonComponent
                  {...props}
                  key={key}
                  onClick={() => {
                    onClick?.();
                    if (key === "cancel") closeModal();
                  }}
                />}
              )
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Modal;
