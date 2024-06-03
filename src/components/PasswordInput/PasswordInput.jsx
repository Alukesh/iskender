import React, { useState } from 'react';
import { ReactComponent as EyeIcon } from '../../components/icons/Eye.svg';
import { ReactComponent as OpenEyeIcon } from '../../components/icons/OpenEye.svg';
import { ReactComponent as KeyIcon } from '../../components/icons/Key.svg';
import { UseEnterShow } from '../../context/EnterContext';

const PasswordInput = ({ handleChange, authErr, label, addition }) => {
  const { ShowResetPhone } = UseEnterShow()
  const [shownPassword, setShownPassword] = useState(false);
  const handleShow = () => {
    setShownPassword(!shownPassword);
  };
  return (
    <div className={`input ${authErr && 'error'}`}>
      <label htmlFor='password' className='label'>
        <span>
          {label ? label : 'Пароль'}
        </span>
        {/* <span className="label-err Gilroy-n small">
          {authErr}
        </span> */}
      </label>
      <KeyIcon />
      <input
        id='password'
        name='password'
        type={shownPassword ? 'text' : 'password'}
        onChange={(e) => handleChange(e, 'password')}
      />
      {shownPassword ? (
        <OpenEyeIcon onClick={handleShow} />
      ) : (
        <EyeIcon onClick={handleShow} />
      )}
      <p onClick={ShowResetPhone} className='passwrd-sec'>{addition ? addition : 'Забыли пароль?'}</p>
    </div>
  );
};

export default PasswordInput;
