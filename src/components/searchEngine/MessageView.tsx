import React from 'react';

const MessageView = ({ messages }: any) => {
  return (
    <div className='overflow-auto'>
      <h2 className='mb-4 text-2xl font-bold text-white'>
        Visualizar Mensajes
      </h2>
      {}
      {messages != undefined && messages.length > 0 ? (
        messages?.map((message: any) => (
          <div
            className='mb-4 overflow-auto rounded-md bg-gray-800 p-4'
            key={message.id}
          >
            <p className='text-white'>Servidor: {message?.server}</p>
            <p className='text-white'>Canal: {message?.channel}</p>
            <p className='text-white'>Usuario: {message?.user}</p>
            <p className='text-white'>Mensaje: {message?.text}</p>
            <p className='text-white'>Fecha: {message?.creation_date}</p>
          </div>
        ))
      ) : (
        <p className='text-white'>No hay mensajes</p>
      )}
    </div>
  );
};

export default MessageView;
