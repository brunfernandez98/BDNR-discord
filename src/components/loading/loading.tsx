import React from 'react';

const LoadingModal = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50'>
      <div className='bg-discord_red h-24 w-24 animate-spin rounded-md'>
        <div className='bg-discord_blue h-24 w-24 animate-pulse rounded-md'></div>
      </div>
    </div>
  );
};

export default LoadingModal;
