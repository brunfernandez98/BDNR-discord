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
import Search from '@/components/Search';

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

    const links: string[] = message.match(/(https?:\/\/[^\s]+)/g) || [];
    const hashtags: string[] = message.match(/#(\w+)/g) || [];

    const mentionedUsers: number[] = (message.match(/@(\w+)/g) || [])
      .map((mention: string) => {
        const username = mention.substring(1);
        const user = users.find((user) => user.username === username);
        return user ? user.id : null;
      })
      .filter((userId: number | null) => userId !== null);

    handleSendMessage({
      channel_id: channel.channel_id || -1,
      user_id: user_id,
      text: message,
      links: links,
      hashtags: hashtags,
      pinned: false,
      server_id: server_id,
      mentioned_users: mentionedUsers,
    });

    scrollToBottom();
    reset();
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (channel.channel_id) {
      getMessages(channel.channel_id || -1, server_id);

      interval = setInterval(() => {
        getMessages(channel.channel_id || -1, server_id);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [channel.channel_id, server_id]);

  const getMessages = async (channel_id: number, server_id: number) => {
    await handleGetMessage(channel_id, server_id);
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
            <Search />
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
                  user_id,
                  text,
                  links,
                  mentioned_users,
                  pinned,
                  creation_date,
                } = message;

                const userReal = users.find((user) => user.id == user_id);

                return (
                  <Message
                    key={id}
                    id={id}
                    mentionedUser={mentioned_users}
                    isLoading={false}
                    links={links}
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
