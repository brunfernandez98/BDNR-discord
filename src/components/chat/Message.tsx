import * as path from 'path';
import React from 'react';

type Props = {
  id: number;
  message: string;
  timestamp: string;
  username: string;
  image: string;
  isLoading: boolean;
};

const Message = ({
  id,
  message,
  timestamp,
  username,
  image,
  isLoading,
}: Props) => {
  const route = path.join('..', image);

  return (
    <div className='group my-5 mr-2 flex items-center p-1 pl-5 hover:bg-[#32353B]'>
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
        <p className='text-sm text-[#dcddde]'>{message}</p>
      </div>
    </div>
  );
};

export default Message;
