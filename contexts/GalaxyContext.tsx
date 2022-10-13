import React, { useContext, useState } from "react";
import { StarAttr } from "../types/Star";

interface GalaxyContextType {
  database: StarAttr[];
  hoverStar: StarAttr | null;
  setHoverStar: (hoverStar: StarAttr) => void;
}

export const GalaxyContext = React.createContext<GalaxyContextType>({
  database: [],
  hoverStar: null,
  setHoverStar: () => {
    /* to be filled */
  },
});

export const GalaxyContextProvider: React.FC<{
  database: StarAttr[];
  children: React.ReactNode;
}> = (props) => {
  const [hoverStar, setHoverStar] = useState<StarAttr | null>(null);

  return (
    <GalaxyContext.Provider
      value={{
        database: props.database,
        hoverStar: hoverStar,
        setHoverStar: setHoverStar,
      }}
    >
      {props.children}
    </GalaxyContext.Provider>
  );
};

export const useGalaxyContext = () => useContext(GalaxyContext);
