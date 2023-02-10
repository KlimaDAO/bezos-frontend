import { cx } from "@emotion/css";
import { Text } from "@klimadao/lib/components";
import CloseIcon from "@mui/icons-material/Close";
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
  const { overlay = true, title, children } = props;
  return (
    <div>
      {/* If the overlay has been specified render it first */}
      {overlay ? (
        <div className={styles.overlay} data-testid="modal-overlay" />
      ) : null}
      <div {...props} className={cx(styles.modal, props.className)}>
        <div className={cx(styles.heading, "modalHeading")}>
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
        <div className={cx({ [styles.content]: !!title }, "modalContent")}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
