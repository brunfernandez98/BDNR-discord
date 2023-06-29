import { useRouter } from 'next/router';
import React from 'react';

import useDoLogin from '@/hooks/command/useDoLogin';

import { UserCredential } from '@/data/types';
import users from '@/data/users.json';

import LoadingCube from '@/components/loading/loading';

const Login = () => {
  const { handleLogin, error, loading } = useDoLogin();

  const router = useRouter();

  const openSearchEngine = () => {
    router.push('/searchEngine');
  };

  const doLogin = async ({
    id,
    username,
    email,
    avatar,
    hastagh,
  }: UserCredential) => {
    await handleLogin({
      id,
      username,
      email,
      avatar,
      hastagh,
    });
    await router.push('/home');
  };

  return (
    <>
      {loading && <LoadingCube />}
      <div
        className='flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: 'url(/images/header-discord.jpg)' }}
      >
        <div className='w-full max-w-md'>
          <div className='bg-discord_darkgrey mb-2 rounded-xl px-4 pb-8 pt-4 shadow-md'>
            <h2 className='text-discord_white mb-2 text-center text-lg font-bold'>
              Accounts
            </h2>
            <h3 className='text-discord_grey mb-2 text-center text-sm font-bold'>
              Choose an account
            </h3>
            <div className='flex flex-col'>
              {users.map((user) => (
                <div
                  key={user.id}
                  className='bg-discord_dark mb-4 flex items-center rounded-md p-2 px-4'
                >
                  <img
                    className='mr-2 h-8 w-8 rounded-full'
                    src={user.avatar}
                    alt={user.username}
                  />
                  <div className='flex flex-col'>
                    <div className='text-discord_white text-xs font-medium'>
                      {user.username}
                    </div>
                    <div className='text-discord_greyletter text-xs font-medium'>
                      #{user.hastagh}
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <button
                      onClick={() =>
                        doLogin({
                          id: user.id,
                          username: user.username,
                          email: user.email,
                          avatar: user.avatar,
                          hastagh: user.hastagh,
                        })
                      }
                      className='cursor-newtab bg-discord_grey hover:bg-discord_lightgreyletter focus:shadow-outline rounded px-2 py-2 text-xs text-white focus:outline-none'
                      type='button'
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              ))}
              <div className='ml-auto'>
                <button
                  onClick={openSearchEngine}
                  className='cursor-newtab bg-discord_grey hover:bg-discord_lightgreyletter focus:shadow-outline rounded px-2 py-2 text-xs text-white focus:outline-none'
                  type='button'
                >
                  Open SearchEngine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
