// /* eslint-disable prettier/prettier */


import React, { useEffect } from "react";
import logo from "./components/icons/Logo.svg";
import icoSend from "./components/icons/icoForPlug.svg";
import { useNavigate } from "react-router";
function Plug() {
  const navigate = useNavigate()
  // useEffect(() => {
  //   navigate('/home')
  // }, [])
  const plugStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(180deg, #2D82BE 0%, #015087 100%)",
    color: "var(--Color, #FFF)",
    flexDirection: "column",
    padding: "50px 20px",

    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "100",
    width: "100%",
    height: "100%",
  };
  const plugLogoStyle = {
    marginBottom: "40px",
  };
  const plugTitleStyle = {
    fontSize: "20px",
    marginTop: "13px",
    maxWidth: "242px",
    textAlign: "center",
  };
  const plugLineStyle = {
    width: "265px",
    height: "1px",
    background: "rgba(255, 255, 255, 0.25)",
    marginTop: "40px",
  };
  const plugContactStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--Color, #FFF)",
    flexDirection: "column",
    fontSize: "18px",
    marginTop: "53px",
  };
  const plugContactLinkStyle = {
    color: "var(--Color, #FFF)",
    textDecoration: "none",
  };

  return (
    <div className="plug" style={plugStyle}>
      <img src={logo} alt="logo" width="188px" style={plugLogoStyle} />
      <img src={icoSend} alt="icoSend" />
      <h1 style={plugTitleStyle}>Сайт находится на стадии запуска</h1>
      <div className="plug_line" style={plugLineStyle}></div>
      <div className="plug_contact" style={plugContactStyle}>
        Телефоны:
        <a href="tel:+996500000104" style={plugContactLinkStyle}>
          +996 (500) 000-104
        </a>
        <a href="tel:+996997000104" style={plugContactLinkStyle}>
          +996 (997) 000-104
        </a>
        <a href="tel:+996222000104" style={plugContactLinkStyle}>
          +996 (222) 000-104
        </a>
      </div>
    </div>
  );
}

export default Plug;
