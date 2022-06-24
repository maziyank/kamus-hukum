import { useCallback, useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function useNProgress() {
  const onStart = useCallback(() => {
    NProgress.start();
  }, []);

  const onEnd = useCallback(() => {
    NProgress.done(true);
  }, []);

  return useEffect(() => {
    Router.events.on("routeChangeStart", onStart);
    Router.events.on("routeChangeComplete", onEnd);
    Router.events.on("routeChangeError", onEnd);
    return () => {
      Router.events.off("routeChangeStart", onStart);
      Router.events.off("routeChangeComplete", onEnd);
      Router.events.off("routeChangeError", onEnd);
    };
  }, []);
}
