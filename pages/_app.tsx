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
