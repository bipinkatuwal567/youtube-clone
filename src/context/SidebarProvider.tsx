import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type SideContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SideContextType | null>(null);

type SidebarProviderProps = {
  children: ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
        if(!isScreenSmall()){
            setIsSmallOpen(false);
        }
    }

    window.addEventListener("resize", handler)

    return () => {
        window.removeEventListener("resize", handler);
    }

  }, [])

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((isSmallOpen) => !isSmallOpen);
    } else {
      setIsLargeOpen((isLargeOpen) => !isLargeOpen);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close
    }}>{children}</SidebarContext.Provider>
  );
}

export function useSidebarContext(){
    const context = useContext(SidebarContext);

    if(context === null) throw new Error("SidebarContext is used outside the sidebarProvider")

    return context;
}
