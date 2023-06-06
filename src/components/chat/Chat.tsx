import HashtagIcon from '@heroicons/react/24/outline/HashtagIcon';
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  FaceSmileIcon,
  GiftIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAppSelector } from '@/hooks';
import useSendMessage from '@/hooks/command/useSendMessage';
import useGetMessages from '@/hooks/query/useGetMessages';

import { MessageResponse } from '@/data/types';
import users from '@/data/users.json';

import Message from '@/components/chat/Message';

type Props = {
  user_id: number;
  server_id: number;
};
const Chat = ({ user_id, server_id }: Props) => {
  const channel = useAppSelector((state) => state.channel);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { handleSubmit, register, reset } = useForm<any>();
  const { handleSendMessage, loading } = useSendMessage();
  const { handleGetMessage, loading: loadingMessages, data } = useGetMessages();
  const [scrollPosition, setScrollPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const chatElement = chatRef.current;
    if (chatElement) {
      setScrollPosition(chatElement.scrollHeight - chatElement.clientHeight);
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  };
  const sendMessage = handleSubmit((data: any) => {
    const message = data.message;

    handleSendMessage({
      channel_id: channel.channel_id || -1,
      user_id: user_id,
      text: message,
      pinned: false,
      server_id: server_id,
      mentioned_users: [],
    });
    scrollToBottom();
    reset();
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (channel.channel_id) {
      getMessages(channel.channel_id);

      interval = setInterval(() => {
        getMessages(channel.channel_id || -1);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [channel.channel_id]);

  const getMessages = async (channel_id: number) => {
    const newMessages = await handleGetMessage(channel_id);
    setMessages(data || []);
  };

  return (
    <div className='flex h-screen flex-col'>
      <div className='-mt-1 flex items-center justify-between space-x-5 border-b border-gray-800 p-4'>
        <div className='flex items-center space-x-1'>
          <HashtagIcon className='text-discord_chatHeader h-4' />
          <h6 className='font-semibold text-white'>{channel.channelName}</h6>
        </div>
        <div className='flex space-x-3'>
          <BellIcon className='icon' />
          <ChatBubbleBottomCenterIcon className='icon' />
          <UsersIcon className='icon' />

          <div className='bg-discord_chatHeaderInputBg flex rounded-md p-1 text-xs'>
            <input
              type='text'
              placeholder='Search'
              className='placeholder-discord_chatHeader border-none bg-transparent pl-1 text-xs text-white focus:shadow-none focus:outline-none focus:ring-0'
              style={{
                padding: '2px',
              }}
            />
            <MagnifyingGlassIcon className='text-discord_chatHeader mr-1 h-5' />
          </div>
          <InboxIcon className='icon' />
          <QuestionMarkCircleIcon className='icon' />
        </div>
      </div>
      <main className='scrollbar-hide flex-grow overflow-y-scroll'>
        {loadingMessages && (
          <>
            <h1>Loading...</h1>
          </>
        )}
        {!loadingMessages && data && data.length > 0 && (
          <>
            {data &&
              data.length > 0 &&
              data.map((message) => {
                const {
                  id,
                  channel_id,
                  user_id,
                  text,
                  mentioned_users,
                  pinned,
                  creation_date,
                } = message;

                const userReal = users.find((user) => user.id == user_id);

                return (
                  <Message
                    key={id}
                    id={id}
                    isLoading={false}
                    message={text}
                    timestamp={creation_date}
                    username={userReal?.username || 'Unknown'}
                    image={userReal?.avatar || ''}
                  />
                );
              })}
            <div ref={chatRef} className='pb-16' />
          </>
        )}
      </main>
      <div className='mx-5 mb-7 flex items-center rounded-lg bg-[#40444b] p-2.5'>
        <PlusCircleIcon className='icon mr-4' />
        <form className='flex-grow' onSubmit={sendMessage}>
          <input
            {...register('message', { required: true })}
            type='text'
            disabled={!channel.channel_id || loading}
            placeholder={
              channel.channel_id
                ? `Message #${channel.channelName}`
                : 'Select a channel'
            }
            id='message'
            className='w-full border-none bg-transparent text-sm text-[#dcddde] placeholder-[#72767d] focus:shadow-none focus:outline-none focus:ring-0'
          />
          <button hidden type='submit'>
            Send
          </button>
        </form>
        <GiftIcon className='icon mr-2' />
        <FaceSmileIcon className='icon' />
      </div>
    </div>
  );
};

export default Chat;
