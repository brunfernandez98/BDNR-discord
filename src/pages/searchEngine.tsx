import React, { useState } from 'react';

import MessageInsert from '@/components/searchEngine/MessageInsert';
import MessageSearch from '@/components/searchEngine/MessageSearch';
import MessageView from '@/components/searchEngine/MessageView';

const SearchEngine = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchData, setSearchData] = useState(null);
  const [insertData, setInsertData] = useState(null);

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleSearchSubmit = (data: React.SetStateAction<null>) => {
    setSearchData(data);
    setInsertData(null);
  };

  const handleInsertSubmit = (data: React.SetStateAction<null>) => {
    setInsertData(data);
    setSearchData(null);
  };

  return (
    <div
      className='relative flex min-h-screen items-center justify-center bg-black bg-cover bg-center bg-no-repeat'
      style={{
        position: 'relative',
      }}
    >
      <div className='w-1/2 p-6'>
        <div className='mb-4 flex'>
          <button
            className={`${
              activeTab === 'search'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } rounded-l-md px-4 py-2 focus:outline-none`}
            onClick={() => handleTabChange('search')}
          >
            Buscar
          </button>
          <button
            className={`${
              activeTab === 'insert'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            } rounded-r-md px-4 py-2 focus:outline-none`}
            onClick={() => handleTabChange('insert')}
          >
            Insertar
          </button>
        </div>
        {activeTab === 'search' ? (
          <>
            <h2 className='mb-4 text-2xl font-bold text-white'>
              Buscar Mensajes
            </h2>
            <MessageSearch onSubmit={handleSearchSubmit} />
          </>
        ) : (
          <>
            <h2 className='mb-4 text-2xl font-bold text-white'>
              Insertar Mensajes
            </h2>
            <MessageInsert onSubmit={handleInsertSubmit} />
          </>
        )}
        {searchData && <MessageView messages={searchData} />}
      </div>
    </div>
  );
};

export default SearchEngine;
