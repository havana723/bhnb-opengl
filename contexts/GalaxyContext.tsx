import React, { useContext } from "react";
import { StarAttr } from "../types/Star";

interface GalaxyContextType {
  database: StarAttr[];
}

export const GalaxyContext = React.createContext<GalaxyContextType>({
  database: [],
});

export const GalaxyContextProvider: React.FC<{
  database: StarAttr[];
  children: React.ReactNode;
}> = (props) => {
  return (
    <GalaxyContext.Provider value={{ database: props.database }}>
      {props.children}
    </GalaxyContext.Provider>
  );
};

export const useGalaxyContext = () => useContext(GalaxyContext);
