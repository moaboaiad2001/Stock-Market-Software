import React, { useState, useEffect } from "react";
import Select from "react-select";
import { NetworkManager } from "./NetworkManager";
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
  logo_url?: string; // Make logoUrl optional
}

interface NavbarProps {
  watchlist: StockOption[];
  toggleWatchlist: (stock: StockOption) => void;
}

const Navbar: React.FC<NavbarProps> = ({ watchlist, toggleWatchlist }) => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networkManager = new NetworkManager();

  useEffect(() => {
    if (!searchTerm) {
      setStockOptions([]);
      return;
    }

    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const stocks = await networkManager.fetchStockSymbols(searchTerm);
        console.log(stocks); // Log to inspect the data
        setStockOptions(
          stocks.map((stock) => ({
            value: stock.symbol,
            label: `${stock.name} (${stock.symbol})`,
            price: stock.price,
            change: stock.percentChange,
            logo_url: stock.logo_url, // Ensure logoUrl is part of the stock data
          }))
        );
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchStocks, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    const isWatched = watchlist.some((s) => s.value === data.value);

    return (
      <div ref={innerRef} {...innerProps} className="stock-option">
        <div className="stock-info">
          {data.logo_url && (
            <img
              src={data.logo_url}
              alt={`${data.label} logo`}
              className="stock-logo"
            />
          )}
          <div className="stock-symbol">{data.value}</div>
          <div className="stock-ticker">
            <span className="company-name">{data.label}</span>
          </div>
        </div>
        <div className="stock-chart">
          <span>Mini Chart Placeholder</span>
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
          onInputChange={(inputValue) => setSearchTerm(inputValue)}
          placeholder={t("searchStocks")}
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
