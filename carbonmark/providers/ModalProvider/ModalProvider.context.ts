import { createContext, ReactElement } from "react";

export type ModalProviderContextType = {
  /** Open the specified modal at the root of the provider */
  openModal: (Modal: ReactElement) => void;
  /** Close the last opened modal */
  closeModal: () => void;
};

export const ModalProviderContext = createContext<ModalProviderContextType>({
  openModal: () => null,
  closeModal: () => null,
});
