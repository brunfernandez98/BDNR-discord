import {
  ChevronDownIcon,
  CogIcon,
  MicrophoneIcon,
  PhoneIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { useAppSelector } from '@/hooks';

import channelsData from '@/data/channels.json';
import serversData from '@/data/servers.json';

import Channel from '@/components/Channel';
import Chat from '@/components/chat/Chat';
import MainIcon from '@/components/MainIcon';
import ServerIcon from '@/components/ServerIcon';

type Server = {
  id: number;
  name: string;
  image: string;
  isHovered: boolean;
  users: number[];
};

type ChannelType = {
  id: number;
  name: string;
  serverId: number;
  users: number[];
};

const existUserOnList = (userId: number, users: number[]) => {
  return users.some((user) => user === userId);
};

const Home = () => {
  const [servers, setServers] = useState<Server[]>(serversData);
  const [serverSelected, setSeverSelected] = useState<Server>();
  const [channels, setChannels] = useState<ChannelType[]>();

  const user = useAppSelector((state) => state.main);

  const filteredServers = servers.filter((server) =>
    existUserOnList(user.id || 0, server.users)
  );

  const handleMouseEnter = (id: number) => {
    setServers((prevServers) =>
      prevServers.map((server) =>
        server.id === id ? { ...server, isHovered: true } : server
      )
    );
  };

  const handleMouseLeave = (id: number) => {
    setServers((prevServers) =>
      prevServers.map((server) =>
        server.id === id ? { ...server, isHovered: false } : server
      )
    );
  };

  const searchServer = (id: number) => {
    return servers.find((server) => server.id === id);
  };

  const handleClick = (id: number) => {
    setSeverSelected(searchServer(id));
    setChannels([]);
    const channelsToAdd: React.SetStateAction<ChannelType[] | undefined> = [];
    channelsData?.forEach((channel: ChannelType) => {
      if (
        channel.serverId === id &&
        existUserOnList(user.id || 0, channel.users)
      ) {
        channelsToAdd.push(channel);
      }
    });
    setChannels(channelsToAdd);
  };

  return (
    <motion.div
      className='flex h-screen overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <div className='flex min-w-max flex-col items-center space-y-3 bg-[#202225] p-3'>
        <div className='cursor-newtab flex  items-center justify-center rounded-2xl  transition-all duration-200 ease-out hover:rounded-2xl '>
          <MainIcon image='images/discord-avatar.gif' />
        </div>
        <hr className='mx-auto w-8 border border-gray-700 ' />
        {filteredServers.map((server) => (
          <ServerIcon
            isHovered={server.isHovered}
            key={server.id}
            onMouseEnter={() => handleMouseEnter(server.id)}
            onMouseLeave={() => handleMouseLeave(server.id)}
            onClick={() => handleClick(server.id)}
            image={server.image}
          />
        ))}
        <div className='server-default hover:bg-discord_green group '>
          <PlusIcon className='text-discord_green h-7 w-7 group-hover:text-white' />
        </div>
      </div>

      <div className='flex min-w-max flex-col bg-[#2f3136]'>
        <h2 className='flex cursor-pointer items-center justify-between border-b border-gray-800 p-4 text-sm font-bold text-white hover:bg-[#34373C]'>
          {serverSelected?.name} <ChevronDownIcon className='ml-2 h-5' />
        </h2>
        <div className='scrollbar-hide flex-grow overflow-y-auto text-[#8e9297]'>
          <div className='mb-2 flex items-center p-2'>
            <ChevronDownIcon className='mr-2  h-3' />
            <h4 className='text-sm font-semibold '>Channels</h4>
            <PlusIcon
              className='ml-auto h-6 cursor-pointer hover:text-white'
              /* onClick={handleAddChannel} */
            />
          </div>
          <div className='mb-4 flex flex-col space-y-2 px-2'>
            {channels?.map((channel) => (
              <Channel
                key={channel.id}
                id={channel.id}
                channelName={channel.name}
              />
            ))}
          </div>
        </div>
        <div className='flex items-center justify-between space-x-8 bg-[#292b2f] p-2'>
          <div className='flex items-center space-x-1'>
            <img
              src={user?.avatar ? user?.avatar : 'images/discord-avatar.gif'}
              alt=''
              className='h-10 rounded-full'
            />

            <h4 className='text-xs font-medium text-white'>
              {user?.username}{' '}
              <span className='block text-[#b9bbbe]'>
                #{user?.hastagh?.substring(0, 4)}
              </span>
            </h4>
          </div>

          <div className='flex items-center text-gray-400'>
            <div className='rounded-md p-2 hover:bg-[#3A3C43]'>
              <MicrophoneIcon className='icon h-5 ' />
            </div>
            <div className='rounded-md p-2 hover:bg-[#3A3C43]'>
              <PhoneIcon className='icon h-5' />
            </div>
            <div className='rounded-md p-2 hover:bg-[#3A3C43]'>
              <CogIcon className='icon h-5' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex-grow bg-[#36393f]'>
        <Chat user_id={user.id || -1} server_id={serverSelected?.id || -1} />
      </div>
    </motion.div>
  );
};

export default Home;
