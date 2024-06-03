import React from 'react';
import { ReactComponent as Message } from '../../components/icons/Message.svg';

const EmailInput = ({ handleChange, authErr }) => {
  return (
    <div className={`input ${authErr && 'error'}`}>
      <label htmlFor='email' className='label'>
        <span>
          E- mail
        </span>
        <span className={"label-err"}>
          {authErr}
        </span>
      </label>
      <Message />
      <input
        id='email'
        name='email'
        type='email'
        placeholder='Ваша почта'
        onChange={(e) => handleChange(e, 'email')}
      />
    </div>
  );
};

export default EmailInput;
