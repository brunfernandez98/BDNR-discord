/* eslint-disable @next/next/no-img-element */
import { ArrowDownTrayIcon as DownloadIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';

const Home = () => {
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    const detectPlatform = () => {
      const userAgent = navigator.userAgent || navigator.vendor;

      if (/windows/i.test(userAgent)) {
        setPlatform('Windows');
      } else if (/mac/i.test(userAgent)) {
        setPlatform('Mac');
      } else if (/iPad|iPhone|iPod/.test(userAgent)) {
        setPlatform('Apple Store');
      } else if (/android/i.test(userAgent)) {
        setPlatform('Google Play');
      } else if (/linux/i.test(userAgent)) {
        setPlatform('Linux');
      } else {
        setPlatform('Unknown');
      }
    };

    detectPlatform();
  }, []);

  return (
    <div className='pb-8 md:pb-0 '>
      <div className='md:h-83vh relative h-screen p-7 py-9 md:flex'>
        <div className='flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center'>
          <h1 className='text-5xl font-bold tracking-wide text-white'>
            Your place to talk
          </h1>
          <h2
            className='w-full text-lg font-light tracking-wide
           text-white
            lg:max-w-3xl
          '
          >
            Whether you’re part of a school club, a gaming group, a worldwide
            art community, or just a handful of friends that want to spend time
            together, Discord makes it easy to talk every day and hang out more
            often.
          </h2>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row'>
            <Button
              className='
              text-dark
              hover:text-discord_blue
              flex
               w-full
      items-center justify-center rounded-full bg-white p-4  text-lg font-medium transition
      duration-200 ease-in-out hover:bg-white hover:shadow-2xl focus:outline-none sm:w-60 md:w-full lg:w-60
    '
            >
              <DownloadIcon className='mr-2 w-6' />
              Download for {platform}
            </Button>
            <Button
              className='
              
      flex w-full items-center justify-center rounded-full bg-gray-900 p-4 text-lg font-medium text-white transition duration-200 ease-in-out hover:bg-gray-800
      hover:shadow-2xl focus:outline-none sm:w-72 md:w-full lg:w-72
    '
            >
              Open Discord in your browser
            </Button>
          </div>
        </div>
        <div className='flex-grow'>
          <img
            className='
            absolute -left-36 mt-16 sm:-left-44
            md:hidden
            '
            src='/svg/mainimage-1.svg'
            alt='Discord svg 1'
          />
          <img
            src='/svg/mainimage-2.svg'
            className='
            absolute
            hidden md:inline
            '
            alt='Discord svg 2'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
