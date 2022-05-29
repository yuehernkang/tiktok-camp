import '../styles/globals.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import firebaseConfig  from '../app/firebase_config';
import { getDatabase } from 'firebase/database'; // Firebase v9+
import { initializeApp } from 'firebase/app';

import { Provider } from 'react-redux';
import store from "../app/store"
import Layout from '../components/layout';


const theme = {
  colors: {
    primary: '#00539CFF',
    redText: '#C0353C'
  },
}

export default function MyApp({ Component, pageProps }) {
  const app = initializeApp(firebaseConfig);

  return (
        <Provider store={store}>
          <Layout>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </Layout>
        </Provider>
  )
}
