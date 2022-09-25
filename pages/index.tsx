import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import type { NextPage } from "next";

const PageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: black;
`;

const Home: NextPage = () => {
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
      <PageContainer></PageContainer>
    </>
  );
};

export default Home;
