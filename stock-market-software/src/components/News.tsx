import React, { useState, useEffect } from "react";
import { NetworkManager } from "./NetworkManager";

interface News {
  symbol: string;
  title: string;
  news: string;
  url: string;
  image: string;
  company: string;
  date: string;
}

const News = () => {
  const [newslist, setNewslist] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const networkManager = new NetworkManager();

  const fetchNews = async () => {
    console.log("Fetching news with empty ticker...");
    const newsData = await networkManager.getStockNews(""); // Fetch news data
    setNewslist(
      newsData.map((news: any) => ({
        symbol: news.symbol,
        title: news.title,
        news: news.news,
        url: news.url || "#",
        image: news.imageUrl || "https://placehold.co/600x400", // Default placeholder if no image
        company: news.company || "Unknown Source", // Company name is set
        date: news.date || "Unknown Date", // Date is set
      }))
    );
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
            <img src={news.image} className="news-article-image" />
            <div className="writing">
              <h2 className="news-article-title">
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  {news.title}
                </a>
              </h2>
              <p className="news-meta">
                {news.company} • {news.date}
              </p>
            </div>
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
