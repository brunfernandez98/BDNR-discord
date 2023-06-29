import React from 'react';

const MessageView = ({ messages }: any) => {
  return (
    <div>
      <h2 className='mb-4 text-2xl font-bold text-white'>
        Visualizar Mensajes
      </h2>
      {messages.map((message: any) => (
        <div className='mb-4 rounded-md bg-gray-800 p-4' key={message.id}>
          <p className='text-white'>ID del Canal: {message.channelId}</p>
          <p className='text-white'>ID del Usuario: {message.userId}</p>
          <p className='text-white'>Mensaje: {message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageView;
