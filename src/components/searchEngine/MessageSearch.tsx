import React, { useState } from 'react';

const MessageSearch = ({ onSubmit }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = () => {
    onSubmit(searchQuery, searchOption, selectedDate);
    setSearchQuery('');
    setSelectedDate('');
  };

  const handleOptionChange = (option: string) => {
    setSearchOption(option);
    setShowCalendar(option === 'creation_date');
    setSelectedDate('');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className='space-y-4'>
      {showCalendar ? (
        <div>
          <label htmlFor='calendar' className='text-white'>
            Fecha:
          </label>
          <input
            type='date'
            id='calendar'
            value={selectedDate}
            onChange={handleDateChange}
            className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
            placeholder='Selecciona una fecha'
          />
        </div>
      ) : (
        <div>
          <label htmlFor='searchQuery' className='text-white'>
            Buscar:
          </label>
          <input
            type='text'
            id='searchQuery'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none'
            placeholder='Introduce tu búsqueda'
          />
        </div>
      )}

      <div className='flex items-center'>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='link'
            checked={searchOption === 'link'}
            onChange={() => handleOptionChange('link')}
            className='mr-1'
          />
          Link
        </label>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='creation_date'
            checked={searchOption === 'creation_date'}
            onChange={() => handleOptionChange('creation_date')}
            className='mr-1'
          />
          Fecha de creación
        </label>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='channel'
            checked={searchOption === 'channel'}
            onChange={() => handleOptionChange('channel')}
            className='mr-1'
          />
          Canal
        </label>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='user'
            checked={searchOption === 'user'}
            onChange={() => handleOptionChange('user')}
            className='mr-1'
          />
          Usuario
        </label>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='audio'
            checked={searchOption === 'audio'}
            onChange={() => handleOptionChange('audio')}
            className='mr-1'
          />
          Audio
        </label>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='video'
            checked={searchOption === 'video'}
            onChange={() => handleOptionChange('video')}
            className='mr-1'
          />
          Video
        </label>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='hashtag'
            checked={searchOption === 'hashtag'}
            onChange={() => handleOptionChange('hashtag')}
            className='mr-1'
          />
          Hashtag
        </label>
        <label className='mr-2 text-white'>
          <input
            type='radio'
            name='searchOption'
            value='server'
            checked={searchOption === 'server'}
            onChange={() => handleOptionChange('server')}
            className='mr-1'
          />
          Servidor
        </label>
      </div>

      <button
        onClick={handleSearch}
        className='bg-discord_purple hover:bg-discord_green_hover rounded-md px-6 py-2 text-white focus:outline-none'
      >
        Buscar
      </button>
    </div>
  );
};

export default MessageSearch;
