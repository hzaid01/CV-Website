import { createContext, PropsWithChildren, useContext } from "react";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

const noop = () => {};

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const value = {
    isLoading: false,
    setIsLoading: noop,
    setLoading: noop,
  };

  return (
    <LoadingContext.Provider value={value}>
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
