import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="crossOrigin"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard-dynamic-subset.css"
        />
        <title>BHNB</title>
        <meta name="description" content="별 헤는 밤" />
        <meta property="og:title" content="BHNB" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:site_name" content="BHNB" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="photo" />
        <meta name="twitter:title" content="BHNB" />
        <meta name="twitter:description" content="별 헤는 밤" />
        <meta name="twitter:image" content="" />
      </Head>
      <Global
        styles={css`
          ${emotionReset}

          html {
            font-family: Pretendard, -apple-system, BlinkMacSystemFont,
              system-ui, Roboto, "Helvetica Neue", "Segoe UI",
              "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              sans-serif;
          }

          *,
          *::after,
          *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
