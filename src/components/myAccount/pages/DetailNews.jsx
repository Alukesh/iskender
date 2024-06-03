import React from "react"
import { useParams } from "react-router"
import { useQuery } from "react-query";
import News from "../../news/news";
import ReturnUrlFromIp from "../../../hooks/useReplaceUrl";
import api from "../../../services/api";


const DetailNews = () => {
    const { id } = useParams();   
    const { data: news} = useQuery(
        ['news'],
        () => api.get('/api/getNews').then((res) => res.data.objects),
        { enabled: true }
    );

    const NewsItem = news?.find((item) => item._id === id);
    return (
        <>
            <div className="detail-news-page">
                
                <h2>Новости</h2>
                <div className="detail-news-page__content">
                    {NewsItem && (
                        <>
                            <img src={ReturnUrlFromIp(NewsItem.img)} alt="img" />
                            <h2>{NewsItem.name}</h2>
                            <p>{NewsItem.desc}</p>
                        </>
                    )}
                </div>
                <div className="detail-news-page__other">
                    <News titleNews={'Другие новости и акции'} selectNewsId={id} />
                </div>
              
            </div>
        </>
    )
}

export default DetailNews
