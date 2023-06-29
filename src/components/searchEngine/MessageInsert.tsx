import React, { useEffect, useState } from 'react';

import useSendMessageElastic from '@/hooks/command/useSendMessageElastic';

const MessageInsertForm = ({ onSubmit }: any) => {
  const [messageId, setMessageId] = useState('');
  const [channel, setChannel] = useState('');
  const [user, setUser] = useState('');
  const [text, setText] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);
  const [pinned, setPinned] = useState(false);
  const [creationDate, setCreationDate] = useState('');

  const {
    loading,
    handleSendMessage,
    message,
    messageError,
    setMessage,
    setMessageError,
  } = useSendMessageElastic();

  useEffect(() => {
    // Limpiar mensajes después de 5 segundos
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    // Limpiar mensajes de error después de 5 segundos
    if (messageError) {
      const timer = setTimeout(() => {
        setMessageError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messageError]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    handleSendMessage({
      message_id: messageId,
      channel,
      user,
      text,
      links,
      hashtags,
      mentioned_users: mentionedUsers,
      pinned,
      creation_date: creationDate,
    });
    setMessageId('');
    setChannel('');
    setUser('');
    setText('');
    setLinks([]);
    setHashtags([]);
    setMentionedUsers([]);
    setPinned(false);
    setCreationDate('');
  };

  return (
    <form onSubmit={handleSubmit} className='h-full space-y-4 overflow-y-auto'>
      <div>
        <label htmlFor='channel' className='text-white'>
          Canal:
        </label>
        <input
          type='text'
          id='channel'
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
          placeholder='Canal'
        />
      </div>
      <div>
        <label htmlFor='user' className='text-white'>
          Usuario:
        </label>
        <input
          type='text'
          id='user'
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
          placeholder='Usuario'
        />
      </div>
      <div>
        <label htmlFor='text' className='text-white'>
          Texto:
        </label>
        <textarea
          id='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
          placeholder='Texto'
        ></textarea>
      </div>
      <div>
        <label htmlFor='links' className='text-white'>
          Enlaces:
        </label>
        <input
          type='text'
          id='links'
          value={links.join(',')}
          onChange={(e) => setLinks(e.target.value.split(','))}
          className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
          placeholder='Enlaces'
        />
      </div>
      <div>
        <label htmlFor='hashtags' className='text-white'>
          Hashtags:
        </label>
        <input
          type='text'
          id='hashtags'
          value={hashtags.join(',')}
          onChange={(e) => setHashtags(e.target.value.split(','))}
          className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
          placeholder='Hashtags'
        />
      </div>
      <div>
        <label htmlFor='mentionedUsers' className='text-white'>
          Usuarios mencionados:
        </label>
        <input
          type='text'
          id='mentionedUsers'
          value={mentionedUsers.join(',')}
          onChange={(e) => setMentionedUsers(e.target.value.split(','))}
          className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
          placeholder='Usuarios mencionados'
        />
      </div>
      <div>
        <label htmlFor='pinned' className='text-white'>
          Fijado:
        </label>
        <input
          type='checkbox'
          id='pinned'
          checked={pinned}
          onChange={(e) => setPinned(e.target.checked)}
          className='mr-1'
        />
      </div>
      <div>
        <label htmlFor='creationDate' className='text-white'>
          Fecha de creación:
        </label>
        <input
          type='date'
          id='creationDate'
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
          className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
        />
      </div>
      <button
        disabled={loading}
        type='submit'
        className='bg-discord_green hover:bg-discord_green_hover rounded-md px-6 py-2 text-white focus:outline-none'
      >
        Insertar
      </button>
      {message && (
        <span className='animate-fade-in ml-4 text-green-500'>{message}</span>
      )}
      {messageError && (
        <span className='animate-fade-in ml-4 text-red-500'>
          {messageError}
        </span>
      )}
    </form>
  );
};

export default MessageInsertForm;
