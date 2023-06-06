import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  image: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

const ServerIcon = ({
  image,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) => {
  const imageAnimation = {
    borderRadius: isHovered ? '40%' : '50%',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  };

  return (
    <div
      className='cursor-newtab relative flex items-center px-2
       shadow-sm
      '
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {isHovered && (
        <motion.div
          className='absolute left-0 h-1/2 w-1 -translate-x-2 transform rounded-r-md bg-white'
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
      <motion.img
        src={image}
        alt=''
        className='h-12'
        initial={{ scale: 1 }}
        animate={imageAnimation}
      />
    </div>
  );
};

export default ServerIcon;
