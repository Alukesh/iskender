import React, { useEffect, useState } from "react";

import { ReactComponent as ArrowDown } from "../icons/arrow-down.svg";
import { ReactComponent as XIcon } from "../icons/x.svg";
import { useClients } from "../../hooks/useClients";
import Loader from "../Loader/Loader";
import searchIco from "../icons/Search.svg";

const ManagerInput = ({ label, data, renderJsx, customClass, clickValue }) => {
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [statusColor, setStatusColor] = useState("");

  // console.log("term", searchTerms);
  useEffect(() => {
    if (searchTerms === '') {
      clickValue(null)
    }
  }, [searchTerms])
  const { data: clients, isLoading } = useClients({
    searchString: searchTerms,
  });

  const handleSearch = (value) => {
    setSearchActive(true);
    setSearchTerms(value);
  };

  const handleClick = (item) => {
    setSearchTerms(clickValue(item));
    setSearchActive(false);

    if (item.color) {
      setStatusColor(item.color);
    }
  };

  const handleFocus = () => {
    setSearchActive(true);
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      setSearchActive(false)
    }, 300)
  }

  const renderer = () => {
    return isLoading ? (
      <Loader />
    ) : (
      clients?.map((item) => renderJsx(item, handleClick))
    );
  };

  return (
    <div
      className={`form_group ${(!searchTerms.length <= 0) && 'form-t-value'}`}
      style={{ "--status-color": statusColor ? "#fff" : "#000" }}
    >
      <p className="form_label">{label}</p>

      <div
        className={`
				form_select
				${customClass ? customClass : ""}
				${isSearchActive && clients?.length > 0 ? "active" : ""}               
			`}
      // style={{
      //   background: statusColor
      //     ? statusColor
      //     : isSearchActive
      //       ? "transparent"
      //       : "#F6F6F6",
      // }}
      >
        <div className="form_select__top" >
          <input
            type="text"
            placeholder="Поиск по клиентам"
            className="form_select__input"
            value={searchTerms}
            onChange={e => handleSearch(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ color: statusColor ? "#fff" : "#000" }}
          />
          {/* {isSearchActive && clients?.length > 0 ?
            <XIcon onClick={e =>{ 
              handleBlur()
              setSearchTerms('');           
            }} /> :
            <ArrowDown onClick={e => handleSearch('')} />
          } */}
          {(searchTerms.length <= 0) &&
            <img className='categories-search-icon' src={searchIco} alt='search' />
          }
        </div>

        <div className={`form_select__bottom ${isSearchActive && "active"}`}>
          {renderer()}
        </div>
      </div>
    </div>
  );
};

export default ManagerInput;
