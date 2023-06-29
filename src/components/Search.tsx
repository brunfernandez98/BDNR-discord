import React, { useState } from 'react';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSearchInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchInput(e.target.value);
  };

  const handleToggleFilterOptions = () => {
    setFilterOptionsVisible((prevState) => !prevState);
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? '' : filter));
    setFilterOptionsVisible(false);
  };

  let placeholderText = 'Search';

  if (selectedFilter) {
    placeholderText = `Search (${selectedFilter})`;
  }

  return (
    <div className='relative'>
      <div className='bg-discord_chatHeaderInputBg flex rounded-md p-1 text-xs'>
        <input
          type='text'
          placeholder={placeholderText}
          value={searchInput}
          onChange={handleSearchInputChange}
          className='placeholder-discord_chatHeader border-none bg-transparent pl-1 text-xs text-white focus:shadow-none focus:outline-none focus:ring-0'
          style={{
            padding: '2px',
          }}
        />
      </div>

      {filterOptionsVisible && (
        <div className='absolute z-10 mt-2 rounded-md bg-white px-3 py-2 shadow-md'>
          <button onClick={() => handleSelectFilter('Links')}>
            {selectedFilter === 'Links' ? 'Unselect Links' : 'Select Links'}
          </button>
          <button onClick={() => handleSelectFilter('Hastagh')}>
            {selectedFilter === 'Hastagh'
              ? 'Unselect Hastagh'
              : 'Select Hastagh'}
          </button>
          <button onClick={() => handleSelectFilter('Audio')}>
            {selectedFilter === 'Audio' ? 'Unselect Audio' : 'Select Audio'}
          </button>
        </div>
      )}

      <button className='ml-2' onClick={handleToggleFilterOptions}>
        Filters
      </button>
    </div>
  );
};

export default Search;
