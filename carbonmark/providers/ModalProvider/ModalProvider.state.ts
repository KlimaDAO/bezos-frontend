import { ReactElement } from "react";

export const InitialModalProviderState: ModalProviderState = {
  Modal: null,
};

export type ModalProviderState = {
  Modal: ReactElement | null;
};
