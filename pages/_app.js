import '../styles/globals.css'

import {ThemeProvider, CSSReset} from '@chakra-ui/react'
import { customTheme } from '../theme'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
  return new Web3Provider(provider)
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Web3ReactProvider>
    
  )
}

export default MyApp
