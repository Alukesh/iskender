import React from 'react';
import { ReactComponent as logo } from '../../icons/logo-of-branch.svg';
import { ReactComponent as LocationIcon } from '../../icons/locationBlue.svg';
import { ReactComponent as ClockIcon } from '../../icons/clock.svg';
import { ReactComponent as Phone } from '../../icons/phone.svg';

import './singleBranch.scss';

function SingleBranch() {
  return (
    <div className='box'>
      <div className='top'>
        <img src={logo} alt='#' />
        <div className='right'>
          <h3>Iskender shop</h3>
          <div className='info'>
            <LocationIcon />
            <span>Ул. Турусбекова A167</span>
          </div>
          <div className='info'>
            <ClockIcon />
            <span>08:00 - 22:00</span>
          </div>
        </div>
      </div>
      <button>
        <Phone />
        +996 777 777 777
      </button>
    </div>
  );
}

export default SingleBranch;
