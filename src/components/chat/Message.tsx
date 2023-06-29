import * as path from 'path';
import React from 'react';

import { useAppSelector } from '@/hooks';

import users from '@/data/users.json';

type Props = {
  id: number;
  message: string;
  timestamp: string;
  username: string;
  image: string;
  links: string[];
  isLoading: boolean;
  mentionedUser: number[];
};

const Message = ({
  id,
  message,
  timestamp,
  username,
  links,
  mentionedUser,
  image,
  isLoading,
}: Props) => {
  const route = path.join('..', image);
  const user_id = useAppSelector((state) => state.main.id);
  const currentUserID = user_id;

  const isCurrentUserMentioned = mentionedUser?.some(
    (mentionedUserId) => mentionedUserId == currentUserID
  );

  const renderMessage = () => {
    const words = message.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('@')) {
        const mentionedUsername = word.substring(1);
        const mentionedUser = users.find(
          (user) => user.username === mentionedUsername
        );

        if (mentionedUser) {
          return (
            <span
              key={index}
              className='cursor-pointer rounded bg-[#7289da] text-sm text-white hover:bg-[#677bc4]'
            >
              {word}{' '}
            </span>
          );
        }
      } else if (links?.includes(word)) {
        return (
          <a
            key={index}
            href={word}
            className='cursor-pointer text-blue-500 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            {word}{' '}
          </a>
        );
      }

      return word + ' ';
    });
  };

  return (
    <div
      className={`group my-5 mr-2 flex items-center p-1 pl-5 ${
        isCurrentUserMentioned
          ? 'bg-[#444037] hover:bg-[#444037]'
          : 'hover:bg-[#32353B]'
      }`}
    >
      <img
        src={route}
        alt=''
        className='mr-3 h-10 cursor-pointer rounded-full hover:shadow-2xl'
      />
      <div className='flex flex-col'>
        <h4 className='flex items-center space-x-2 font-medium'>
          <span className='cursor-pointer text-sm text-white hover:underline'>
            {username}
          </span>
          <span className='text-xs text-[#72767d]'>{timestamp}</span>
        </h4>
        <p className='whitespace-pre-wrap text-sm text-[#dcddde]'>
          {renderMessage()}
        </p>
      </div>
    </div>
  );
};

export default Message;
