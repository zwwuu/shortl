import { createContext, useCallback, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

const HistoryContext = createContext([]);

const HistoryProvider = ({ children }) => {
  const [shortls, setShortls] = useLocalStorageState(process.env.NEXT_PUBLIC_APP_STORE_NAME, {
    defaultValue: [],
    ssr: true,
  });

  const addShortl = useCallback(
    (shortl) => {
      shortls.unshift(shortl);
      setShortls(shortls);
    },
    [setShortls, shortls]
  );

  const removeShortl = useCallback(
    (id) => {
      const newShortls = shortls.filter((shortl) => shortl.id !== id);
      setShortls(newShortls);
    },
    [setShortls, shortls]
  );

  const clearHistory = useCallback(() => {
    setShortls([]);
  }, [setShortls]);

  return (
    <HistoryContext.Provider value={{ shortls, setShortls, addShortl, removeShortl, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};

export { HistoryProvider, useHistory };
