import React, {useState} from 'react';

const ModalButtonMobile = ({additionalClass = '', disabled = false, children, ...props}) => {
  const [isActive, setActive] = useState(false);

  const handleFocus = () => {
    setActive(true)
  }

  const handleBlur = () => {
    setActive(false)
  }

  return (
      <button
          className={`profileEdit_modal__button ${isActive ? 'active' : ''} ${additionalClass}`}
          onFocus={() => disabled ? {} : handleFocus()}
          onBlur={() => disabled ? {} : handleBlur()}
          {...props}
      >
        {children}
      </button>
  );
};

export default ModalButtonMobile;