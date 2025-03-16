import React, { useState, useEffect } from "react";
import { NetworkManager } from "./NetworkManager";

interface News {
  symbol: string;
  title: string;
  news: string;
  url: string;
}

const News = () => {
  const [newslist, setNewslist] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const networkManager = new NetworkManager();

  const fetchNews = async () => {
    console.log("Fetching news with empty ticker...");
    const newsData = await networkManager.getStockNews(""); // Empty string should work
    setNewslist(newsData);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const newsPerPage = 10;
  const displayedNews = newslist.slice(0, page * newsPerPage);

  return (
    <div>
      <div className="news-list">
        {displayedNews.map((news, index) => (
          <div className="news-article" key={index}>
            <h2 className="news-article-title">
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                {news.title}
              </a>
            </h2>
          </div>
        ))}
      </div>
      {displayedNews.length < newslist.length && (
        <button onClick={() => setPage(page + 1)} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default News;
