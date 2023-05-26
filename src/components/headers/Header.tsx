/* eslint-disable @next/next/no-img-element */
import { Bars2Icon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';

const Header = () => {
  const { push } = useRouter();

  const goLogin: () => Promise<boolean> = async () => {
    const result = await push('/login');
    return result;
  };

  const handleClick = () => {
    goLogin()
      .then((result) => {
        // Handle the result, which is a boolean
        // Additional event handling code
      })
      .catch((error) => {
        // Handle any errors that occur during the login process
      });
  };

  return (
    <header className='bg-discord_blue flex items-center justify-between  px-6 py-4'>
      <UnderlineLink href='/'>
        <img
          src='/svg/discord.svg'
          alt='Logo'
          className='h-12 w-32 object-contain'
        />
      </UnderlineLink>
      <div className=' hidden space-x-6 text-white lg:flex'>
        <UnderlineLink href='/' className='link'>
          Download
        </UnderlineLink>
        <UnderlineLink
          href='/'
          className='link
        '
        >
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
      <div className='flex items-center space-x-4'>
        <Button
          variant='outline'
          onClick={handleClick}
          className='hover:text-discord_blurple 
          hover:border-discord_blurple
          whitespace-nowrap
        rounded-full bg-white p-2 px-4 text-xs font-medium text-black transition duration-200 ease-in-out hover:bg-white hover:shadow-2xl hover:shadow-sky-800 focus:outline-none md:text-sm'
        >
          Login
        </Button>
      </div>
      <Bars2Icon className='h-9 cursor-pointer text-white lg:hidden' />
    </header>
  );
};

export default Header;
