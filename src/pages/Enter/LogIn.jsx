import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseEnterShow } from '../../context/EnterContext';
import { ReactComponent as ArrowLeft } from "../../components/icons/arrow-enter.svg";
import { ReactComponent as NotificationIcon } from '../../components/icons/notification.svg';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import EmailInput from '../../components/EmailInput/EmailInput';
import PhoneInput from 'react-phone-number-input';
import Register from './Register';
import 'react-phone-number-input/style.css';
import './Enter.scss';
import { Toast } from 'primereact/toast';
import { loginClientEmail, loginClientPhone } from '../../services/api';
import { useDispatch } from 'react-redux';
const LogIn = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const { enterMethod, ShowRegister, HandleEndAuth } = UseEnterShow();
  const [password, setPassword] = useState('');
  const [userDataPhone, setUserDataPhone] = useState(null);
  const [userDataEmail, setUserDataEmail] = useState(null);
  const [authErr, setAuthErr] = useState("")
  const dispatch = useDispatch()


  const showToast = (msg) => {
    toast.current.show({
      // severity: 'info',
      detail: msg,
      className: 'toaster Gilroy-m',
      icon: <NotificationIcon style={{ marginRight: '36px' }} />
    });
  };
  const handleChangeUserInfo = (e) => {
    setAuthErr("")
    if (enterMethod === 'loginWithEmail') {
      setUserDataEmail(e.target.value);
      return
    }
    setUserDataPhone(e);
  };
  const handleChangePassword = (e) => {
    setAuthErr("")
    setPassword(e.target.value);
  }
  const isVariable = () => {
    if (!password) return false
    return (enterMethod === 'loginWithEmail' && userDataEmail) || (enterMethod === 'loginWithPhone' && userDataPhone)
  };
  const close = (path) => {
    HandleEndAuth()
    navigate(path, { replace: true });
  }

  const ClickEnterBtn = () => {
    if (enterMethod === 'loginWithPhone') {
      loginClientPhone({ phone: userDataPhone, password })
        .then(res => {
          close('/my-account');
          dispatch.cart.afterLoginUser(res.data.client)
        })
        .catch(err => {
          if (err?.response?.data?.msg === "Пользователь не найден") {
            setAuthErr(err?.response?.data?.msg)
          }
          setAuthErr("Не верный номер тел. или пароль")
          showToast("Не верный номер тел. или пароль")
        })
      return
    }
    loginClientEmail({ email: userDataEmail, password })
      .then(res => {
        dispatch.cart.afterLoginUser(res.data.client)
        close('/my-account')
      })
      .catch(err => {
        if (err?.response?.data?.msg === "Пользователь не найден") {
          setAuthErr(err?.response?.data?.msg)
        }
        setAuthErr("Неверный адрес электронной почты или пароль")
        showToast("Неверный адрес электронной почты или пароль")
      })
  };



  return enterMethod === 'register' ? (
    <Register />
  ) : (
    <div className='wrapper'>
      <div className='login-container'>
        <div className='container'>
          <div className='description'>
            <h2 className='desc'>Вход</h2>
            <p className='desc-sec'>Введите свои данные, чтобы войти</p>
          </div>
          <div className='goBack' onClick={HandleEndAuth}>
            <ArrowLeft width={30} height={20} />
          </div>

          <form>
            {enterMethod === 'loginWithEmail' && <EmailInput authErr={authErr} handleChange={handleChangeUserInfo} />}
            {enterMethod === 'loginWithPhone' && (
              <div className={`input ${authErr && 'error'}`}>
                <label htmlFor='phoneNumber' className='label'>
                  <span>
                    Номер телефона
                  </span>
                  <span className="label-err Gilroy-n small">
                    {authErr}
                  </span>
                </label>
                <PhoneInput
                  id='phoneNumber'
                  name='phoneNumber'
                  defaultCountry='KG'
                  placeholder={'(999) 000-000'}
                  country={"kg"}
                  displayInitialValueAsLocalNumber
                  withCountryCallingCode
                  initialValueFormat='national'
                  onChange={handleChangeUserInfo}
                />
              </div>
            )}

            <PasswordInput authErr={authErr} handleChange={handleChangePassword} />

            <div className='bottom-form'>
              <div className='remember'>
                <input type='checkbox' id={'checkbox'} />
                <label htmlFor='checkbox'>Запомнить меня</label>
              </div>
              <button type='button'
                className={!isVariable() ? 'disabled' : 'button'}
                disabled={!isVariable()}
                onClick={ClickEnterBtn}
              >
                Войти
              </button>
            </div>
          </form>

          <p className='registration-link' onClick={ShowRegister}>
            Новый пользователь? <span className='go-signIn'>Зарегистрироваться</span>
          </p>
        </div>
        <Toast ref={toast} />
      </div>
    </div>
  );
};

export default LogIn;
