import React from 'react';
import '../../styles/components/EmptySection.scss';

const EmptySection = ({icon, title}) => {
  return (
      <div className='empty_section'>
        <img className='empty_section__img' src={icon} alt="No favourites"/>

        <p className='empty_section__text'>
          {title}
        </p>
      </div>
  );
};

export default EmptySection;