import React from "react"
import NewsItem from "./newsItem"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import api from "../../services/api"

const News = ({ titleNews, selectNewsId }) => {
    const { data: news, isLoading, } = useQuery(
        ['news'],
        () => api.get('/api/getNews').then((res) => res.data.objects),
        { enabled: true }
    );
    var settings = {
        dots: true,
        infinite: true,
        centerMode: true,
        speed: 500,
        slidesToShow: Math.min(3, selectNewsId ? news?.length - 1 : news?.length),
        slidesToScroll: 1,
        // variableWidth: news?.length < 2,
        arrows: true,
        responsive: [
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: Math.min(1, news?.length),
                    centerMode: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
            {
                breakpoint: 490,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
    }
    const placeholderSettings = {
        slidesToShow: 1,
    }

    // if (isLoading) {
    //     return (
    //         <div className="news">
    //             <div>
    //                 <div className="products-title">
    //                     <h2>{titleNews ? titleNews : 'Новости'}</h2>
    //                     <Link to='/news-and-promotions' className="categories-title_right">все</Link>
    //                 </div>
    //                 <Slider {...settings} {...placeholderSettings}>
    //                     {[...Array(5)].map((_, i) => (
    //                         <p></p>
    //                     ))}
    //                 </Slider>
    //             </div>
    //         </div>
    //     )
    // }

    if (selectNewsId ? news?.length > 1 : news?.length) {
        return (
            <div className="news">
                <div>
                    <div className="products-title">
                        <h2>{titleNews ? titleNews : 'Новости'}</h2>
                        <Link to='/news-and-promotions' className="categories-title_right">все</Link>
                    </div>
                    <Slider {...settings} className={ news.length < 2 && "slide-to-start"}>
                        {news.map((n) => (
                            selectNewsId !== n._id ?
                                <NewsItem
                                    key={n._id}
                                    news={n} />
                                : ''
                        ))}
                    </Slider>
                </div>
            </div>
        )
    }
}

export default News
