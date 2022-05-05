import type { AppProps } from 'next/app'
import { ChakraProvider, Divider } from '@chakra-ui/react'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { theme } from '../styles/theme'
import { CartProvider } from '../hooks/useCart'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Header />
        <Divider />

        <Component {...pageProps} />

        <Divider />
        <Footer />
      </CartProvider>
    </ChakraProvider>
  )
}
