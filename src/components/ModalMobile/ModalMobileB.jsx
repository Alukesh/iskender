import React from 'react';
import { useDispatch } from 'react-redux';

const ModalMobileB = ({isActive, handleClick}) => {
    const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch.cart.afterLoginUser({})
  }
  return (
      <div onClick={handleClick} className={`profileAdaptive_modal ${isActive ? 'active' : ''}`}>
        <div onClick={e => e.stopPropagation()} className="profileAdaptive_modal__window">
          <div className="profileAdaptive_modal__top">
            <p className="profileAdaptive_modal__title">
              Вы действительно хотите <br/> выйти?
            </p>
          </div>

          <div className="profileAdaptive_modal__bottom">
            <button className="profileAdaptive_modal__button cancel Gilroy-m" onClick={handleLogOut}>
              Выйти
            </button>

            <button className="profileAdaptive_modal__button Gilroy-m" onClick={handleClick}>
              Остаться
            </button>
          </div>
        </div>
      </div>
  );
};

export default ModalMobileB;