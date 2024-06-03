import BranchItem from './branchesItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import api from '../../services/api';

const Branches = () => {
  const { data: branches } = useQuery(
    ['branches'],
    () => api.get('/getBranches').then((res) => res.data.branches),
    { enabled: true }
);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className='products-title'>
        <h2>Адреса магазинов</h2>
        <Link to='/addresses' className='categories-title_right'>
          все
        </Link>
      </div>
      <div className='branches-container'>
        <Slider {...settings}>
          {branches?.map((branch) => (
            <BranchItem key={branch._id} branch={branch} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Branches;
