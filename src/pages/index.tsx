import * as React from 'react';

import Header from '@/components/headers/Header';
import Home from '@/components/home';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <div
      className='
      bg-discord_blue
      min-h-screen
      '
    >
      <Header />
      <main>
        <Home />
      </main>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo templateTitle='Menu Principal | BDNR 2023' />

        <footer className='bg-discord_blue fixed bottom-0 left-0 right-0 text-center text-white'>
          <div className='mx-auto max-w-7xl px-4 py-2'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink
              href='https://theodorusclarence.com?ref=tsnextstarter'
              target='_blank'
              className='text-white'
            >
              Base de datos no relacional
            </UnderlineLink>
          </div>
        </footer>
      </Layout>
    </div>
  );
}
