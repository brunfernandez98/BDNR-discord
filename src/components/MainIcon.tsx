import { motion } from 'framer-motion';
import React, { useState } from 'react';

type Props = {
  image: string;
};

const MainIcon = ({ image }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const imageAnimation = {
    borderRadius: isHovered ? '40%' : '50%',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  };

  return (
    <div
      className='cursor-newtab relative flex items-center px-2 shadow-sm'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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

export default MainIcon;
