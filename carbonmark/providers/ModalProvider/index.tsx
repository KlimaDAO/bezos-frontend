import {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ModalProviderContext } from "./ModalProvider.context";
import { InitialModalProviderState } from "./ModalProvider.state";

/**
 * Provides a shared context to maintain and manage Modal state for the app globally.
 * to access use the useModal hook.
 */
export const ModalProvider: FC<PropsWithChildren> = (props) => {
  const [state, setState] = useState(InitialModalProviderState);
  const { Modal } = state;

  /** Open the specified component at the top level */
  const openModal = useCallback((Modal: ReactElement) => {
    setState({ Modal });
  }, []);

  /** Removes the specified component and triggers a re-render */
  const closeModal = useCallback(() => {
    setState({ Modal: null });
  }, []);

  const modalValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  );

  return (
    <ModalProviderContext.Provider value={modalValue}>
      {props.children}
      {Modal}
    </ModalProviderContext.Provider>
  );
};

/** Use this hook to open and close modals via it's openModal and closeModal functions  */
export const useModal = () => useContext(ModalProviderContext);
