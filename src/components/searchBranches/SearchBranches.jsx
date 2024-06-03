// import search from '../../components/icons/Search.svg';
import BranchItem from '../branches/branchesItem';
import '../../styles/components/mapIframe.scss';
import Slider from "react-slick";
import { useQuery } from 'react-query';
import api from '../../services/api';

function SearchBranches() {
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
    <div className='map-container'>
      <div className='searc-titles'>
        {/* <input type='text' placeholder='Название магазина' />
        <img src={search} alt='#' /> */}
      </div>
      <Slider {...settings}>
        {branches.map((branch) => (
          <BranchItem key={branch._id} branch={branch} />
        ))}
      </Slider>
      {/*<div className='all-branches'>*/}
      {/*</div>*/}
    </div>
  );
}

export default SearchBranches;
