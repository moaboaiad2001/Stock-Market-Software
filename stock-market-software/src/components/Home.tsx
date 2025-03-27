import React, { useState } from "react";
import "../styling/Home.css";
import Investment from "./Investment";
import News from "./News";
import Watchlist from "./Watchlist";
import PNLChart from "./PNL";
import { StockOption } from "../types";
import TrendingList from "./TrendingList";
import Funds from "./Funds";
import BiggestMovers from "./BiggestMovers";
import HeatMap from "./HeatMap";
import { LuListFilter } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface HomeProps {
  watchlist: StockOption[];
  toggleWatchlist: (stock: StockOption) => void;
}

const Home: React.FC<HomeProps> = ({ watchlist }) => {
  const { t } = useTranslation();

  const investment = new Investment(1000, 1100, 1050, 950, 900, 800, 1150);

  const timePeriods = [
    { label: t("live"), key: "Live" },
    { label: t("oneDay"), key: "1D" },
    { label: t("oneWeek"), key: "1W" },
    { label: t("oneMonth"), key: "1M" },
    { label: t("threeMonths"), key: "3M" },
    { label: t("oneYear"), key: "1Y" },
    { label: t("ytd"), key: "YTD" },
  ];

  type TimePeriod = "Live" | "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD";

  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Live");

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleHover = (value: number | null) => {
    setHoveredValue(value);
  };

  const updatedInvestmentValue =
    hoveredValue !== null ? hoveredValue : investment.getCurrentAmount();

  const initialInvestmentValue = investment.getCurrentAmount();
  const percentChange =
    initialInvestmentValue !== 0
      ? 100 -
        ((initialInvestmentValue - updatedInvestmentValue) /
          initialInvestmentValue) *
          100
      : 0;

  const [container1, setContainer1] = useState("news");
  const [container2, setContainer2] = useState("watchlist");
  const [container3, setContainer3] = useState("funds");
  const [container4, setContainer4] = useState("biggest-movers");
  const [container5, setContainer5] = useState("heat-map");

  return (
    <div className="home-page">
      <div className="first-row">
        <div className="pnl-and-portfolio">
          <h1>{t("portfolio")}</h1>
          <h2>${initialInvestmentValue.toFixed(2)}</h2>
          <h3 className={investment.getClassName(selectedPeriod)}>
            {`$${hoveredValue !== null ? hoveredValue.toFixed(2) : 50.0}`}{" "}
            {`(${percentChange.toFixed(2)}%)`}
          </h3>
          <div className="pnl-and-watchlist">
            <div className="pnl-section">
              <PNLChart
                investment={investment}
                selectedPeriod={selectedPeriod}
                onHover={handleHover}
              />
            </div>
          </div>
          <div className="buttons-container">
            <div className="timeframe-buttons">
              {timePeriods.map(({ label, key }) => (
                <button
                  key={key}
                  className={selectedPeriod === key ? "active" : ""}
                  onClick={() => setSelectedPeriod(key as TimePeriod)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="news-container">
          <select
            value={container1}
            onChange={(e) => setContainer1(e.target.value)}
            className="container-dropdown news-title"
          >
            <option value="news">{t("news")}</option>
            <option value="watchlist">{t("watchlist")}</option>
            <option value="heat-map">{t("heatMap")}</option>
            <option value="funds">{t("funds")}</option>
            <option value="biggest-movers">{t("biggestMovers")}</option>
          </select>
          {container1 === "news" ? (
            <News />
          ) : container1 === "watchlist" ? (
            <Watchlist watchlist={watchlist} />
          ) : container1 === "heat-map" ? (
            <HeatMap />
          ) : container1 === "funds" ? (
            <Funds />
          ) : (
            <BiggestMovers />
          )}
        </div>
      </div>
      <div className="second-section">
        <div className="watchlist-container">
          <div className="watchlist-filter">
            <select
              value={container2}
              onChange={(e) => setContainer2(e.target.value)}
              className="container-dropdown watchlist-title"
            >
              <option value="news">{t("news")}</option>
              <option value="watchlist">{t("watchlist")}</option>
              <option value="heat-map">{t("heatMap")}</option>
              <option value="funds">{t("funds")}</option>
              <option value="biggest-movers">{t("biggestMovers")}</option>
            </select>
            {container2 === "watchlist" ? (
              <Watchlist watchlist={watchlist} />
            ) : container2 === "news" ? (
              <News />
            ) : container2 === "heat-map" ? (
              <HeatMap />
            ) : container2 === "funds" ? (
              <Funds />
            ) : (
              <BiggestMovers />
            )}
          </div>
        </div>
        <div className="heat-map-container">
          <div className="watchlist-filter">
            <select
              value={container5}
              onChange={(e) => setContainer5(e.target.value)}
              className="container-dropdown watchlist-title"
            >
              <option value="news">{t("news")}</option>
              <option value="watchlist">{t("watchlist")}</option>
              <option value="heat-map">{t("heatMap")}</option>
              <option value="funds">{t("funds")}</option>
              <option value="biggest-movers">{t("biggestMovers")}</option>
            </select>
            {container5 === "heat-map" ? (
              <HeatMap />
            ) : container5 === "watchlist" ? (
              <Watchlist watchlist={watchlist} />
            ) : container5 === "news" ? (
              <News />
            ) : container5 === "funds" ? (
              <Funds />
            ) : (
              <BiggestMovers />
            )}
          </div>
        </div>
      </div>
      <div className="trending-list-container">
        <TrendingList />
      </div>
      <div className="third-section">
        <div className="funds-container">
          <select
            value={container3}
            onChange={(e) => setContainer3(e.target.value)}
            className="container-dropdown watchlist-title"
          >
            <option value="funds">{t("funds")}</option>
            <option value="watchlist">{t("watchlist")}</option>
            <option value="heat-map">{t("heatMap")}</option>
            <option value="biggest-movers">{t("biggestMovers")}</option>
            <option value="news">{t("news")}</option>
          </select>
          {container3 === "funds" ? (
            <Funds />
          ) : container3 === "news" ? (
            <News />
          ) : container3 === "biggest-movers" ? (
            <BiggestMovers />
          ) : container3 === "heat-map" ? (
            <HeatMap />
          ) : (
            <Watchlist watchlist={watchlist} />
          )}
        </div>
        <div className="biggest-movers-container">
          <select
            value={container4}
            onChange={(e) => setContainer4(e.target.value)}
            className="container-dropdown watchlist-title"
          >
            <option value="biggest-movers">{t("biggestMovers")}</option>
            <option value="watchlist">{t("watchlist")}</option>
            <option value="heat-map">{t("heatMap")}</option>
            <option value="funds">{t("funds")}</option>
            <option value="news">{t("news")}</option>
          </select>
          {container4 === "biggest-movers" ? (
            <BiggestMovers />
          ) : container4 === "news" ? (
            <News />
          ) : container4 === "funds" ? (
            <Funds />
          ) : container4 === "heat-map" ? (
            <HeatMap />
          ) : (
            <Watchlist watchlist={watchlist} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
