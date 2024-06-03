import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconLogo } from '../../components/icons/Group.svg';
import { ReactComponent as IconUser } from '../../components/icons/User.svg';
import { ReactComponent as IconLocation } from '../../components/icons/Location-i.svg';
import { ReactComponent as NotificationIcon } from '../../components/icons/notification.svg';
import { UseEnterShow } from '../../context/EnterContext';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import EmailInput from '../../components/EmailInput/EmailInput';
import PhoneInput from 'react-phone-number-input';
import Verification from '../../components/UI/Verification/Verification';
import { registerByEmail, verifyClients } from '../../services/api';
import './Enter.scss';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState('');

  const { HandleEndAuth, ShowLoginPhone } = UseEnterShow();

  const navigate = useNavigate();
  const toast = useRef(null);
  const [verify, setVerify] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: null,
    location: '',
    email: '',
    password: '',
  });
  const [authErr, setAuthErr] = useState({
    name: '',
    phone: null,
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeSubmit = async (code) => {
    if (isLoading) return;
    verifyClients({ phone: userData.phone, code: code })
      .then(res => {
        showToast(res?.data?.msg);
        dispatch.cart.afterLoginUser(res.data.client)
        setVerifySuccess(true)
      })
      .catch(err => {
        showToast(err.response?.data?.msg || err.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const showToast = (msg) => {
    toast.current.show({
      severity: 'info',
      detail: msg,
      className: 'toaster Gilroy-m',
      icon: <NotificationIcon style={{ marginRight: '36px', minWidth: '24px' }} />
    });
  };
  const handleChange = (e, type) => {
    if (type === 'phone') {
      setUserData({ ...userData, [type]: e }); return
    }
    if (type === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
    const { value } = e.target;
    setUserData({ ...userData, [type]: value })
  };


  const isVariable = () => {
    const { name, phone, location, email, password } = userData;
    return name && phone && location && email && password && password === confirmPassword;
  };

  // Verifying
  const ClickEnterBtn = () => {
    registerByEmail(userData)
      .then(res => {
        console.log(res);
        showToast(res?.data?.msg)
        setVerify(true)
      })
      .catch(({ response }) => {
        setAuthErr({
          name: '',
          phone: null,
          email: '',
          password: '',
        })
        const { errors } = response?.data
        if (response.data.error === "Пользователь уже существует") {
          setAuthErr({ ...authErr, email: "Пользователь уже существует" })
        }
        errors?.phone &&
          setAuthErr({ ...authErr, phone: 'Неверный номер' })
        errors?.name &&
          setAuthErr({ ...authErr, name: errors.name })
        errors?.email &&
          setAuthErr({ ...authErr, email: 'Неверный адрем электронной почты' })
        errors?.password &&
          setAuthErr({ ...authErr, password: errors.password })
      })
  };
  const ClickEnterBtnAfterVerify = () => {
    HandleEndAuth()
    navigate('/my-account', { replace: true });
    setVerify(false);
  };
  console.log(authErr)

  return (
    <div className='wrapper'>
      <Toast ref={toast} />
      <div className='register-container'>
        {!verify ?
          (
            <div className='container-register'>
              <div className='description'>
                <h2 className='desc'>Регистрация</h2>
                <p className='desc-sec'>
                  Введите свои данные, чтобы зарегистрироваться
                </p>
              </div>
              <form >

                <div className='input'>
                  <label htmlFor='name' className='label'>
                    <span>
                      ФИО
                    </span>
                    <span className="label-err">
                      {authErr.name}
                    </span>
                  </label>

                  <IconUser />
                  <input id='name' name='name' type='text'
                    placeholder='Ваше ФИО'
                    onChange={(e) => handleChange(e, 'name')}
                  />
                </div>

                <div className='input'>
                  <label htmlFor='phone' className='label'>
                    <span>
                      Номер телефона
                    </span>
                    <span className="label-err">
                      {authErr.phone}
                    </span>
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

                <div className='input'>
                  <label htmlFor='location' className='label'>
                    <span> Город </span>
                  </label>
                  <IconLocation />
                  <input
                    id='location'
                    name='location'
                    type='text'
                    placeholder='Бишкек'
                    onChange={(e) => handleChange(e, 'location')}
                  />
                </div>
                <EmailInput authErr={authErr.email} handleChange={handleChange} />
                <PasswordInput
                  handleChange={handleChange}
                  label={'Создайте пароль'}
                  addition={' '}
                />
                <PasswordInput
                  handleChange={(e) => handleChange(e, 'confirmPassword')}
                  label={'Повторите пароль'}
                  addition={' '}
                  type="confirmPassword"
                />
                <div className='bottom-form'>
                  <button type='button'
                    className={!isVariable() ? 'disabled' : 'button'}
                    disabled={!isVariable()}
                    onClick={ClickEnterBtn}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
              <p className='registration-link' onClick={ShowLoginPhone}>
                Уже есть аккаунт? <span className='go-signIn'>Войти</span>
              </p>
            </div>
          ) :
          (
            <div className='container-register'>
              <h1 className='headline'>
                <IconLogo />
              </h1>
              <div className='line'></div>
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
                  onClick={ClickEnterBtnAfterVerify}
                >
                  Зарегистрироваться
                </button>
              </div>
              <p className='registration-link' onClick={ShowLoginPhone}>
                Уже есть аккаунт? <span className='go-signIn'>Войти</span>
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default Register;
