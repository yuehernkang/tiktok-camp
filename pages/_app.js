import '../styles/globals.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { firebaseConfig } from './firebase_config';
import { getDatabase } from 'firebase/database'; // Firebase v9+

import { initializeApp } from 'firebase/app';


const theme = {
  colors: {
    primary: '#00539CFF',
  },
}

export default function MyApp({ Component, pageProps }) {
  const app = initializeApp(firebaseConfig);

  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}
