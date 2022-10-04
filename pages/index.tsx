import { css, Global } from "@emotion/react";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import type { NextPage } from "next";
import ColorFader from "../components/ColorFader";
import Galaxy from "../components/Galaxy";
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
      <Canvas dpr={[1, 2]}>
        <Galaxy database={database} />
      </Canvas>
      <ColorFader />
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
