import { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "@mantine/hooks";
import superjson from "superjson";

import { Shortl } from "~/types/shortl";

type HistoryProviderProps = {
  children: ReactNode;
};

type HistoryContextType = {
  shortls: Shortl[];
  add: (shortl: Shortl) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const HistoryContext = createContext<HistoryContextType>({
  shortls: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
});

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [shortls, setShortls, clearShortls] = useLocalStorage<Shortl[]>({
    key: `${process.env.NEXT_PUBLIC_APP_TITLE}`.toLowerCase(),
    defaultValue: [],
    serialize: superjson.stringify,
    deserialize: superjson.parse,
    getInitialValueInEffect: true,
  });

  const add = (shortl: Shortl) => {
    setShortls((shortls) => {
      return [shortl, ...shortls];
    });
  };

  const remove = (id: number) => {
    setShortls((shortls) => {
      return shortls.filter((shortl) => shortl.id !== id);
    });
  };

  const clear = () => {
    clearShortls();
  };

  return <HistoryContext.Provider value={{ shortls, add, remove, clear }}>{children}</HistoryContext.Provider>;
}

export const useHistory = () => useContext(HistoryContext);
