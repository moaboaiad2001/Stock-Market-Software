import React, { useState, useEffect, useContext } from "react";
import { NetworkManager } from "../NetworkManager";
import { LuListFilter } from "react-icons/lu";
import "../../styling/NewsPage.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { LightModeContext } from "../../utils/LightModeContext";

interface News {
  symbol: string;
  title: string;
  news: string;
  url: string;
  image: string;
  company: string;
  date: string;
}

const NewsPage = () => {
  const { t } = useTranslation();

  const lightModeContext = useContext(LightModeContext);
  const lightMode = lightModeContext?.lightMode || "light";

  const [newslist, setNewslist] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("US News");
  const networkManager = new NetworkManager();

  useEffect(() => {
    const fetchNews = async () => {
      let newsData: any[] = [];
      if (selectedFilter === "US News" || selectedFilter === "Both") {
        newsData = await networkManager.getStockNews("");
      }
      if (selectedFilter === "Egypt News" || selectedFilter === "Both") {
        const egyptNews = await networkManager.getEgyptNews(page);
        newsData = [...newsData, ...egyptNews];
      }
      setNewslist(
        newsData.map(
          (news: any): News => ({
            symbol: news.symbol || "N/A",
            title: news.title || t("noTitle"),
            news: news.description || t("noNewsAvailable"),
            url: news.url || "#",
            image: news.imageUrl || "https://placehold.co/600x400",
            company: news.company || t("unknownSource"),
            date: news.date || t("unknownDate"),
          })
        )
      );
    };
    fetchNews();
  }, [selectedFilter, page]);

  const newsPerPage = 10;
  const displayedNews = newslist.slice(0, page * newsPerPage);

  const handleSelect = (filter: string) => {
    setSelectedFilter(filter);
    setPage(1);
  };

  return (
    <div
      className={lightMode === "dark" ? "news-page-dark" : "news-page-light"}
    >
      <div
        className={`news-title-container ${
          lightMode === "dark"
            ? "news-title-container news-title-container-dark"
            : "news-title-container news-title-container-light"
        }`}
      >
        <h1 className="news-page-title">{t("newsTitle")}</h1>
        <DropdownButton
          id="dropdown-basic-button"
          title={<LuListFilter className="news-page-filter" />}
        >
          <Dropdown.Item onClick={() => handleSelect("US News")}>
            {t("usNews")}{" "}
            {selectedFilter === "US News" && (
              <FaCheck className="checkmark-icon" />
            )}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("Egypt News")}>
            {t("egyptNews")}{" "}
            {selectedFilter === "Egypt News" && (
              <FaCheck className="checkmark-icon" />
            )}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSelect("Both")}>
            {t("bothNews")}{" "}
            {selectedFilter === "Both" && (
              <FaCheck className="checkmark-icon" />
            )}
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div
        className={`news-page-list ${
          lightMode === "dark"
            ? "news-page-list news-page-list-dark"
            : "news-page-list news-page-list-light"
        }`}
      >
        {displayedNews.map((news, index) => (
          <div className="news-page-article" key={index}>
            <img
              src={news.image}
              className="news-page-article-image"
              alt={t("newsTitle")}
            />
            <div className="news-page-writing">
              <h2 className="news-page-article-title">
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  {news.title}
                </a>
              </h2>
              <p className="news-page-meta">
                {news.company} • {news.date}
              </p>
            </div>
          </div>
        ))}
      </div>
      {displayedNews.length < newslist.length && (
        <button
          onClick={() => setPage(page + 1)}
          className="news-page-load-more-button"
        >
          {t("loadMore")}
        </button>
      )}
    </div>
  );
};

export default NewsPage;
