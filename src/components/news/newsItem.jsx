import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReturnUrlFromIp from '../../hooks/useReplaceUrl';

const NewsItem = ({ news }) => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
     if (news && news._id) {
      navigate({
        pathname: `/news-and-promotions/${news._id}`,
        search: `?name=${encodeURIComponent(news.name.replace(/\s/g, '-'))}`,
      });
    } else {
      console.log("Невозможно получить _id из news");
    }
  };

  return (
    <div onClick={navigateToDetail} className='news-item'>
      <div className='news-image'>
        <img height={210} src={ReturnUrlFromIp(news.img)} style={{objectFit:'contain'}} alt={news.name} />
      </div>
    </div>
  );
};

export default NewsItem;
