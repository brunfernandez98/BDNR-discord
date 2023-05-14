/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

const Header = () => {
  return (
    <header className='flex items-center justify-between bg-black px-6 py-4'>
      <Link href='/'>
        <img
          src='/svg/discord.svg'
          alt='Logo'
          className='h-12 w-32 object-contain'
        />
      </Link>
      <div className=' hidden space-x-6 text-white lg:flex'>
        <UnderlineLink href='/' className='link'>
          Download
        </UnderlineLink>
        <UnderlineLink href='/' className='link'>
          Why Discord
        </UnderlineLink>
        <UnderlineLink href='/' className='link'>
          Nitro
        </UnderlineLink>
        <UnderlineLink href='/' className='link'>
          Safety
        </UnderlineLink>
        <UnderlineLink href='/' className='link'>
          Support
        </UnderlineLink>
      </div>
    </header>
  );
};

export default Header;