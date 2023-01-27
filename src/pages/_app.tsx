import type { AppProps } from 'next/app';

import Loader from '@/components/loader';
import { AuthProvider } from '@/contexts/auth-context';
import { WebsocketProvider } from '@/contexts/websocket-context';
import { GlobalStyle } from '@/theme/global-style';
import { theme } from '@/theme/theme';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <AuthProvider>
      <WebsocketProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {loading ? (
            <Loader isLoading={loading} />
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </WebsocketProvider>
    </AuthProvider>
  )
}
