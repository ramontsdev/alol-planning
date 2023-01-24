import type { AppProps } from 'next/app'

import { AuthProvider } from '@/contexts/auth-context'
import { WebsocketProvider } from '@/contexts/websocket-context'
import { GlobalStyle } from '@/theme/global-style'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <WebsocketProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </WebsocketProvider>
    </AuthProvider>
  )
}
