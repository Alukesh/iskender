// import phone from "../../components/icons/phone.svg";
import email from "../../components/icons/email.svg";
import { ReactComponent as Phone } from '../../components/icons/phone.svg';

const EnterPopup = ({ OpenLoginWithPhone, OpenLoginWithEmail }) => {
    return (
        <>
            <p className="login-modal-calltoaction">
                Создай свой стиль с нашей мебелью — где комфорт встречает
                элегантность!
            </p>
            <strong>Войдите или зарегистрируйтесь через</strong>
            <div className="login-modal-link">
                <div className="link" onClick={OpenLoginWithPhone}>
                    {/* <img src={phone} alt="phone-ico" /> */}
                    <Phone style={{ color: '#a0a0a0', marginRight: '14px' }} />
                    Номер телефона
                </div>
                <div className="link" onClick={OpenLoginWithEmail}>
                    <img src={email} alt="email-ico" />
                    Email
                </div>
            </div>
        </>
    );
};

export default EnterPopup;