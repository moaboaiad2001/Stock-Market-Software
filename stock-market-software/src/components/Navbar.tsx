import React, { useState, useEffect } from "react";
import Select from "react-select";
import { NetworkManagerTrial } from "../NetworkManagerTrial";
import "../styling/Home.css";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface StockOption {
  value: string;
  label: string;
  price: number;
  change: number;
  logoUrl?: string;
}

interface NavbarProps {
  watchlist: StockOption[];
  toggleWatchlist: (stock: StockOption) => void;
}

const Navbar: React.FC<NavbarProps> = ({ watchlist, toggleWatchlist }) => {
  const { t, i18n } = useTranslation();
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networkManager = new NetworkManagerTrial(
    "T4YMtQfhAo7AHgA7z1uH06RhBeW5S8pI"
  );

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        // Manually define the five stocks
        const stocksToFetch = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN"];

        const stocksWithDetails = await Promise.all(
          stocksToFetch.map(async (ticker) => {
            const stock = await networkManager.fetchStockData(ticker);
            const logo = await networkManager.fetchLogo(ticker);
            console.log(`THIS IS LOGO:  ${logo} ${stock}`);
            return {
              value: ticker,
              label: `${ticker}`,
              price: stock.price || 0,
              change: stock.change || 0,
              logoUrl: logo || "green",
            };
          })
        );

        setStockOptions(stocksWithDetails);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    const isWatched = watchlist.some((s) => s.value === data.value);

    return (
      <div ref={innerRef} {...innerProps} className="stock-option">
        <div className="stock-info">
          {data.logoUrl ? (
            <img
              src={data.logoUrl}
              alt={`${data.label} logo`}
              className="stock-logo"
            />
          ) : (
            <div className="stock-placeholder-logo">N/A</div>
          )}
          <div className="stock-symbol">{data.value}</div>
          <div className="stock-ticker">
            <span className="company-name">{data.label}</span>
          </div>
        </div>
        <div className="stock-price">
          <span className="price">${data.price.toFixed(2)}</span>
          <span
            className={`percent-change ${
              data.change >= 0 ? "positive" : "negative"
            }`}
          >
            {data.change.toFixed(2)}%
          </span>
        </div>
        <button
          className="add-to-watchlist-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(data);
          }}
        >
          {isWatched ? <FaCheck /> : <FaPlus />}
        </button>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">{t("forsa")}</div>
      <div className="navbar-actions">
        <Select
          className="navbar-search search-dropdown"
          styles={{ control: (provided) => ({ ...provided, width: "600px" }) }}
          options={stockOptions}
          isLoading={isLoading}
          isClearable
          components={{ Option: CustomOption }}
        />
      </div>
      <div className="navbar-links">
        <Link to="/">{t("home")}</Link>
        <Link to="/portfolio">{t("portfolio")}</Link>
        <Link to="/markets">{t("markets")}</Link>
        <Link to="/news">{t("news")}</Link>
        <Link to="/profile" className="navbar-profile">
          <IoPerson />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
