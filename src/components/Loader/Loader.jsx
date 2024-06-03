import React from 'react';
import '../../styles/components/Loader.scss'

const Loader = ({size = 20}) => {
  return (
      <div className='loader' style={{width: `${size}px`, height: `${size}px`}}/>
  );
};

export default Loader;