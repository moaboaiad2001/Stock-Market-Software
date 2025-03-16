import React, { useActionState, useState } from "react";
import "../styling/Home.css";
import Investment from "./Investment";
import News from "./News";
import Watchlist from "./Watchlist";
import PNLChart from "./PNL"; // Import PNLChart component
import { StockOption } from "../types";
import TrendingList from "./TrendingList";
import Funds from "./Funds";
import BiggestMovers from "./BiggestMovers";

interface HomeProps {
  watchlist: StockOption[];
  toggleWatchlist: (stock: StockOption) => void;
}

const Home: React.FC<HomeProps> = ({ watchlist }) => {
  const investment = new Investment(1000, 1100, 1050, 950, 900, 800, 1150);

  const timePeriods = [
    { label: "1 Day", key: "1D" },
    { label: "1 Week", key: "1W" },
    { label: "1 Month", key: "1M" },
    { label: "3 Months", key: "3M" },
    { label: "1 Year", key: "1Y" },
    { label: "Year to Date", key: "YTD" },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState<
    "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"
  >("1D");

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleHover = (value: number | null) => {
    setHoveredValue(value);
  };

  // Calculate the updated investment value when hovering
  const updatedInvestmentValue =
    hoveredValue !== null ? hoveredValue : investment.getCurrentAmount();

  // Calculate the percent change
  const initialInvestmentValue = investment.getCurrentAmount();
  const percentChange =
    initialInvestmentValue !== 0
      ? 100 -
        ((initialInvestmentValue - updatedInvestmentValue) /
          initialInvestmentValue) *
          100
      : 0;

  // Changing containers
  const [container1, setContainer1] = useState("news");
  const [container2, setContainer2] = useState("watchlist");
  const [container3, setContainer3] = useState("funds");
  const [container4, setContainer4] = useState("biggest-movers");

  return (
    <div className="home-page">
      <div className="first-row">
        <div className="pnl-and-portfolio">
          <h1>Portfolio</h1>
          <h2>${initialInvestmentValue.toFixed(2)}</h2>
          <h3 className={investment.getClassName(selectedPeriod)}>
            {`$${
              hoveredValue !== null
                ? hoveredValue.toFixed(2) // Show hovered value
                : 50.0 // Show the current investment value when not hovering
            }`}{" "}
            {`(${percentChange.toFixed(2)}%)`}
          </h3>
          <div className="pnl-and-watchlist">
            <div className="pnl-section">
              <PNLChart
                investment={investment}
                selectedPeriod={selectedPeriod}
                onHover={handleHover} // Pass hover handler to PNLChart
              />
            </div>
          </div>
          <div className="buttons-container">
            <div className="timeframe-buttons">
              {timePeriods.map(({ label, key }) => (
                <button
                  key={key}
                  className={selectedPeriod === key ? "active" : ""}
                  onClick={() =>
                    setSelectedPeriod(
                      key as "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"
                    )
                  }
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
            <option value="news">News</option>
            <option value="watchlist">Watchlist</option>
            <option value="funds">Funds</option>
            <option value="biggest-movers">Biggest Movers</option>
          </select>
          {container1 === "news" ? (
            <News />
          ) : container1 === "watchlist" ? (
            <Watchlist watchlist={watchlist} />
          ) : container1 === "funds" ? (
            <Funds />
          ) : (
            <BiggestMovers />
          )}
        </div>
      </div>
      <div className="watchlist-container">
        <select
          value={container2}
          onChange={(e) => setContainer2(e.target.value)}
          className="container-dropdown watchlist-title"
        >
          <option value="news">News</option>
          <option value="watchlist">Watchlist</option>
          <option value="funds">Funds</option>
          <option value="biggest-movers">Biggest Movers</option>
        </select>
        {container2 === "watchlist" ? (
          <Watchlist watchlist={watchlist} />
        ) : container2 === "news" ? (
          <News />
        ) : container2 === "funds" ? (
          <Funds />
        ) : (
          <BiggestMovers />
        )}
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
            <option value="funds">Funds</option>
            <option value="watchlist">Watchlist</option>
            <option value="biggest-movers">Biggest Movers</option>
            <option value="news">News</option>
          </select>
          {container3 === "funds" ? (
            <Funds />
          ) : container3 === "news" ? (
            <News />
          ) : container3 === "biggest-movers" ? (
            <BiggestMovers />
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
            <option value="biggest-movers">Biggest Movers</option>
            <option value="watchlist">Watchlist</option>
            <option value="funds">Funds</option>
            <option value="news">News</option>
          </select>
          {container4 === "biggest-movers" ? (
            <BiggestMovers />
          ) : container4 === "news" ? (
            <News />
          ) : container4 === "funds" ? (
            <Funds />
          ) : (
            <Watchlist watchlist={watchlist} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
