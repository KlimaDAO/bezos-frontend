import { Web3ContextProvider } from "@klimadao/lib/components";
import { useTabListener } from "@klimadao/lib/utils";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { activateLocale, loadTranslation } from "lib/i18n";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useRef } from "react";

// organize-imports-ignore
import "@klimadao/lib/theme/normalize.css";
// organize-imports-ignore
import "@klimadao/lib/theme/variables.css";
// organize-imports-ignore
import "@klimadao/carbonmark/theme/variables.css"; // overrides for variables.css - must be imported after
// organize-imports-ignore
import "@klimadao/lib/theme/globals.css"; // depends on variables
// organize-imports-ignore
import "@klimadao/carbonmark/theme/globals.css"; // carbonmark specific overrides for globals.css

const loadFallbackOnServer = async () => {
  if (typeof window === "undefined") {
    const messages = await loadTranslation("en");
    activateLocale("en", messages);
  }
};

function MyApp({ Component, pageProps, router }: AppProps) {
  useTabListener();

  const firstRender = useRef(true);
  const { translation, fixedThemeName } = pageProps;

  const locale = router.locale || (router.defaultLocale as string);
  // run only once on the first render (for server side)
  if (translation && firstRender.current) {
    activateLocale(locale, translation);
    firstRender.current = false;
  } else if (
    // server only
    typeof window === "undefined" &&
    router.isFallback &&
    firstRender.current
  ) {
    loadFallbackOnServer();
    firstRender.current = false;
  }

  // listen for the locale changes
  useEffect(() => {
    if (translation && !router.isFallback) {
      activateLocale(locale, translation);
    }
  }, [locale]);

  useEffect(() => {
    if (fixedThemeName) {
      document.body.dataset.theme = fixedThemeName;
    }
  });
  const appRouter = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    appRouter.events.on("routeChangeStart", handleStart);
    appRouter.events.on("routeChangeComplete", handleStop);
    appRouter.events.on("routeChangeError", handleStop);

    return () => {
      appRouter.events.off("routeChangeStart", handleStart);
      appRouter.events.off("routeChangeComplete", handleStop);
      appRouter.events.off("routeChangeError", handleStop);
    };
  }, [appRouter]);

  return (
    <>
      <Web3ContextProvider>
        <I18nProvider i18n={i18n}>
          <Component {...pageProps} />
        </I18nProvider>
      </Web3ContextProvider>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PN73CG3');
            `,
        }}
      />
    </>
  );
}

export default MyApp;
