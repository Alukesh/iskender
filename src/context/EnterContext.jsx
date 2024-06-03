import React, { createContext, useState, useContext } from 'react';

const EnterContext = createContext();

export const UseEnterShow = () => {
  return useContext(EnterContext);
};

export const EnterProvider = ({ children }) => {
  const [openEnter, setOpenEnter] = useState("");
  const [enterMethod, setEnterMethod] = useState(false);
  const [resetPasswordUser, setResetPasswordUser] = useState(false);


  const HandleEndAuth = () => {
    setOpenEnter(false)
    setEnterMethod('')
  }
  const ShowRegister = () => {
    setEnterMethod('register')
  }
  const ShowLoginPhone = () => {
    setEnterMethod('loginWithPhone')
  }
  const ShowLoginEmail = () => {
    setEnterMethod('loginWithEmail')
  }
  const ShowResetPhone = () => {
    setEnterMethod('resetWithPhone')
  }
  const ShowResetEmail = () => {
    setEnterMethod('resetWithEmail')
  }
  const ShowNewPassword = () => {
    setEnterMethod('sendNewPassword')
  }

  return (
    <EnterContext.Provider
      value={{
        openEnter, 
        setOpenEnter,
        enterMethod,
        ShowRegister,
        ShowLoginPhone,
        ShowLoginEmail,
        ShowResetPhone,
        ShowResetEmail,
        ShowNewPassword,
        resetPasswordUser,
        setResetPasswordUser,
        HandleEndAuth,
      }}
    >
      {children}
    </EnterContext.Provider>
  );
};
