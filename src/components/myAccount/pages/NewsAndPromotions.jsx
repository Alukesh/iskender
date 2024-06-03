import React from "react";
import NewsItem from "../../news/newsItem";
import { useQuery } from "react-query";
import api from "../../../services/api";

const NewsAndPromotions = () => {
    const { data: news  } = useQuery(
        ['news'],
        () => api.get('/api/getNews').then((res) => res.data.objects),
        { enabled: true }
    );

    return (
        <div className="news-and-promotions">
            <h2>Новости и Акции</h2>
            <div className="news-and-promotions__block-news">
                {news.map((n) => (
                    <NewsItem
                        key={n._id}
                        news={n}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewsAndPromotions;
