import { css, Global } from "@emotion/react";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import type { NextPage } from "next";
import ColorFader from "../components/ColorFader";
import Galaxy from "../components/Galaxy";
import StarMetaDisplay from "../components/StarMetaDisplay";
import { GalaxyContextProvider } from "../contexts/GalaxyContext";
import { StarAttr } from "../types/Star";

const Home: NextPage<{ database: StarAttr[] }> = ({ database }) => {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #__next {
            width: 100%;
            height: 100%;
          }
        `}
      />
      <GalaxyContextProvider database={database}>
        <Canvas dpr={[1, 2]}>
          <Galaxy />
        </Canvas>
        <ColorFader />
        <StarMetaDisplay />
      </GalaxyContextProvider>
    </>
  );
};

export const getStaticProps = async () => {
  const PATH =
    "https://raw.githubusercontent.com/havana723/bhnb-opengl/main/scripts/reduced.json";
  try {
    const database = await axios.get<StarAttr[]>(PATH);
    return {
      props: {
        database: database.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default Home;
