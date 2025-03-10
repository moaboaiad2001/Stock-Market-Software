import React, { useState, useEffect } from "react";
import { NetworkManager } from "./NetworkManager";

interface News {
  symbol: string;
  title: string;
  news: string;
}

const News = () => {
  const [newslist, setNewslist] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const networkManager = new NetworkManager();

  const fetchNews = async () => {
    const newsData = await networkManager.getStockNews("");
    setNewslist(newsData);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const newsPerPage = 10;
  const displayedNews = newslist.slice(0, page * newsPerPage);

  return (
    <div className="news-container">
      <h1 className="news-title">News</h1>
      <ul id="newslist">
        {displayedNews.map((news, index) => (
          <li key={index}>
            <strong>
              {news.symbol} - {news.title}
            </strong>
            <p>{news.news}</p>
          </li>
        ))}
      </ul>
      {displayedNews.length < newslist.length && (
        <button onClick={() => setPage(page + 1)}>Load More</button>
      )}
    </div>
  );
};

export default News;
