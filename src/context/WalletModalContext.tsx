/* eslint-disable react-hooks/exhaustive-deps */
import { useEagerConnect, useInactiveListener } from 'hooks';
import { useState, createContext, useCallback } from 'react';

export interface IWalletModalContext {
  open: boolean;
  toggleOpen: () => void;
}

export const WalletModalContext = createContext<IWalletModalContext>({
  open: false,
  toggleOpen: () => null,
});

export function WalletModalProvider({ children }: any) {
  const [open, setOpen] = useState(false);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return <WalletModalContext.Provider value={{ open, toggleOpen }}>{children}</WalletModalContext.Provider>;
}
