import React from 'react';
import ModalButtonMobile from "../ModalButtonMobile/ModalButtonMobile";

const ModalMobileA = ({isActive, handleClick}) => {
  return (
      <div className={`profileEdit_modal ${isActive ? 'active' : ''}`}>
        <div
            className='profileEdit_modal__dark'
            onClick={handleClick}
        />

        <div className="profileEdit_modal__window">
          <ModalButtonMobile
              additionalClass='title'
              disabled={true}
          >
            Редактирование фото
          </ModalButtonMobile>

          <ModalButtonMobile>
            Загрузить фото
          </ModalButtonMobile>

          <ModalButtonMobile>
            Сделать снимок
          </ModalButtonMobile>

          <ModalButtonMobile>
            Выбрать фото
          </ModalButtonMobile>

          <ModalButtonMobile
              additionalClass='cancel'
              onClick={handleClick}
          >
            Отмена
          </ModalButtonMobile>
        </div>
      </div>
  );
};

export default ModalMobileA;