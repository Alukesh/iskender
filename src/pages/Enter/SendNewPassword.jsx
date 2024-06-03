import React, { useRef, useState } from 'react';
import { UseEnterShow } from '../../context/EnterContext';
import { Toast } from 'primereact/toast';
import { ReactComponent as NotificationIcon } from '../../components/icons/notification.svg';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { updatePassword } from '../../services/api';

const SendNewPassword = () => {
    const toast = useRef(null)
    const { resetPasswordUser } = UseEnterShow();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');

    const showToast = (msg) => {
        toast.current.show({
          severity: 'info',
          detail: msg,
          className: 'toaster Gilroy-m',
          icon: <NotificationIcon style={{ marginRight: '36px', minWidth: '24px' }} />
        });
      };

    const handleChange = (e, type) => {
        if (type === 'confirmPassword') {
            setConfirmPassword(e.target.value);
            return
        }
        setPassword(e.target.value);
    };
    const ClickEnterBtn = () => {
        updatePassword({ password, clientId: resetPasswordUser?._id, })
            .then(res => {
                console.log(res);
                showToast('Успешное восстановление пароля!')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const isVariable = () => {
        return password && password === confirmPassword;
    };

    return (
        <div className='wrapper'>
            <Toast ref={toast} />
            <div className='register-container'>

                <div className='container'>
                    <div className='description'>
                        <h2 className='desc'>Восстановление пароля</h2>
                        <p className='desc-sec'>
                            Введите свой телефон, который указывали при регистрации
                        </p>
                    </div>
                    <form >
                        <PasswordInput
                            handleChange={handleChange}
                            label={'Новый пароль'}
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
                                Сохранить
                            </button>
                        </div>
                    </form>
                    <p className='registration-link' >
                        Уже есть аккаунт? <span className='go-signIn' >Войти</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SendNewPassword;