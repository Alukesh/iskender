import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { UseEnterShow } from '../../context/EnterContext';
import { ReactComponent as NotificationIcon } from '../../components/icons/notification.svg';
// import PasswordInput from '../../components/PasswordInput/PasswordInput';
import PhoneInput from 'react-phone-number-input';
import Verification from '../../components/UI/Verification/Verification';
import { regenerateSmsCode, verifyClients } from '../../services/api';
import './Enter.scss';

const Reset = () => {
  const { ShowLoginPhone, ShowNewPassword, setResetPasswordUser } = UseEnterShow();
  const toast = useRef(null);
  const [verify, setVerify] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [userData, setUserData] = useState({
    phone: null,
  });
  const showToast = (msg) => {
    toast.current.show({
      severity: 'info',
      detail: msg,
      className: 'toaster Gilroy-m',
      icon: <NotificationIcon style={{ marginRight: '36px', minWidth: '24px' }} />
    });
  };
  // verify
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e, type) => {
    if (type === 'phone') {
      setUserData({ ...userData, [type]: e }); return
    }
    const { value } = e.target;
    setUserData({ ...userData, [type]: value })
  };

  const handleCodeSubmit = async (code) => {
    if (isLoading) return;
    verifyClients({ phone: userData.phone, code: code })
      .then(res => {
        showToast(res?.data?.msg);
        console.log(res.data.client);
        setResetPasswordUser(res.data.client)
        setVerifySuccess(true)
      })
      .catch(err => {
        showToast(err.response?.data?.msg || err.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const ClickEnterBtn = () => {
    regenerateSmsCode({ phone: userData.phone })
      .then(res => {
        console.log(res);
        showToast(res?.data?.msg)
        setVerify(true)
      })
      .catch(({ response }) => {
        console.log(response, userData);
        showToast(response?.data?.msg || response?.data?.error);
        const { errors } = response?.data
        errors?.phone &&
          showToast(errors?.phone);
        errors?.email &&
          showToast(errors?.email);
      })
  };

  return (
    <div className='wrapper'>
      <Toast ref={toast} />
      <div className='register-container'>

        {!verify ?
          (
            <div className='container'>
              <div className='description'>
                <h2 className='desc'>Восстановление пароля</h2>
                <p className='desc-sec'>
                  Введите свой телефон, который указывали при регистрации
                </p>
              </div>
              <form >
                <div className='input'>
                  <label htmlFor='phone' className='label'>
                    Номер телефона
                  </label>
                  <PhoneInput
                    id='phone'
                    name='phone'
                    defaultCountry='KG'
                    displayInitialValueAsLocalNumber
                    withCountryCallingCode
                    initialValueFormat='national'
                    value={userData.phone}
                    onChange={(e) => handleChange(e, 'phone')}
                  />
                </div>
                <div className='bottom-form'>
                  <button type='button'
                    className={!userData.phone ? 'disabled' : 'button'}
                    disabled={!userData.phone}
                    onClick={ClickEnterBtn}
                  >
                    Отправить SMS код
                  </button>
                </div>
              </form>
              <p className='registration-link' onClick={ShowLoginPhone}>
                Уже есть аккаунт? <span className='go-signIn' >Войти</span>
              </p>
            </div>
          ) :
          (
            <div className='container-register'>
              <div className='description'>
                <h2 className='desc'>Код подтверждения</h2>
                <p className='desc-sec'>
                  Для завершения регистрации введите код отправленный на номер
                  {userData.phone}
                </p>
              </div>
              <Verification isLoading={isLoading} callback={handleCodeSubmit} />
              <div className='bottom-form'>
                <button type='button'
                  className={!verifySuccess ? 'disabled' : 'button'}
                  disabled={!verifySuccess}
                  onClick={ShowNewPassword}
                >
                  Подтвердрить
                </button>
              </div>
              <p className='registration-link' onClick={ShowLoginPhone}>
                Уже есть аккаунт? <a href='#'>Войти</a>
              </p>
            </div>
          )
        }

      </div>
    </div>
  )
};

export default Reset;
