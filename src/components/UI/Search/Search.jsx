import React, { useEffect, useState } from 'react';
import searchIco  from '../../icons/Search.svg';
import './Search.scss';

function Search({children, extraClass}) {

  return (
    <div className={'custom-search ' + extraClass}>
      <img className='' src={searchIco} alt='search' />
      <input type='text' placeholder='Поиск по категориям' />
      {children}
    </div>
  );
}
{/* <p className='custom-search_search-result'>
  {searchResults.length} Товаров
</p> */}

export default Search;
