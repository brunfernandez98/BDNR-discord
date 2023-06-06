import { ApolloProvider } from '@apollo/client';
import { Lora } from '@next/font/google';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import client from '../config/apolloClient';
import { store } from '../stores/store';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
const lora = Lora({
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div>
        <style jsx global>
          {`
            :root {
              --lora-font: ${lora.style.fontFamily};
            }
          `}
        </style>

        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </div>
    </Provider>
  );
}

export default MyApp;
